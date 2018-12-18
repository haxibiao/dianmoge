"use strict";

import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { Colors } from "../../../constants";
import { CategoryGroup } from "../../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent, Find } from "../../../components/Pure";

import { Query } from "react-apollo";
import { userFollowedCategoriesQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";

class FollowedCategory extends Component {
	state = {
		fetchingMore: true
	};

	render() {
		let { navigation } = this.props;
		let user = navigation.getParam("user", {});
		return (
			<View style={styles.container}>
				<Query query={userFollowedCategoriesQuery} variables={{ user_id: user.id }} fetchPolicy="network-only">
					{({ loading, error, data, refetch, fetchMore }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.categories)) return <SpinnerLoading />;
						if (data.categories.length < 1) return <BlankContent />;
						return (
							<FlatList
								data={data.categories}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<View style={styles.categoryItem}>
										<CategoryGroup category={item} />
									</View>
								)}
								onEndReached={() => {
									if (data.categories) {
										fetchMore({
											variables: {
												offset: data.categories.length
											},
											updateQuery: (prev, { fetchMoreResult }) => {
												if (!(fetchMoreResult && fetchMoreResult.categories && fetchMoreResult.categories.length > 0)) {
													this.setState({
														fetchingMore: false
													});
													return prev;
												}
												return Object.assign({}, prev, {
													categories: [...prev.categories, ...fetchMoreResult.categories]
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
	categoryItem: {
		marginHorizontal: 15,
		paddingVertical: 10
	}
});

export default FollowedCategory;
