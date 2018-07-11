import React, { Component } from "react";
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { Header } from "../../../components/Header";
import NoteItem from "../../../components/Article/NoteItem";
import { OperationModal } from "../../../components/Modal";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { userArticlesQuery, removeArticleMutation } from "../../../graphql/user.graphql";
import { unpublishArticleMutation } from "../../../graphql/article.graphql";
import { Mutation, Query, graphql } from "react-apollo";

class OpenArticlesScreen extends Component {
	constructor(props) {
		super(props);
		this.handleModal = this.handleModal.bind(this);
		this.state = {
			fetchingMore: true,
			modalVisible: false
		};
	}

	render() {
		let { fetchingMore, modalVisible } = this.state;
		const { navigation, unpublishArticle } = this.props;
		const { user } = navigation.state.params;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} search searchRouteName={"搜索文章"} />
					<Query
						query={userArticlesQuery}
						variables={{
							user_id: user.id
						}}
					>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.articles)) return <SpinnerLoading />;
							if (data.articles.length < 1) return <BlankContent />;
							return (
								<View>
									<FlatList
										data={data.articles}
										keyExtractor={(item, index) => index.toString()}
										renderItem={({ item, index }) => (
											<NoteItem
												post={item}
												compress
												longPress={() => {
													this.article = item;
													this.handleModal();
												}}
											/>
										)}
										onEndReachedThreshold={0.3}
										onEndReached={() => {
											if (data.articles) {
												fetchMore({
													variables: {
														offset: data.articles.length
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
										ListFooterComponent={fetchingMore ? <LoadingMore /> : <ContentEnd />}
									/>
									<Mutation mutation={removeArticleMutation}>
										{removeArticle => {
											return (
												<OperationModal
													operation={["编辑", "删除文章", "投稿管理", "转为私密", "文集设置"]}
													visible={modalVisible}
													handleVisible={this.handleModal}
													handleOperation={index => {
														this.handleModal();
														switch (index) {
															case 0:
																navigation.navigate("创作", {
																	article: this.article
																});
																break;
															case 1:
																removeArticle({
																	variables: {
																		id: this.article.id
																	},
																	refetchQueries: result => [
																		{
																			query: userArticlesQuery,
																			variables: {
																				user_id: user.id
																			}
																		}
																	]
																});
																break;
															case 2:
																navigation.navigate("投稿管理", {
																	article: this.article
																});
																break;
															case 3:
																unpublishArticle({
																	variables: {
																		id: this.article.id
																	},
																	refetchQueries: result => [
																		{
																			query: userArticlesQuery,
																			variables: {
																				user_id: user.id
																			}
																		}
																	]
																});
																break;
															case 4:
																navigation.navigate("选择文集", {
																	article: this.article
																});
																break;
														}
													}}
												/>
											);
										}}
									</Mutation>
								</View>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	handleModal() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default connect(store => ({
	open_articles: store.users.open_articles
}))(graphql(unpublishArticleMutation, { name: "unpublishArticle" })(OpenArticlesScreen));
