import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableWithoutFeedback, Dimensions, TouchableHighlight } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Avatar } from "../Pure";
import { CustomPopoverMenu } from "../../components/Modal";

const { width, height } = Dimensions.get("window");
width -= 30;

class RecommendArticle extends Component {
	render() {
		let { article, navigation } = this.props;
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={() => navigation.navigate("文章详情", { article })}>
				<View style={styles.article}>
					<View style={styles.top}>
						{article.user && (
							<View style={styles.info}>
								<TouchableWithoutFeedback
									onPress={() =>
										navigation.navigate("用户详情", {
											user: article.user
										})}
								>
									<Avatar size={28} uri={article.user.avatar} />
								</TouchableWithoutFeedback>
								<Text style={styles.authorName}>{article.user.name}</Text>
							</View>
						)}
						<CustomPopoverMenu
							width={110}
							selectHandler={() => null}
							triggerComponent={<Iconfont name={"more-vertical"} size={19} color={Colors.lightFontColor} />}
							options={["不感兴趣"]}
						/>
					</View>
					<View style={styles.main}>
						<View style={styles.content}>
							{article.title ? (
								<View>
									<Text numberOfLines={2} style={styles.title}>
										{article.title}
									</Text>
								</View>
							) : null}
							{article.description ? (
								<View>
									<Text numberOfLines={article.has_image ? 1 : 2} style={styles.abstract}>
										{article.description}
									</Text>
								</View>
							) : null}
							<View style={styles.meta}>
								{article.category ? (
									<TouchableWithoutFeedback
										onPress={() =>
											navigation.navigate("专题详情", {
												category: article.category
											})}
									>
										<View style={styles.category}>
											<Iconfont name="category-rotate" size={12} color={Colors.themeColor} />
											<Text style={styles.categoryName}>{article.category.name}</Text>
										</View>
									</TouchableWithoutFeedback>
								) : null}
								<View style={styles.labels}>
									<View style={styles.label}>
										<Iconfont name={"browse-outline"} size={15} color={Colors.lightFontColor} />
										<Text style={styles.count}>{article.hits || 0}</Text>
									</View>
									<View style={styles.label}>
										<Iconfont name={"comment-outline"} size={15} color={Colors.lightFontColor} />
										<Text style={styles.count}>{article.count_comments || 0}</Text>
									</View>
								</View>
							</View>
						</View>
						{article.has_image && (
							<View>
								<Image style={styles.image} source={{ uri: article.cover }} />
							</View>
						)}
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	article: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		justifyContent: "center",
		borderBottomWidth: 8,
		borderBottomColor: Colors.lightBorderColor
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 5
	},
	info: {
		flexDirection: "row",
		alignItems: "center"
	},
	authorName: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginLeft: 6
	},
	main: {
		paddingTop: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	content: {
		flex: 1,
		height: 100,
		justifyContent: "space-between"
	},
	image: {
		width: 150,
		height: 100,
		marginLeft: 10,
		resizeMode: "cover",
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	title: {
		fontSize: 17,
		lineHeight: 23,
		color: Colors.darkFontColor
	},
	abstract: {
		fontSize: 13,
		lineHeight: 19,
		color: Colors.tintFontColor
	},
	meta: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	labels: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	label: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 8
	},
	category: {
		flexDirection: "row",
		alignItems: "center"
	},
	categoryName: {
		fontSize: 12,
		color: Colors.themeColor
	},
	count: {
		fontSize: 11,
		color: Colors.lightFontColor,
		marginLeft: 2
	}
});

export default RecommendArticle;
