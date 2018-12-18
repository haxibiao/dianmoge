import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { navigationAction } from "../../constants/Methods";

import { Mutation } from "react-apollo";
import { likeArticleMutation } from "../../graphql/user.graphql";
import { connect } from "react-redux";

class PostToolBar extends Component {
	render() {
		let { login, post, navigation, skip = () => null, toggleShareModal = () => null } = this.props;
		let { id, liked, count_shares, count_replies, count_likes } = post;
		return (
			<Mutation mutation={likeArticleMutation}>
				{likeArticle => {
					return (
						<View style={styles.toolBar}>
							<TouchableOpacity
								style={styles.toolItem}
								onPress={() => {
									if (login) {
										likeArticle({
											variables: {
												article_id: id,
												undo: liked
											}
										});
									} else {
										navigation.navigate("登录注册");
									}
								}}
							>
								<Iconfont
									name={liked ? "praise" : "praise-outline"}
									size={21}
									color={liked ? Colors.themeColor : Colors.darkFontColor}
								/>
								<Text style={styles.text}>{count_likes ? count_likes : "点赞"}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.toolItem} onPress={skip}>
								<Iconfont name={"comment-hollow"} size={21} color={Colors.darkFontColor} />
								<Text style={styles.text}>{count_replies ? count_replies : "评论"}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.toolItem} onPress={() => toggleShareModal(post)}>
								<Iconfont name={"share-cycle"} size={18} color={Colors.darkFontColor} />
								<Text style={styles.text}>{count_shares ? count_shares : "分享"}</Text>
							</TouchableOpacity>
						</View>
					);
				}}
			</Mutation>
		);
	}
}

const styles = StyleSheet.create({
	toolBar: {
		flexDirection: "row",
		alignItems: "center"
	},
	toolItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 40
	},
	text: {
		fontSize: 13,
		color: Colors.primaryFontColor,
		marginLeft: 5
	}
});

export default connect(store => {
	return { login: store.users.login };
})(PostToolBar);
