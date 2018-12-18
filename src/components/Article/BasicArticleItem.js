import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar } from "../Pure";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class BasicArticleItem extends Component {
	render() {
		let { article, navigation } = this.props;
		return (
			<View style={styles.article}>
				<View style={styles.main}>
					<View style={styles.topInfo}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("用户详情", {
									user: article.user
								})
							}
						>
							<Avatar size={28} uri={article.user.avatar} />
						</TouchableOpacity>
						<Text style={styles.authorName}>{article.user.name}</Text>
						<Text style={styles.timeAgo}>{article.time_ago}</Text>
					</View>
					<View style={styles.content}>
						<View>
							<Text numberOfLines={2} style={styles.title}>
								{article.title}
							</Text>
						</View>
						<View style={styles.meta}>
							<Text numberOfLines={1} style={styles.count}>
								{"喜欢·" + article.count_likes + "  评论·" + article.count_comments + "  赞赏·" + article.count_tips}
							</Text>
						</View>
					</View>
				</View>
				{article.has_image && (
					<View>
						<Image style={styles.articleImage} source={{ uri: article.cover }} />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	article: {
		height: 150,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	main: {
		flex: 1,
		marginRight: 12
	},
	image: {
		marginRight: 5,
		width: 88,
		height: 88,
		resizeMode: "cover",
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		borderRadius: 4
	},
	topInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	authorName: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginLeft: 6
	},
	timeAgo: {
		fontSize: 12,
		color: Colors.tintFontColor,
		marginLeft: 8
	},
	content: {
		paddingTop: 10
	},
	title: {
		fontSize: 17,
		lineHeight: 23,
		color: Colors.darkFontColor
	},
	meta: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "center"
	},
	count: {
		fontSize: 11,
		color: Colors.tintFontColor
	}
});

export default BasicArticleItem;
