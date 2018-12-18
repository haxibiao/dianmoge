import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import PostToolBar from "./PostToolBar";
import { CustomPopoverMenu } from "../../components/Modal";
import { Avatar, VideoCover } from "../Pure";
import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods, Divice } from "../../constants";

const IMG_SPACE = 2;
const COVER_WIDTH = Divice.width;

class PostItem extends PureComponent {
	render() {
		const { post, navigation, toggleShareModal, recommend, popover = true, options = ["不感兴趣"], popoverHandler = () => null } = this.props;
		let { type, user, time_ago, title, description, has_image, images, cover, category, hits, count_likes, count_replies } = post;
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={() => Methods.goContentScreen(navigation, post)}>
				<View style={styles.postContainer}>
					<View style={styles.postHeader}>
						<View style={styles.layoutFlexRow}>
							<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("用户详情", { user })}>
								<Avatar size={38} uri={user.avatar} />
							</TouchableOpacity>
							{recommend ? (
								<View style={{ marginLeft: 10 }}>
									<Text style={[styles.userName, { fontWeight: "500" }]}>{user.name}</Text>
								</View>
							) : (
								<View style={{ marginLeft: 10 }}>
									<Text style={styles.userName}>{user.name}</Text>
									<Text style={styles.timeAgo}>{time_ago}</Text>
								</View>
							)}
						</View>
						{popover && (
							<CustomPopoverMenu
								width={110}
								selectHandler={popoverHandler}
								triggerComponent={<Iconfont name={"more-vertical"} size={19} color={Colors.lightFontColor} />}
								options={options}
							/>
						)}
					</View>
					{this.renderContent(type, title, description)}
					{has_image && <View style={{ marginTop: 10 }}>{this.renderImage(type, images, cover)}</View>}
					{
						// <View style={{ paddingHorizontal: 15 }}>
						// 隐藏功能
						// <PostToolBar
						// 	post={post}
						// 	navigation={navigation}
						// 	skip={() => Methods.goContentScreen(navigation, post)}
						// 	toggleShareModal={toggleShareModal}
						// />
						// </View>
					}
					<View style={styles.footer}>
						{category ? (
							<TouchableWithoutFeedback
								onPress={() => navigation.dispatch(Methods.navigationAction({ routeName: "专题详情", params: { category } }))}
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
			</TouchableHighlight>
		);
	}

	renderContent = (type, title, description) => {
		if (type == "article") {
			return (
				<View style={styles.abstract}>
					<Text numberOfLines={2} style={styles.title}>
						{title}
					</Text>
					{description ? (
						<Text numberOfLines={3} style={styles.description}>
							{description}
						</Text>
					) : null}
				</View>
			);
		} else {
			return (
				<View style={styles.abstract}>
					<Text numberOfLines={3} style={styles.title}>
						{title ? title : description}
					</Text>
				</View>
			);
		}
	};

	renderImage = (type, images = [], cover) => {
		if (type == "video") {
			return (
				<View style={styles.coverWrap}>
					<VideoCover width={COVER_WIDTH} height={(COVER_WIDTH * 9) / 16} cover={cover} />
				</View>
			);
		} else if (type == "article") {
			return (
				<View style={styles.coverWrap}>
					<Image style={styles.cover} source={{ uri: cover }} />
				</View>
			);
		} else if (type == "post") {
			let images_length = images.length;
			let sizeArr = Methods.imgsLayoutSize(images_length, IMG_SPACE);
			return (
				<View style={[styles.layoutFlexRow, styles.gridView]}>
					{images.slice(0, 9).map(function(img, i) {
						if (img) return <Image style={[sizeArr[i], styles.gridImage]} source={{ uri: img }} key={i} />;
					})}
				</View>
			);
		}
	};
}

const styles = StyleSheet.create({
	postContainer: {
		backgroundColor: Colors.skinColor,
		paddingTop: 20,
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	layoutFlexRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	postHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	userName: {
		fontSize: 14,
		color: Colors.darkFontColor
	},
	timeAgo: {
		fontSize: 12,
		marginTop: 6,
		color: Colors.tintFontColor
	},
	coverWrap: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.tintGray,
		overflow: "hidden"
	},
	cover: {
		width: COVER_WIDTH,
		height: COVER_WIDTH * 0.5,
		resizeMode: "cover"
	},
	gridView: {
		flexWrap: "wrap",
		marginLeft: -IMG_SPACE,
		marginTop: -IMG_SPACE
	},
	gridImage: {
		resizeMode: "cover",
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.tintGray
	},
	abstract: {
		paddingHorizontal: 15,
		marginTop: 15
	},
	title: {
		fontSize: 16,
		lineHeight: 22,
		color: Colors.darkFontColor
	},
	description: {
		marginTop: 10,
		fontSize: 14,
		lineHeight: 20,
		color: Colors.tintFontColor
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	categoryName: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.themeColor
	},
	metaCount: {
		fontSize: 13,
		color: Colors.lightFontColor,
		marginLeft: 3
	}
});

export default withNavigation(PostItem);
