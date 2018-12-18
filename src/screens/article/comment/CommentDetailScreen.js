import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

import Screen from "../../Screen";
import { Colors, Methods } from "../../../constants";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Element";
import { Diving } from "../../../components/Pure";
import CommentItem from "./CommentItem";

import { connect } from "react-redux";
import { commentQuery, commentsQuery, addCommentMutation } from "../../../graphql/comment.graphql";
import { Query, Mutation, withApollo } from "react-apollo";

const { width } = Dimensions.get("window");

class CommentDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.replyingComment = {};
		this.state = {
			value: ""
		};
	}

	render() {
		let { navigation } = this.props;
		let comment = navigation.getParam("comment-fill", {});
		let { value } = this.state;

		return (
			<Screen>
				<Query query={commentQuery} variables={{ comment_id: comment.id }}>
					{({ laoding, error, data, refetch }) => {
						if (!(data && data.comment)) return <Diving />;
						let { comment } = data;
						this.replyingComment = comment;
						return (
							<View style={styles.container}>
								<ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
									<CommentItem
										comment={comment}
										navigation={navigation}
										detail
										toggleReplyComment={replyingComment => this._handleFocus(replyingComment)}
									/>
								</ScrollView>
								<View style={styles.addComment}>
									<View style={{ marginLeft: 10, flex: 1 }}>
										<Input
											style={styles.commentInput}
											value={value}
											onChangeText={this.changeText}
											onFocus={this._inputFocus.bind(this)}
											inputRef={ref => (this.inputRef = ref)}
										/>
									</View>
									<Mutation mutation={addCommentMutation}>
										{replyComment => {
											return (
												<TouchableOpacity
													onPress={() => {
														this.inputRef.blur();
														this.changeText("");
														//验证是否为空
														if (!(value.length > this.replyingComment.user.name.length + 2)) {
															return null;
														}
														replyComment({
															variables: {
																commentable_id: comment.commentable_id,
																body: value,
																comment_id: this.replyingComment.id
															},
															refetchQueries: ({ replyComment }) => [
																{
																	query: commentsQuery,
																	variables: {
																		article_id: comment.commentable_id,
																		order: "LATEST_FIRST",
																		filter: "ALL"
																	}
																}
															],
															update: (cache, { data: { addComment } }) => {
																cache.writeQuery({
																	query: commentQuery,
																	variables: { comment_id: comment.id },
																	data: {
																		comment: {
																			...comment,
																			replyComments: [...comment.replyComments, addComment]
																		}
																	}
																});
															}
														});
														Methods.toast("回复成功");
													}}
												>
													<View style={{ marginHorizontal: 20 }}>
														<Text
															style={{
																fontSize: 16,
																color: Colors.themeColor
															}}
														>
															发表
														</Text>
													</View>
												</TouchableOpacity>
											);
										}}
									</Mutation>
								</View>
								{Platform.OS === "ios" && <KeyboardSpacer />}
							</View>
						);
					}}
				</Query>
			</Screen>
		);
	}

	// 输入框聚焦自带检测是否应该加上@用户名
	_inputFocus() {
		let { navigation, login } = this.props;
		if (login) {
			let { value } = this.state;
			if (value.indexOf(`@${this.replyingComment.user.name}`) !== 0) {
				this.changeText(`@${this.replyingComment.user.name} ` + value);
			}
		} else {
			navigation.navigate("登录注册");
		}
	}

	//点击回复评论  聚焦底部评论框并且set当前回复的该条评论
	_handleFocus(replyingComment) {
		let { navigation, login } = this.props;
		if (login) {
			this.replyingComment = replyingComment;
			this.inputRef.focus();
		} else {
			navigation.navigate("登录注册");
		}
	}

	changeText = value => {
		this.setState({ value });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	addComment: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.skinColor
	},
	commentInput: {
		marginVertical: 10,
		height: 40,
		paddingLeft: 10,
		backgroundColor: Colors.tintGray,
		borderRadius: 3,
		fontSize: 16,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({ login: store.users.login }))(withApollo(CommentDetailScreen));
