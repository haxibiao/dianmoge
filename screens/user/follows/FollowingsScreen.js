import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { Header } from "../../../components/Header";
import { UserMetaGroup } from "../../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent, Find } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { userFollowingsQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class FollowingsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		const { user = {} } = this.props.navigation.state.params;
		let { follows, navigation, personal } = this.props;
		let self = personal.id == user.id ? true : false;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<Query query={userFollowingsQuery} variables={{ user_id: user.id }}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.users)) return <SpinnerLoading />;
							if (data.users.length < 1) self ? <Find /> : <BlankContent />;
							return (
								<FlatList
									data={data.users}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem.bind(this)}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.users) {
											fetchMore({
												variables: {
													offset: data.users.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.users && fetchMoreResult.users.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														users: [...prev.users, ...fetchMoreResult.users]
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

	_renderItem({ item, index }) {
		let { navigation } = this.props;
		let user = item;
		return (
			<TouchableOpacity
				style={styles.followerItem}
				onPress={() =>
					navigation.navigate("用户详情", {
						user
					})}
			>
				<UserMetaGroup
					navigation={navigation}
					plain
					customStyle={{
						avatar: 42,
						nameSize: 17,
						metaSize: 13
					}}
					user={user}
				/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	followerItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	follows: store.users.follows,
	personal: store.users.user
}))(FollowingsScreen);
