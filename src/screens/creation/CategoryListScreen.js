import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { SearchTypeBar, Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { CategoryContributeGroup } from "../../components/MediaGroup";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, graphql } from "react-apollo";
import { topCategoriesQuery } from "../../graphql/category.graphql";
import { userAdminCategoriesQuery } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

class CategoryListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true,
			keywords: ""
		};
	}

	render() {
		const { navigation, user } = this.props;
		const type = navigation.getParam("type", "admin");
		const article = navigation.getParam("article", {});
		let { fetchingMore, keywords } = this.state;
		return (
			<Screen>
				<View style={styles.container}>
					<SearchTypeBar navigation={navigation} placeholder={"搜索专题"} type={"搜索专题"} />
					<Query query={type == "admin" ? userAdminCategoriesQuery : topCategoriesQuery} variables={{ user_id: user.id }}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.categories)) return <SpinnerLoading />;
							if (data.categories.length < 1) return <BlankContent />;
							return (
								<FlatList
									ListHeaderComponent={() => {
										return (
											<View>
												<View style={styles.listHeader}>
													<Text style={styles.listHeaderText}>{type == "admin" ? "我管理的专题" : "最近投稿"}</Text>
												</View>
											</View>
										);
									}}
									data={data.categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<CategoryContributeGroup article={article} category={item} navigation={navigation} />
									)}
									refreshing={loading}
									onRefresh={() => {
										refetch();
									}}
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

	changeKeywords(keywords) {
		this.setState({
			keywords
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	listHeader: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		backgroundColor: Colors.lightGray
	},
	listHeaderText: {
		fontSize: 14,
		color: Colors.tintFontColor
	}
});

export default connect(store => ({ user: store.users.user }))(CategoryListScreen);
