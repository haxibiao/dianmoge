import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import Header from "../../../components/Header/Header";
import CommentItem from "./CommentItem";
import CustomPopoverMenu from "../../../components/Modal/CustomPopoverMenu";
import ContentEnd from "../../../components/Pure/ContentEnd";
import LoadingMore from "../../../components/Pure/LoadingMore";
import ReplyCommentModal from "../../../components/Modal/ReplyCommentModal";
import Screen from "../../Screen";

import { Query, Mutation } from "react-apollo";
import { commentsQuery, addCommentMutation } from "../../../graphql/comment.graphql";

class CommentListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: "LATEST_FIRST",
			onlyAuthor: false,
			replyCommentVisible: false,
			replyingComment: null,
			article: props.navigation.state.params.article
		};
	}

	render() {
		const { navigation } = this.props;
		let { article } = this.state;
		let { replyCommentVisible, replyingComment, order, onlyAuthor } = this.state;
		let filter = onlyAuthor ? "ONLY_AUTHOR" : "ALL";
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					{this._renderListHeader()}

					<Query query={commentsQuery} variables={{ article_id: article.id, order, filter }}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (!(data && data.comments)) return null;
							return (
								<FlatList
									data={data.comments}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderCommentItem}
									ListFooterComponent={() => {
										return <ContentEnd />;
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
									replyingComment={this.state.replyingComment}
									atUser={this.state.replyingComment ? this.state.replyingComment.user : {}}
									replyComment={({ body, replyingComment, atUser }) => {
										replyComment({
											variables: {
												commentable_id: article.id,
												body,
												comment_id: replyingComment.id,
												at_uid: atUser.id
											},
											refetchQueries: createCollectionResult => [
												{
													query: commentsQuery,
													variables: {
														article_id: article.id,
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

	_renderListHeader = () => {
		const { onlyAuthor, order, article } = this.state;
		return (
			<View style={styles.topTitle}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text
						style={{
							fontSize: 13,
							color: Colors.themeColor,
							marginRight: 8
						}}
					>
						评论 {article.count_replies}
					</Text>
					<TouchableOpacity
						style={[styles.onlyAuthor, onlyAuthor ? styles.onlyAuthored : ""]}
						onPress={() => this.setState({ onlyAuthor: !onlyAuthor })}
					>
						<Text
							style={{
								fontSize: 12,
								color: onlyAuthor ? "#fff" : "#bbb"
							}}
						>
							只看作者
						</Text>
					</TouchableOpacity>
				</View>
				<CustomPopoverMenu
					width={110}
					selectHandler={index => {
						let { order } = this.state;
						switch (index) {
							case 0: {
								order = "LATEST_FIRST";
								break;
							}
							case 1: {
								order = "OLD_FIRST";
								break;
							}
							case 2: {
								order = "LIKED_MOST";
								break;
							}
						}
						this.setState({ order });
					}}
					triggerComponent={
						<Text
							style={{
								fontSize: 13,
								color: Colors.tintFontColor
							}}
						>
							{order == "LATEST_FIRST" && "按时间倒序"}
							{order == "OLD_FIRST" && "按时间正序"}
							{order == "LIKED_MOST" && "按点赞排序"}
							<Iconfont name={"downward-arrow"} size={12} />
						</Text>
					}
					options={["按时间倒序", "按时间正序", "按点赞排序"]}
				/>
			</View>
		);
	};

	_renderCommentItem = ({ item, index }) => {
		let { navigation } = this.props;
		return (
			<CommentItem
				comment={item}
				toggleReplyComment={comment => {
					this.setState(prevState => ({
						replyCommentVisible: !prevState.replyCommentVisible,
						replyingComment: comment
					}));
				}}
				navigation={navigation}
			/>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	topTitle: {
		paddingVertical: 6,
		paddingHorizontal: 20,
		backgroundColor: Colors.lightGray,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor
	},
	onlyAuthor: {
		padding: 4,
		borderWidth: 1,
		borderColor: "#bbb",
		borderRadius: 4
	},
	onlyAuthored: {
		borderColor: Colors.themeColor,
		backgroundColor: Colors.themeColor
	}
});

export default CommentListScreen;
