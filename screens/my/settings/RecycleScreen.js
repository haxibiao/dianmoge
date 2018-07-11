import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { OperationModal } from "../../../components/Modal";
import { Header, HeaderLeft } from "../../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, compose, graphql } from "react-apollo";
import { userTrashQuery, restoreArticleMutation, deleteArticleMutation } from "../../../graphql/user.graphql";
import { connect } from "react-redux";

class RecycleScreen extends Component {
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
		let { navigation, drafts, deleteArticle, restoreArticle } = this.props;
		return (
			<Screen>
				<Header navigation={navigation} routeName={"回收站"} />
				<Query query={userTrashQuery}>
					{({ loading, error, data, refetch, fetchMore }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.user && data.user.articles)) return <SpinnerLoading />;
						if (data.user.articles.length < 1) return <BlankContent />;
						return (
							<View style={styles.container}>
								<FlatList
									data={data.user.articles}
									refreshing={loading}
									onRefresh={() => {
										refetch();
									}}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem.bind(this)}
									getItemLayout={(data, index) => ({
										length: 90,
										offset: 90 * index,
										index
									})}
									onEndReached={() => {
										if (data.user.articles) {
											fetchMore({
												variables: {
													offset: data.user.articles.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.user && fetchMoreResult.user.articles.length > 0)) {
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
									ListFooterComponent={() => (this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />)}
								/>
								<OperationModal
									operation={["彻底删除", "恢复"]}
									visible={this.state.modalVisible}
									handleVisible={this.handleModal}
									handleOperation={index => {
										switch (index) {
											case 0:
												deleteArticle({
													variables: {
														id: this.article.id
													},
													refetchQueries: result => [
														{
															query: userTrashQuery
														}
													]
												});
												break;
											case 1:
												restoreArticle({
													variables: {
														id: this.article.id
													},
													refetchQueries: result => [
														{
															query: userTrashQuery
														}
													]
												});
												break;
										}
										this.handleModal();
									}}
								/>
							</View>
						);
					}}
				</Query>
			</Screen>
		);
	}

	_renderItem({ item }) {
		let { navigation } = this.props;
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate("回收详情", { article: item })}
				onLongPress={() => {
					this.article = item;
					this.handleModal();
				}}
			>
				<View style={styles.draftsItem}>
					<View>
						<Text numberOfLines={1} style={styles.timeAgo}>
							{item.time_ago}
						</Text>
					</View>
					<View>
						<Text numberOfLines={2} style={styles.title}>
							{item.title}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
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
	graphql(deleteArticleMutation, { name: "deleteArticle" }),
	graphql(restoreArticleMutation, { name: "restoreArticle" }),
	connect(store => ({ drafts: store.articles.drafts }))
)(RecycleScreen);
