import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import NoteItem from "../../../components/Article/NoteItem";
import { CustomPopoverMenu, OperationModal } from "../../../components/Modal";
import { Header, HeaderLeft } from "../../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, Mutation, graphql, compose } from "react-apollo";
import { draftsQuery, removeArticleMutation } from "../../../graphql/user.graphql";
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
		let { navigation, drafts, publishArticle, removeArticle } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header
						navigation={navigation}
						search
						searchRouteName={"搜索文章"}
						leftComponent={<HeaderLeft navigation={navigation} routeName />}
					/>
					<Query query={draftsQuery}>
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
											longPress={() => {
												this.article = item;
												this.handleModal();
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
					operation={["编辑", "删除", "公开发布", "文集设置"]}
					visible={modalVisible}
					handleVisible={this.handleModal}
					handleOperation={index => {
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
							case 3:
								navigation.navigate("选择文集", { article: this.article });
								break;
						}
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
