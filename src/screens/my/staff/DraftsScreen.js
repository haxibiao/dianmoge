import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import NoteItem from "../../../components/Article/NoteItem";
import { CustomPopoverMenu, OperationModal } from "../../../components/Modal";
import { Header } from "../../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, Mutation, graphql, compose } from "react-apollo";
import { draftsQuery, removeArticleMutation, userTrashQuery } from "../../../graphql/user.graphql";
import { publishArticleMutation } from "../../../graphql/article.graphql";
import { connect } from "react-redux";

class DraftsScreen extends Component {
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
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={draftsQuery} fetchPolicy="network-only">
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.articles)) return <SpinnerLoading />;
							if (data.user.articles.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.user.articles}
									refreshing={loading}
									onRefresh={() => {
										refetch();
									}}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<NoteItem
											post={item}
											compress
											popoverMenu
											longPress={() => {
												this.article = item;
												this.handleModal();
											}}
											options={["编辑", "删除", "公开发布"]}
											popoverHandler={index => {
												this.article = item;
												this.operationHandler(index);
											}}
										/>
									)}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.user.articles) {
											fetchMore({
												variables: {
													offset: data.user.articles.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (
														!(
															fetchMoreResult &&
															fetchMoreResult.user.articles &&
															fetchMoreResult.user.articles.length > 0
														)
													) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														user: Object.assign({}, prev.user, {
															articles: [...prev.user.articles, ...fetchMoreResult.user.articles]
														})
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
				</View>
				<OperationModal
					operation={["编辑", "删除", "公开发布"]}
					visible={modalVisible}
					handleVisible={this.handleModal}
					handleOperation={index => {
						this.operationHandler(index);
						this.handleModal();
					}}
				/>
			</Screen>
		);
	}

	handleModal() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}

	operationHandler = index => {
		let { navigation, publishArticle, removeArticle } = this.props;
		switch (index) {
			case 0:
				navigation.navigate("创作", { article: this.article });
				break;
			case 1:
				removeArticle({
					variables: {
						id: this.article.id
					},
					refetchQueries: result => [
						{
							query: draftsQuery
						},
						{
							query: userTrashQuery
						}
					]
				});
				break;
			case 2:
				publishArticle({
					variables: {
						id: this.article.id
					},
					refetchQueries: result => [
						{
							query: draftsQuery
						}
					]
				});
				break;
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	draftsItem: {
		height: 90,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		justifyContent: "center"
	},
	timeAgo: {
		fontSize: 13,
		color: Colors.lightFontColor,
		marginBottom: 4
	},
	title: {
		fontSize: 17,
		color: Colors.primaryFontColor,
		lineHeight: 22
	}
});

export default compose(
	graphql(removeArticleMutation, { name: "removeArticle" }),
	graphql(publishArticleMutation, { name: "publishArticle" }),
	connect(store => ({ drafts: store.articles.drafts }))
)(DraftsScreen);
// connect(store => ({ drafts: store.articles.drafts }))(graphql(publishArticleMutation, { name: "publishArticle" })(DraftsScreen));
