"use strict";
import React from "react";
import { FlatList, StyleSheet, ScrollView, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";
import CategoryCard from "../../components/Card/CategoryCard";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { topCategoriesQuery } from "../../graphql/category.graphql";
import { Query, Mutation, compose, withApollo } from "react-apollo";

const { width, height } = Dimensions.get("window");

class AllCategoiesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={topCategoriesQuery}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.categories)) return <SpinnerLoading />;

							return (
								<FlatList
									contentContainerStyle={{ paddingTop: 15 }}
									data={data.categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderCategoryItem}
									refreshing={loading}
									onRefresh={() => {
										refetch();
									}}
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

	_renderCategoryItem = ({ item, index }) => {
		return (
			<View style={styles.categoryCardWrap}>
				<CategoryCard category={item} />
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray
	},
	categoryCardWrap: {
		marginHorizontal: 15,
		marginBottom: 15
	},
	followCategory: {
		flex: 1,
		padding: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	categoryListWrap: {
		flex: 1,
		paddingLeft: 15,
		paddingVertical: 15
	}
});

export default AllCategoiesScreen;
