import React, { Component } from "react";
import Colors from "../../constants/Colors";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Header } from "../../components/Header";
import { ReplyCommentModal } from "../../components/Modal";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import MediaGroup from "./MediaGroup";
import Screen from "../Screen";

import { Query, Mutation } from "react-apollo";
import { commentNotificationQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { addCommentMutation, commentsQuery } from "../../graphql/comment.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class CommentsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true,
			replyCommentVisible: false,
			commentedArticle: null,
			replyingComment: null,
			atUser: null
		};
	}

	render() {
		let { replyCommentVisible, atUser, replyingComment, commentedArticle, fetchingMore } = this.state;
		const { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<Query query={commentNotificationQuery}>
						{({ loading, error, data, refetch, fetchMore, client }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user)) return <SpinnerLoading />;
							if (data.user.notifications.length < 1) return <BlankContent />;
							//retech unreadsQuery ...
							client.query({
								query: unreadsQuery,
								fetchPolicy: "network-only"
							});
							return (
								<FlatList
									data={data.user.notifications}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.user.notifications) {
											fetchMore({
												variables: {
													offset: data.user.notifications.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (
														!(
															fetchMoreResult &&
															fetchMoreResult.user.notifications &&
															fetchMoreResult.user.notifications.length > 0
														)
													) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														user: Object.assign({}, prev.user, {
															notifications: [...prev.user.notifications, ...fetchMoreResult.user.notifications]
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

					<Mutation mutation={addCommentMutation}>
						{replyComment => {
							return (
								<ReplyCommentModal
									visible={replyCommentVisible}
									toggleReplyComment={() => {
										this.setState(prevState => ({
											replyCommentVisible: !prevState.replyCommentVisible
										}));
									}}
									replyingComment={replyingComment}
									atUser={atUser}
									replyComment={({ body, replyingComment, atUser }) => {
										console.log("variables", commentedArticle.id, replyingComment, atUser);
										replyComment({
											variables: {
												commentable_id: commentedArticle.id,
												body,
												comment_id: replyingComment.id,
												at_uid: atUser.id
											},
											refetchQueries: addComment => [
												{
													query: commentsQuery,
													variables: {
														article_id: commentedArticle.id,
														order: "LATEST_FIRST",
														filter: "ALL"
													}
												}
											]
										});
									}}
								/>
							);
						}}
					</Mutation>
				</View>
			</Screen>
		);
	}

	_renderItem = ({ item, index }) => {
		let { navigation } = this.props;
		let notification = item;
		return (
			<MediaGroup
				navigation={navigation}
				user={notification.user}
				rightComponent={
					<TouchableOpacity
						style={styles.reply}
						onPress={() => {
							console.log("test", notification.article, notification.comment, notification.user);
							this.setState(prevState => ({
								replyCommentVisible: !prevState.replyCommentVisible,
								commentedArticle: notification.article,
								replyingComment: notification.comment,
								atUser: notification.user
							}));
						}}
					>
						<Text style={{ fontSize: 14, color: "#717171" }}>回复</Text>
					</TouchableOpacity>
				}
				description={
					notification.type == "评论中提到了你" ? (
						<Text style={{ lineHeight: 24 }}>
							在文章<Text
								style={styles.linkText}
								onPress={() =>
									navigation.navigate("文章详情", {
										article: notification.article
									})}
							>
								{" 《" + notification.article.title + "》 "}
							</Text>的评论中提到了你
						</Text>
					) : notification.type == "评论了文章" ? (
						<Text style={{ lineHeight: 24 }}>
							评论了你的文章<Text
								style={styles.linkText}
								onPress={() =>
									navigation.navigate("文章详情", {
										article: notification.article
									})}
							>
								{" 《" + notification.article.title + "》 "}
							</Text>
						</Text>
					) : (
						<Text style={{ lineHeight: 24 }}>
							在文章<Text
								style={styles.linkText}
								onPress={() =>
									navigation.navigate("文章详情", {
										article: notification.article
									})}
							>
								{" 《" + notification.article.title + "》 "}
							</Text>中添加了一条新评论
						</Text>
					)
				}
				notification={{
					content: notification.comment ? notification.comment.body : "",
					type: "评论详情",
					info: { comment: notification.comment }
				}}
				meta={notification.time_ago}
			/>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	reply: {
		width: 55,
		height: 30,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		alignItems: "center",
		justifyContent: "center"
	},
	linkText: {
		lineHeight: 24,
		color: Colors.linkColor
	}
});

export default connect(store => {
	return {
		users: store.users
	};
})(CommentsScreen);
