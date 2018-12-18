import React, { Component } from "react";
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Colors } from "../../../constants";
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
		this.article = {};
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
					<Query
						query={userArticlesQuery}
						variables={{
							user_id: user.id
						}}
						fetchPolicy="network-only"
					>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.articles)) return <SpinnerLoading />;
							if (data.articles.length < 1) return <BlankContent />;
							return (
								<View style={{ flex: 1 }}>
									<FlatList
										data={data.articles}
										keyExtractor={(item, index) => index.toString()}
										refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
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
													operation={
														this.article.type == "post" ? ["删除", "转为私密"] : ["编辑", "删除", "投稿管理", "转为私密"]
													}
													visible={modalVisible}
													handleVisible={this.handleModal}
													handleOperation={index => {
														this.handleModal();
														if (this.article.type == "post") {
															switch (index) {
																case 0:
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
																case 1:
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
															}
														} else {
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
															}
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
