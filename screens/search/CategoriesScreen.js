import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { SearchTypeHeader } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { CategoryContributeGroup } from "../../components/MediaGroup";

import { connect } from "react-redux";
import { graphql, Query } from "react-apollo";
import { topCategoriesQuery } from "../../graphql/category.graphql";

//搜索专题 给文章投稿
class CategoriesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keywords: "",
			fetching: false,
			fetchingMore: true
		};
	}

	render() {
		let { renderItem, search_detail, navigation } = this.props;
		let { keywords, fetching, fetchingMore } = this.state;
		const article = navigation.getParam("article", {});
		return (
			<Screen>
				<View style={styles.container}>
					<SearchTypeHeader
						navigation={navigation}
						placeholder={"搜索专题"}
						keywords={keywords}
						changeKeywords={this.changeKeywords.bind(this)}
						handleSearch={this.handleSearch.bind(this)}
					/>
					{fetching && (
						<Query query={topCategoriesQuery}>
							{({ loading, error, data, refetch, fetchMore }) => {
								if (error) return <LoadingError reload={() => refetch()} />;
								if (!(data && data.categories)) return <SpinnerLoading />;
								if (data.categories.length < 1) return <BlankContent />;
								return (
									<FlatList
										data={data.categories}
										keyExtractor={(item, index) => index.toString()}
										renderItem={({ item }) => (
											<CategoryContributeGroup article={article} category={item} navigation={navigation} />
										)}
										onEndReachedThreshold={0.3}
										onEndReached={() => {
											if (data.categories) {
												fetchMore({
													variables: {
														offset: data.categories.length
													},
													updateQuery: (prev, { fetchMoreResult }) => {
														if (
															!(fetchMoreResult && fetchMoreResult.categories && fetchMoreResult.categories.length > 0)
														) {
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
											return fetchingMore ? <LoadingMore /> : <ContentEnd />;
										}}
									/>
								);
							}}
						</Query>
					)}
				</View>
			</Screen>
		);
	}

	changeKeywords(keywords) {
		this.setState({
			keywords
		});
	}

	handleSearch() {
		this.setState({
			fetching: true
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	searchHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginTop: 20
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(CategoriesScreen);
