import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";

import Screen from "../Screen";
import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import { SearchTypeBar, Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { Button } from "../../components/Button";
import { CategoryContributeGroup } from "../../components/MediaGroup";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, graphql } from "react-apollo";
import { topCategoriesQuery } from "../../graphql/category.graphql";
import { submitArticleMutation, userAdminCategoriesQuery, queryArticleRequestCenter } from "../../graphql/user.graphql";
import { queryArticleRequesRecommend } from "../../graphql/article.graphql";

const { width, height } = Dimensions.get("window");

class CategoryItem extends React.Component {
	render() {
		let { article, category, navigation, status } = this.props;
		let { submit_status } = category;
		return (
			<TouchableOpacity style={{ marginRight: 25 }} onPress={() => navigation.navigate("专题详情", { category })}>
				<View style={{ position: "relative" }}>
					<Avatar type={"category"} uri={category.logo} size={70} />
					<View style={styles.categoryName}>
						<Text style={{ fontSize: 13, color: "#fff", textAlign: "center" }} numberOfLines={2}>
							{category.name}
						</Text>
					</View>
				</View>
				<View style={{ width: 70, height: 28, marginTop: 12 }}>
					<Mutation mutation={submitArticleMutation}>
						{submitArticle => {
							return (
								<Button
									outline
									name={status}
									fontSize={12}
									theme={
										submit_status.indexOf("投稿") !== -1 || submit_status.indexOf("收录") !== -1
											? "rgba(66,192,46,0.9)"
											: Colors.themeColor
									}
									handler={() => {
										submitArticle({
											variables: {
												category_id: category.id,
												article_id: article.id
											}
										});
									}}
								/>
							);
						}}
					</Mutation>
				</View>
			</TouchableOpacity>
		);
	}
}

class ContributeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true,
			keywords: "",
			collection: "收录",
			submission: "投稿"
		};
	}

	render() {
		const { navigation, user } = this.props;
		const article = navigation.getParam("article", {});
		let { fetchingMore, keywords, collection, submission } = this.state;
		return (
			<Screen>
				<View style={styles.container}>
					<SearchTypeBar navigation={navigation} placeholder={"搜索专题"} type={"搜索专题"} />
					<Query query={queryArticleRequesRecommend}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.categories)) return <SpinnerLoading />;
							if (data.user.categories.length < 1) return <BlankContent />;
							let { categories } = data.user;
							return (
								<FlatList
									ListHeaderComponent={this._renderHeader.bind(this)}
									data={categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<CategoryContributeGroup article={article} category={item} navigation={navigation} category={item} />
									)}
									refreshing={loading}
									onRefresh={() => {
										refetch();
									}}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (categories) {
											fetchMore({
												variables: {
													offset: categories.length
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

	_renderHeader() {
		let { user, navigation } = this.props;
		let { collection, submission } = this.state;
		const article = navigation.getParam("article", {});
		return (
			<View>
				<Query query={userAdminCategoriesQuery} variables={{ user_id: user.id }}>
					{({ loading, error, data, fetchMore, refetch }) => {
						if (error) return null;
						if (!(data && data.categories && data.categories.length > 0)) return null;
						return (
							<View>
								<View style={[styles.listHeader, styles.hListHeader]}>
									<View>
										<Text style={styles.listHeaderText}>我管理的专题</Text>
									</View>
									<TouchableOpacity onPress={() => navigation.navigate("全部专题投稿", { type: "admin" })}>
										<Text style={styles.listHeaderText}>查看全部</Text>
									</TouchableOpacity>
								</View>
								<FlatList
									style={{ paddingVertical: 10, paddingLeft: 15 }}
									horizontal={true}
									data={data.categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<CategoryItem article={article} category={item} navigation={navigation} status={collection} />
									)}
								/>
							</View>
						);
					}}
				</Query>
				<Query query={queryArticleRequestCenter}>
					{({ loading, error, data, fetchMore, refetch }) => {
						if (error) return null;
						if (!(data && data.user && data.user.categories)) return null;
						let { categories } = data.user;
						return (
							<View>
								<View style={[styles.listHeader, styles.hListHeader]}>
									<View>
										<Text style={styles.listHeaderText}>最近投稿</Text>
									</View>
									<TouchableOpacity onPress={() => navigation.navigate("全部专题投稿", { type: "contribute" })}>
										<Text style={styles.listHeaderText}>查看全部</Text>
									</TouchableOpacity>
								</View>
								<FlatList
									style={{ paddingVertical: 10, paddingLeft: 15 }}
									horizontal={true}
									data={categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<CategoryItem article={article} category={item} navigation={navigation} status={submission} />
									)}
								/>
							</View>
						);
					}}
				</Query>
				<View style={styles.listHeader}>
					<Text style={styles.listHeaderText}>推荐投稿</Text>
				</View>
			</View>
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
	hListHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	categoryName: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: 70,
		padding: 6
	},
	listHeaderText: {
		fontSize: 14,
		color: Colors.tintFontColor
	}
});

export default connect(store => ({ user: store.users.user }))(ContributeScreen);
