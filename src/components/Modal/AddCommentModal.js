import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, Platform } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods } from "../../constants";
import { Input } from "../../components/Element";
import BasicModal from "./BasicModal";
import SearchUserModal from "./SearchUserModal";

import { Query, Mutation } from "react-apollo";
import { commentsQuery, addCommentMutation } from "../../graphql/comment.graphql";
import { articleQuery } from "../../graphql/article.graphql";

const { width } = Dimensions.get("window");

class AddCommentModal extends Component {
	constructor(props) {
		super(props);
		this.toggleVisible = this.toggleVisible.bind(this);
		this.prevReplyingComment = {};
		this.state = {
			value: "",
			aiteModalVisible: false
		};
	}

	componentWillUpdate(nextProps, nextState) {
		// 记录上一个回复
		this.prevReplyingComment = this.props.replyingComment ? this.props.replyingComment : {};
	}

	render() {
		const { visible, toggleCommentModal, article, replyingComment, order = "LATEST_FIRST", filter = "ALL", navigation } = this.props;
		let { value, aiteModalVisible } = this.state;
		return (
			<Mutation mutation={addCommentMutation}>
				{addComment => {
					return (
						<BasicModal
							visible={visible}
							handleVisible={toggleCommentModal}
							customStyle={{
								width,
								position: "absolute",
								bottom: 0,
								left: 0,
								borderRadius: 0
							}}
						>
							<View>
								<Input
									style={styles.textInput}
									value={value}
									autoFocus
									multiline
									onFocus={this._inputFocus.bind(this)}
									onChangeText={this.changeText}
								/>
								<View style={styles.textBottom}>
									<View style={styles.textBottom}>
										<TouchableOpacity onPress={this.toggleVisible}>
											<Iconfont name="aite" size={22} color={Colors.lightFontColor} style={{ marginHorizontal: 10 }} />
										</TouchableOpacity>
									</View>
									<TouchableOpacity
										onPress={() => {
											toggleCommentModal();
											if (!value) return null;
											addComment({
												variables: {
													commentable_id: article.id,
													body: value,
													comment_id: replyingComment ? replyingComment.id : ""
												},
												refetchQueries: addComment => [
													{
														query: commentsQuery,
														variables: {
															article_id: article.id,
															order,
															filter
														}
													}
												],
												update: (cache, { data: { addComment } }) => {
													if (article.count_replies) {
														cache.writeQuery({
															query: articleQuery,
															variables: { id: article.id },
															data: {
																article: {
																	...article,
																	count_replies: article.count_replies + 1
																}
															}
														});
													}
												}
											});
											this.changeText("");
											Methods.toast("发表成功");
										}}
										style={styles.publishComment}
									>
										<Text
											style={{
												fontSize: 14,
												color: Colors.weixinColor,
												textAlign: "center"
											}}
										>
											发表评论
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							<SearchUserModal
								navigation={navigation}
								visible={aiteModalVisible}
								toggleVisible={this.toggleVisible}
								handleSelectedUser={user => {
									this.toggleVisible();
									this.changeText(value + `@${user.name} `);
								}}
							/>
						</BasicModal>
					);
				}}
			</Mutation>
		);
	}

	changeText = value => {
		this.setState({ value });
	};

	toggleVisible() {
		this.setState(prevState => ({ aiteModalVisible: !prevState.aiteModalVisible }));
	}

	_inputFocus() {
		let { replyingComment } = this.props;
		let { value } = this.state;

		// 如果回复的是同一条评论就不重新changeText
		if (replyingComment && this.prevReplyingComment.id !== replyingComment.id) {
			this.changeText(`@${replyingComment.user.name} `);
		} else if (replyingComment && value.indexOf(`@${replyingComment.user.name}`) !== 0) {
			this.changeText(`@${replyingComment.user.name} `);
		}
	}
}

const styles = StyleSheet.create({
	textInput: {
		height: 80,
		padding: 10,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		borderRadius: 3
	},
	textBottom: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	publishComment: {
		width: 80,
		height: 30,
		borderWidth: 1,
		borderColor: Colors.weixinColor,
		borderRadius: 3,
		justifyContent: "center"
	}
});

export default AddCommentModal;
