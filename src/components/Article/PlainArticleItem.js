import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar } from "../Pure";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class PlainArticleItem extends Component {
	render() {
		let { article, navigation, showAuthorName = false } = this.props;
		return (
			<View style={styles.article}>
				<View style={styles.main}>
					<View style={styles.info}>
						{showAuthorName && (
							<Text
								style={styles.authorName}
								onPress={() =>
									navigation.navigate("用户详情", {
										user: article.user
									})
								}
							>
								{article.user.name}
							</Text>
						)}
						<Text style={styles.timeAgo}>{article.time_ago}</Text>
					</View>
					<View>
						<Text numberOfLines={2} style={styles.title}>
							{article.title}
						</Text>
					</View>
					<View>
						<Text numberOfLines={1} style={styles.meta}>
							{"阅读 · " +
								article.hits +
								" 喜欢 · " +
								article.count_likes +
								" 评论 · " +
								article.count_comments +
								"  赞赏 · " +
								article.count_tips}
						</Text>
					</View>
				</View>
				<View>{article.has_image && <Image style={styles.image} source={{ uri: article.cover }} />}</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	article: {
		height: 130,
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	main: {
		flex: 1,
		justifyContent: "center"
	},
	info: {
		flexDirection: "row",
		alignItems: "center"
	},
	image: {
		marginLeft: 10,
		marginRight: 5,
		width: 88,
		height: 88,
		resizeMode: "cover",
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		borderRadius: 4
	},
	authorName: {
		fontSize: 12,
		color: Colors.linkColor,
		marginRight: 10
	},
	timeAgo: {
		fontSize: 12,
		color: Colors.tintFontColor
	},
	title: {
		marginTop: 4,
		fontSize: 17,
		lineHeight: 23,
		color: Colors.darkFontColor
	},
	meta: {
		marginTop: 6,
		fontSize: 12,
		color: Colors.tintFontColor
	}
});

export default PlainArticleItem;
