import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar, DivisionLine, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import SearchArticleItem from "../../components/Article/SearchArticleItem";
import CategoryItem from "./CategoryItem";

import { connect } from "react-redux";
import { graphql, Query } from "react-apollo";
import { SearchResultQueries, hotSearchAndLogsQuery } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

const RELATED_WIDTH = (width - 60) / 4;

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: "",
			fetchingMore: true
		};
	}

	render() {
		let { order, fetchingMore } = this.state;
		let { keywords, navigation, selectCategory, selectCategories } = this.props;
		return (
			<View style={styles.container}>
				<Query query={SearchResultQueries} variables={{ keyword: keywords, order: order }}>
					{({ loading, error, data, fetchMore, refetch, client }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.categories)) return <SpinnerLoading />;
						if (data.categories.length < 1) return <BlankContent />;
						client.query({ query: hotSearchAndLogsQuery, fetchPolicy: "network-only" });
						return (
							<FlatList
								data={data.categories}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item, index }) => (
									<CategoryItem
										selectCategory={selectCategory}
										category={item}
										navigation={navigation}
										selectCategories={selectCategories}
									/>
								)}
								onEndReachedThreshold={0.3}
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
								ListEmptyComponent={() => <BlankContent />}
								ListFooterComponent={() => {
									return data.categories.length > 0 ? fetchingMore ? <LoadingMore /> : <ContentEnd /> : null;
								}}
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
	relatedType: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	relatedTypeText: {
		fontSize: 15,
		color: Colors.tintFontColor
	},
	relatedItemList: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 5,
		paddingBottom: 25,
		paddingHorizontal: 10
	},
	relatedItem: {
		width: RELATED_WIDTH,
		marginHorizontal: 5,
		alignItems: "center"
	},
	relatedItemName: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginTop: 8
	},
	orderArticleHeader: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15
	},
	divisionLine: {
		width: 1,
		height: 20,
		marginHorizontal: 10,
		backgroundColor: Colors.tintGray
	},
	focused: {
		color: Colors.themeColor
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(SearchResult);
