import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";

import PostToolBar from "./PostToolBar";
import { Avatar, VideoCover } from "../Pure";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { navigationAction } from "../../constants/Methods";

const { height, width } = Dimensions.get("window");
const IMG_INTERVAL = 8;
const COVER_WIDTH = width - 30;
const IMG_WIDTH = (width - 46) / 3;

class PostItem extends PureComponent {
	render() {
		const { post, navigation, toggleShareModal } = this.props;
		let { type, user, time_ago, title, description, images, cover, has_image } = post;
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={this.skipScreen}>
				<View style={styles.postContainer}>
					<View style={styles.layoutFlexRow}>
						<TouchableWithoutFeedback onPress={() => navigation.navigate("用户详情", { user: user })}>
							<Avatar size={30} uri={user.avatar} />
						</TouchableWithoutFeedback>
						<Text style={styles.userName}>{user.name}</Text>
						<Text style={styles.timeAgo}>{time_ago}</Text>
					</View>
					{type == "article" ? (
						<View style={styles.abstract}>
							<Text numberOfLines={2} style={styles.title}>
								{title}
							</Text>
							{description ? (
								<Text numberOfLines={2} style={styles.description}>
									{description}
								</Text>
							) : null}
						</View>
					) : (
						<View style={styles.abstract}>
							<Text numberOfLines={2} style={styles.title}>
								{title ? title : description}
							</Text>
						</View>
					)}
					<View>{has_image && this.renderImage(type, images, cover)}</View>
					<PostToolBar post={post} navigation={navigation} skip={this.skipScreen} toggleShareModal={toggleShareModal} />
				</View>
			</TouchableHighlight>
		);
	}

	renderImage = (type, images, cover) => {
		if (type == "video") {
			return (
				<View style={styles.coverWrap}>
					<VideoCover width={COVER_WIDTH} height={COVER_WIDTH * 9 / 16} cover={cover} />
				</View>
			);
		} else if (images.length == 1) {
			return (
				<View style={styles.coverWrap}>
					<Image style={styles.cover} source={{ uri: cover }} />
				</View>
			);
		} else if (images.length > 1) {
			return (
				<View style={[styles.gridView, styles.layoutFlexRow]}>
					{images.slice(0, 3).map(function(img, i) {
						if (img) return <Image style={[styles.gridImage, styles.imgWrap]} source={{ uri: img }} key={i} />;
					})}
				</View>
			);
		}
	};

	skipScreen = () => {
		const { post, navigation } = this.props;
		let { type } = post;
		let routeName = type == "article" ? "文章详情" : "视频详情";
		let params = type == "article" ? { article: post } : { video: post };
		navigation.dispatch(navigationAction({ routeName, params }));
	};
}

const styles = StyleSheet.create({
	postContainer: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		paddingHorizontal: 15,
		paddingTop: 10,
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	layoutFlexRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	userName: {
		fontSize: 14,
		marginHorizontal: 10,
		color: Colors.primaryFontColor
	},
	timeAgo: {
		fontSize: 14,
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
	gridImage: {
		width: IMG_WIDTH,
		height: IMG_WIDTH,
		resizeMode: "cover"
	},
	coverWrap: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		overflow: "hidden"
	},
	imgWrap: {
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		marginLeft: IMG_INTERVAL
	},
	abstract: {
		marginTop: 15,
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
	}
});

export default withNavigation(PostItem);
