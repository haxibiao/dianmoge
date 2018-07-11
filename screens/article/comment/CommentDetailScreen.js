import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

import CommentItem from "./CommentItem";
import Screen from "../../Screen";
import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { commentsQuery, addCommentMutation, replyCommentsQuery } from "../../../graphql/comment.graphql";
import { Query, Mutation, withApollo } from "react-apollo";

const { width } = Dimensions.get("window");

class CommentDetailScreen extends Component {
	constructor(props) {
		super(props);
		let comment = props.navigation.getParam("comment", {});
		this.state = {
			comment,
			replyingComment: comment, //回复的评论
			body: ""
		};
	}

	componentWillMount() {
		let { comment } = this.state;
		if (!comment.replyComments) {
			this.fetchReplyComments();
		}
	}

	render() {
		let { navigation } = this.props;
		let { comment, replyingComment, body } = this.state;

		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
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
							<TextInput
								underlineColorAndroid="transparent"
								style={styles.commentInput}
								placeholder="添加一条评论吧~"
								placeholderText={Colors.lightFontColor}
								onFocus={this._inputFocus.bind(this)}
								onChangeText={body => this.setState({ body })}
								value={body + ""}
								ref={ref => (this.commentInput = ref)}
							/>
						</View>
						<Mutation mutation={addCommentMutation}>
							{replyComment => {
								return (
									<TouchableOpacity
										onPress={() => {
											this.commentInput.blur();
											//验证是否为空
											if (!(body.length > replyingComment.user.name.length + 2)) {
												this.setState({
													comment,
													body: ""
												});
												return null;
											}
											replyComment({
												variables: {
													commentable_id: comment.commentable_id,
													body: body,
													comment_id: replyingComment.id,
													at_uid: replyingComment.user.id
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
													let comment = Object.assign({}, this.state.comment, {
														replyComments: [...this.state.comment.replyComments, addComment]
													});
													this.setState({
														comment,
														body: ""
													});
												}
											});
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
			</Screen>
		);
	}

	async fetchReplyComments() {
		let { comment } = this.state;
		let { data } = await this.props.client.query({ query: replyCommentsQuery, variables: { comment_id: comment.id } });
		this.setState(prevState => ({
			comment: {
				...prevState.comment,
				...{ replyComments: data.comments }
			}
		}));
	}

	// 输入框聚焦自带检测是否应该加上@用户名
	_inputFocus() {
		let { navigation, login } = this.props;
		if (login) {
			let { body, replyingComment } = this.state;
			if (body.indexOf(`@${replyingComment.user.name}`) !== 0) {
				body = `@${replyingComment.user.name} ` + body;
				this.setState({ body });
			}
		} else {
			navigation.navigate("登录注册");
		}
	}

	//点击回复评论  聚焦底部评论框并且set当前回复的该条评论
	_handleFocus(replyingComment) {
		let { navigation, login } = this.props;
		if (login) {
			this.setState({ replyingComment });
			this.commentInput.focus();
		} else {
			navigation.navigate("登录注册");
		}
	}
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
