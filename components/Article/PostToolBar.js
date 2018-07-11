import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { navigationAction } from "../../constants/Methods";

import { Query, Mutation } from "react-apollo";
import { likeArticleMutation } from "../../graphql/user.graphql";

class PostToolBar extends Component {
	render() {
		let { post, navigation, skip, toggleShareModal } = this.props;
		let { id, liked, count_shares, count_replies, count_likes } = post;
		return (
			<Mutation mutation={likeArticleMutation}>
				{likeArticle => {
					return (
						<View style={styles.toolBar}>
							<TouchableOpacity style={styles.toolItem} onPress={() => toggleShareModal(post)}>
								<Iconfont name={"share-outline"} size={18} color={Colors.tintFontColor} />
								<Text style={styles.text}>{count_shares ? count_shares : "分享"}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.toolItem} onPress={skip}>
								<Iconfont name={"comment-hollow"} size={18} color={Colors.tintFontColor} />
								<Text style={styles.text}>{count_replies ? count_replies : "评论"}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.toolItem}
								onPress={() =>
									likeArticle({
										variables: {
											article_id: id,
											undo: liked
										}
									})}
							>
								<Iconfont
									name={liked ? "praise" : "praise-outline"}
									size={18}
									color={liked ? Colors.themeColor : Colors.tintFontColor}
								/>
								<Text style={styles.text}>{count_likes ? count_likes : "点赞"}</Text>
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
		color: Colors.tintFontColor,
		marginLeft: 5
	},
	active: {
		color: Colors.weiboColor
	}
});

export default PostToolBar;
