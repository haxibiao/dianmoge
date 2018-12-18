import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { UserMetaGroup } from "../../components/MediaGroup";
import { SearchBar, LoadingError, SpinnerLoading, BlankContent, LoadingMore, ContentEnd } from "../../components/Pure";

import { recommendFollowUsersQuery } from "../../graphql/user.graphql";
import { graphql, Query } from "react-apollo";
import { connect } from "react-redux";

class RecommendFriendsScreen extends Component {
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
					<Query query={recommendFollowUsersQuery} variables={{ recommend_for_user_id: user.id }}>
						{({ loading, error, data, fetchMore, fetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.follows)) return <SpinnerLoading />;
							if (data.follows.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.follows}
									keyExtractor={(item, index) => (item.key ? item.key : index.toString())}
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
		let user = item.user;
		return (
			<View style={styles.userItem}>
				<UserMetaGroup user={user} />
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	userItem: {
		marginTop: 15,
		paddingBottom: 15,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	user: store.users.user
}))(RecommendFriendsScreen);
