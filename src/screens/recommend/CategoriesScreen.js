import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { Header } from "../../components/Header";
import { SearchBar, LoadingError, SpinnerLoading, BlankContent, LoadingMore, ContentEnd } from "../../components/Pure";
import FollowItem from "./FollowItem";

import { recommendFollowCategoriesQuery } from "../../graphql/user.graphql";
import { graphql, Query } from "react-apollo";
import { connect } from "react-redux";

class CategoriesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		let { user, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={recommendFollowCategoriesQuery} variables={{ recommend_for_user_id: user.id }}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.follows)) return <SpinnerLoading />;
							if (data.follows.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.follows}
									keyExtractor={(item, index) => (item.key ? item.key : index.toString())}
									onRefresh={() => {
										refetch();
									}}
									refreshing={loading}
									renderItem={this._renderItem}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.follows) {
											fetchMore({
												variables: {
													offset: data.follows.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.follows && fetchMoreResult.follows.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														follows: [...prev.follows, ...fetchMoreResult.follows]
													});
												}
											});
										} else {
											this.setState({
												fetchingMore: false
											});
										}
									}}
									ListFooterComponent={() => {
										return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
									}}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	_renderItem = ({ item }) => {
		let { navigation } = this.props;
		return (
			<View style={{ paddingHorizontal: 15 }}>
				<TouchableOpacity
					style={{
						paddingVertical: 15,
						borderBottomWidth: 1,
						borderBottomColor: Colors.lightBorderColor
					}}
					onPress={() =>
						navigation.navigate("专题详情", {
							category: item.category
						})
					}
				>
					<FollowItem follow={item} />
				</TouchableOpacity>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default connect(store => ({
	user: store.users.user
}))(CategoriesScreen);
