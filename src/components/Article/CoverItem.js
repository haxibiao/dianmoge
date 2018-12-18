import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { navigationAction, goContentScreen } from "../../constants/Methods";
import { Avatar, VideoCover } from "../Pure";

const { height, width } = Dimensions.get("window");

class CoverItem extends PureComponent {
	render() {
		const { post, navigation } = this.props;
		let { type, user, time_ago, title, description, cover, has_image, category, hits, count_likes, count_replies } = post;
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={() => goContentScreen(navigation, post)}>
				<View style={styles.postContainer}>
					<View style={[styles.layoutFlexRow, styles.postUser]}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.dispatch(navigationAction({ routeName: "用户详情", params: { user } }))}
						>
							<Avatar size={38} uri={user.avatar} />
						</TouchableOpacity>
						<View style={styles.userInfo}>
							<Text style={styles.userName}>{user.name}</Text>
							<Text style={styles.timeAgo}>{time_ago}</Text>
						</View>
					</View>
					<View>{has_image && this._renderCover(type, cover)}</View>
					<View style={styles.postContent}>
						{type == "article" ? (
							<View>
								<Text numberOfLines={2} style={styles.title}>
									{title}
								</Text>
								<Text numberOfLines={3} style={styles.abstract}>
									{description}
								</Text>
							</View>
						) : (
							<Text numberOfLines={2} style={styles.title}>
								{description ? description : title}
							</Text>
						)}
						<View style={[styles.layoutFlexRow, styles.postFooter]}>
							{category ? (
								<TouchableWithoutFeedback
									onPress={() => navigation.dispatch(navigationAction({ routeName: "专题详情", params: { category } }))}
								>
									<View>
										<Text style={styles.categoryName}>#{category.name}</Text>
									</View>
								</TouchableWithoutFeedback>
							) : null}
							<View style={styles.layoutFlexRow}>
								{hits > 0 && (
									<Text style={styles.metaCount}>
										{hits || 0}
										次查看
									</Text>
								)}
								{count_likes > 0 && (
									<Text style={styles.metaCount}>
										{"· " + count_likes || 0}
										人喜欢
									</Text>
								)}
								{count_replies > 0 && (
									<Text style={styles.metaCount}>
										{"· " + count_replies || 0}
										条评论
									</Text>
								)}
							</View>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	_renderCover = (type, cover) => {
		if (type == "video") {
			return <VideoCover width={width} height={(width * 9) / 16} cover={cover} markWidth={44} markSize={22} customStyle={styles.coverWrap} />;
		} else {
			return <Image style={[styles.articleCover, styles.coverWrap]} source={{ uri: cover }} />;
		}
	};
}

const styles = StyleSheet.create({
	postContainer: {
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	layoutFlexRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	postUser: {
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
	articleCover: {
		width,
		height: width * 0.5,
		resizeMode: "cover"
	},
	coverWrap: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.tintGray,
		overflow: "hidden"
	},
	postContent: {
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	title: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "500",
		color: Colors.primaryFontColor
	},
	abstract: {
		marginTop: 10,
		fontSize: 14,
		lineHeight: 20,
		color: "#666"
	},
	postFooter: {
		marginTop: 10,
		justifyContent: "space-between"
	},
	categoryName: {
		fontSize: 13,
		color: Colors.themeColor
	},
	metaCount: {
		fontSize: 12,
		color: Colors.lightFontColor,
		marginLeft: 3
	}
});

export default withNavigation(CoverItem);
