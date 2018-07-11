import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight, TouchableWithoutFeedback } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Avatar } from "../Pure";

const { height, width } = Dimensions.get("window");

class HomeArticleItem extends PureComponent {
	render() {
		let { article, navigation } = this.props;
		if (!article.has_image) {
			return null;
		}
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={() => navigation.navigate("文章详情", { article })}>
				<View style={styles.articleContainer}>
					<View style={styles.authorItem}>
						<TouchableWithoutFeedback onPress={() => navigation.navigate("用户详情", { user: article.user })}>
							<Avatar size={38} uri={article.user.avatar} />
						</TouchableWithoutFeedback>
						<View style={styles.userInfo}>
							<Text style={styles.userName}>{article.user.name}</Text>
							<Text style={styles.timeAgo}>{article.time_ago}</Text>
						</View>
					</View>
					<View>
						<Image style={styles.cover} source={{ uri: article.cover }} />
					</View>
					<View style={styles.content}>
						<Text numberOfLines={2} style={styles.title}>
							{article.title}
						</Text>
						<Text numberOfLines={3} style={styles.abstract}>
							{article.description}
						</Text>
						<View style={styles.meta}>
							{article.category ? (
								<TouchableWithoutFeedback
									onPress={() =>
										navigation.navigate("专题详情", {
											category: article.category
										})}
								>
									<View>
										<Text style={styles.categoryName}>#{article.category.name}</Text>
									</View>
								</TouchableWithoutFeedback>
							) : null}
							<View style={styles.labels}>
								{article.hits > 0 && <Text style={styles.count}>{article.hits || 0}次查看</Text>}
								{article.count_likes > 0 && <Text style={styles.count}>{"· " + article.count_likes || 0}人喜欢</Text>}
								{article.count_comments > 0 && <Text style={styles.count}>{"· " + article.count_comments || 0}条评论</Text>}
							</View>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	_keyExtractor = (item, index) => (item.key ? item.key : index.toString());
}

const styles = StyleSheet.create({
	articleContainer: {
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	authorItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15
	},
	userInfo: {
		justifyContent: "space-between",
		marginLeft: 10
	},
	userName: {
		fontSize: 14,
		lineHeight: 18,
		color: Colors.primaryFontColor
	},
	timeAgo: {
		fontSize: 12,
		lineHeight: 18,
		color: Colors.tintFontColor
	},
	cover: {
		width: width,
		height: width * 9 / 16,
		resizeMode: "cover"
	},
	content: {
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	title: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: "500",
		color: Colors.darkFontColor
	},
	abstract: {
		marginTop: 10,
		fontSize: 14,
		lineHeight: 20,
		color: Colors.tintFontColor
	},
	meta: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	categoryName: {
		fontSize: 12,
		color: Colors.themeColor
	},
	labels: {
		flexDirection: "row",
		alignItems: "center"
	},
	label: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15
	},
	count: {
		fontSize: 11,
		color: Colors.lightFontColor,
		marginLeft: 3
	}
});

export default HomeArticleItem;
