import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions, TouchableHighlight } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Divice, Methods } from "../../constants";
import { Avatar, VideoCover } from "../Pure";
import { CustomPopoverMenu } from "../../components/Modal";

const IMG_INTERVAL = 2;
const IMG_WIDTH = (Divice.width - 34) / 3;
const COVER_WIDTH = Divice.width - 30;

class NoteItem extends Component {
	render() {
		const { post, navigation, compress, longPress = () => null, onPress, popoverOptions, popoverHandler = () => null } = this.props;
		let { type, user, time_ago, title, description, category, has_image, images, cover, hits, count_likes, count_replies } = post;
		return (
			<TouchableHighlight
				underlayColor={Colors.tintGray}
				onPress={onPress ? onPress : () => Methods.goContentScreen(navigation, post)}
				onLongPress={longPress}
			>
				<View style={styles.noteContainer}>
					<View style={styles.noteUser}>
						{compress ? (
							<Text style={{ fontSize: 14, color: Colors.tintFontColor }}>{time_ago}</Text>
						) : (
							<View style={styles.userInfo}>
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => navigation.dispatch(Methods.navigationAction({ routeName: "用户详情", params: { user } }))}
								>
									<Avatar size={34} uri={user.avatar} />
								</TouchableOpacity>
								<View style={{ marginLeft: 10 }}>
									<Text style={styles.userName}>{user.name}</Text>
									<Text style={styles.timeAgo}>{time_ago}</Text>
								</View>
							</View>
						)}
						{popoverOptions && (
							<CustomPopoverMenu
								width={110}
								selectHandler={popoverHandler}
								triggerComponent={<Iconfont name={"more-vertical"} size={19} color={Colors.lightFontColor} />}
								options={popoverOptions}
							/>
						)}
					</View>
					{type == "article" ? (
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
					) : (
						<View style={styles.abstract}>
							<Text numberOfLines={3} style={styles.title}>
								{title ? title : description}
							</Text>
						</View>
					)}
					<View>{has_image && this.renderImage(type, images, cover)}</View>
					{this._renderFooter(category, hits, count_replies, count_likes)}
				</View>
			</TouchableHighlight>
		);
	}

	_renderFooter = (category, hits, count_replies, count_likes) => {
		const { navigation } = this.props;
		return (
			<View style={styles.noteFooter}>
				{category ? (
					<TouchableWithoutFeedback
						onPress={() => navigation.dispatch(Methods.navigationAction({ routeName: "专题详情", params: { category } }))}
					>
						<View style={styles.layoutFlexRow}>
							<Iconfont name="category-rotate" size={12} color={Colors.lightFontColor} />
							<Text style={styles.categoryName}>{category.name}</Text>
						</View>
					</TouchableWithoutFeedback>
				) : null}
				<View style={styles.layoutFlexRow}>
					<View style={styles.meta}>
						<Iconfont name={"browse"} size={15} color={Colors.lightFontColor} />
						<Text style={styles.count}>{hits || 0}</Text>
					</View>
					<View style={styles.meta}>
						<Iconfont name={"comment"} size={14} color={Colors.lightFontColor} />
						<Text style={styles.count}>{count_replies || 0}</Text>
					</View>
					<View style={styles.meta}>
						<Iconfont name={"like"} size={14} color={Colors.lightFontColor} />
						<Text style={styles.count}>{count_likes || 0}</Text>
					</View>
				</View>
			</View>
		);
	};

	renderImage = (type, images, cover) => {
		if (type == "video") {
			return <VideoCover width={COVER_WIDTH} height={(COVER_WIDTH * 9) / 16} cover={cover} />;
		} else if (images.length >= 1) {
			return (
				<View style={[styles.gridView, styles.layoutFlexRow]}>
					{images.slice(0, 3).map(function(img, i) {
						if (img) return <Image style={styles.gridImage} source={{ uri: img }} key={i} />;
					})}
				</View>
			);
		}
	};
}

const styles = StyleSheet.create({
	noteContainer: {
		padding: 15,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	noteUser: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 5,
		marginBottom: 15
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	userName: {
		fontSize: 14,
		color: Colors.primaryFontColor
	},
	timeAgo: {
		fontSize: 12,
		marginTop: 6,
		color: Colors.tintFontColor
	},
	cover: {
		width: COVER_WIDTH,
		height: COVER_WIDTH * 0.5,
		resizeMode: "cover"
	},
	gridView: {
		marginLeft: -IMG_INTERVAL
	},
	rightImage: {
		width: 92,
		height: 92,
		resizeMode: "cover"
	},
	gridImage: {
		width: IMG_WIDTH,
		height: IMG_WIDTH,
		marginLeft: IMG_INTERVAL,
		resizeMode: "cover"
	},
	abstract: {
		marginBottom: 10
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
	noteFooter: {
		marginTop: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	meta: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 8
	},
	categoryName: {
		fontSize: 12,
		color: Colors.tintFontColor,
		marginLeft: 3
	},
	count: {
		fontSize: 11,
		color: Colors.lightFontColor,
		marginLeft: 3
	},
	layoutFlexRow: {
		flexDirection: "row",
		alignItems: "center"
	}
});

export default withNavigation(NoteItem);
