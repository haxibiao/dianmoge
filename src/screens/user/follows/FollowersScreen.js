import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";
import { UserMetaGroup } from "../../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { userFollowersQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class FollowersScreen extends Component {
	constructor(props) {
		super(props);
		this.is_self = false;
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		const { user = {} } = this.props.navigation.state.params;
		let { currentUser, followers, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={userFollowersQuery} variables={{ user_id: user.id }} fetchPolicy="network-only">
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.users)) return <SpinnerLoading />;
							if (data.users.length < 1) return <BlankContent />;
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
			<View style={styles.followerItem}>
				<UserMetaGroup user={user} />
			</View>
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
	followers: store.users.followers,
	currentUser: store.users.user
}))(FollowersScreen);
