import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, Platform, StatusBar } from "react-native";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { Header, HeaderLeft, Search } from "../../components/Header";
import { CustomPopoverMenu, ShareModal } from "../../components/Modal";
import { CommunityInfo } from "../../components/MediaGroup";
import NoteItem from "../../components/Article/NoteItem";

import actions from "../../store/actions";
import { connect } from "react-redux";
import { Mutation, Query, graphql } from "react-apollo";
import { categoryQuery, deleteCategoryMutation } from "../../graphql/category.graphql";
import { userCategoriesQuery } from "../../../graphql/user.graphql";

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		this.state = {
			order: "LATEST",
			modalVisible: false,
			fetchingMore: true
		};
	}

	render() {
		let { order, modalVisible, fetchingMore } = this.state;
		let { navigation, personal, deleteCategory } = this.props;
		let category = navigation.getParam("category", {});
		return (
			<Screen>
				<Query query={categoryQuery} variables={{ id: category.id, order }}>
					{({ loading, error, data, refetch, fetchMore }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.category && data.articles)) return <SpinnerLoading />;
						let category = data.category;
						let articles = data.articles;
						let self = category.user.id == personal.id;
						return (
							<View style={styles.container}>
								<Header
									routeName
									rightComponent={
										<View
											style={{
												flexDirection: "row",
												alignItems: "center"
											}}
										>
											<View style={{ marginRight: 15 }}>
												<Search navigation={navigation} routeName={"搜索文章"} />
											</View>
											<CustomPopoverMenu
												width={160}
												selectHandler={index => {
													if (self) {
														switch (index) {
															case 0:
																navigation.navigate("新建专题", {
																	category
																});
																break;
															case 1:
																deleteCategory({
																	variables: {
																		id: category.id
																	},
																	refetchQueries: deleteCategoryResult => [
																		{
																			query: userCategoriesQuery,
																			variables: {
																				user_id: personal.id
																			}
																		}
																	]
																});
																navigation.goBack();
																break;
															case 2:
																this.toggleModalVisible();
																break;
														}
													} else {
														this.toggleModalVisible();
													}
												}}
												triggerComponent={<Iconfont name={"more-vertical"} size={20} color={Colors.tintFontColor} />}
												customOptionStyle={{
													optionWrapper: {
														alignItems: "flex-start",
														paddingHorizontal: 10
													}
												}}
												options={self ? ["编辑", "删除专题", "分享专题"] : ["分享专题"]}
											/>
										</View>
									}
								/>

								<FlatList
									bounces={false}
									ListHeaderComponent={() => this._renderListHeader(category)}
									data={articles}
									refreshing={loading}
									onRefresh={() => {
										fetch();
									}}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => <NoteItem post={item} />}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (articles) {
											fetchMore({
												variables: {
													offset: articles.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.articles && fetchMoreResult.articles.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														articles: [...prev.articles, ...fetchMoreResult.articles]
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
										if (articles.length < 1) return <View />;
										return (
											<View style={{ paddingBottom: 25, backgroundColor: "#fff" }}>
												{fetchingMore ? <LoadingMore /> : <ContentEnd />}
											</View>
										);
									}}
								/>
							</View>
						);
					}}
				</Query>
				<ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
			</Screen>
		);
	}

	_renderListHeader = category => {
		let { order } = this.state;
		let { navigation } = this.props;
		return (
			<View>
				<CommunityInfo category={category} navigation={navigation} />
				<View style={styles.orderHeader}>
					<View>
						<Text style={styles.orderText}>
							{order == "LATEST" && "发帖时间排序 "}
							{order == "COMMENTED" && "回复时间排序 "}
							{order == "HOT" && "热门排序 "}
						</Text>
					</View>
					<CustomPopoverMenu
						width={110}
						selectHandler={index => {
							let { order } = this.state;
							switch (index) {
								case 0: {
									order = "LATEST";
									break;
								}
								case 1: {
									order = "COMMENTED";
									break;
								}
								case 2: {
									order = "HOT";
									break;
								}
							}
							this.setState({ order });
						}}
						triggerComponent={
							<View style={styles.ranking}>
								<Text style={styles.filterText}>排序</Text>
								<Iconfont name={"downward"} size={14} style={{ marginLeft: 5 }} />
							</View>
						}
						options={["发帖时间", "回复时间", "热门"]}
					/>
				</View>
			</View>
		);
	};

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	orderHeader: {
		height: 40,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	ranking: {
		flexDirection: "row",
		alignItems: "center"
	},
	filterText: {
		fontSize: 16,
		color: Colors.tintFontColor
	},
	orderText: {
		fontSize: 16,
		color: Colors.darkFontColor
	}
});

export default connect(store => ({
	personal: store.users.user
}))(graphql(deleteCategoryMutation, { name: "deleteCategory" })(HomeScreen));
