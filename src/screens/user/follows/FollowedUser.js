"use strict";

import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { Colors } from "../../../constants";
import { UserMetaGroup } from "../../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent, Find } from "../../../components/Pure";

import { Query } from "react-apollo";
import { userFollowingsQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";

class FollowedUser extends Component {
	state = {
		fetchingMore: true
	};

	render() {
		let { navigation } = this.props;
		let user = navigation.getParam("user", {});
		return (
			<View style={styles.container}>
				<Query query={userFollowingsQuery} variables={{ user_id: user.id }} fetchPolicy="network-only">
					{({ loading, error, data, refetch, fetchMore }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.users)) return <SpinnerLoading />;
						if (data.users.length < 1) return <BlankContent />;
						return (
							<FlatList
								data={data.users}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<View style={styles.userItem}>
										<UserMetaGroup user={item} />
									</View>
								)}
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
								ListFooterComponent={() => <ContentEnd />}
							/>
						);
					}}
				</Query>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	userItem: {
		marginHorizontal: 15,
		paddingVertical: 10
	}
});

export default FollowedUser;
