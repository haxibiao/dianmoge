import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableWithoutFeedback, Dimensions, TouchableHighlight } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { navigationAction } from "../../constants/Methods";
import { Avatar, VideoCover } from "../Pure";
import { CustomPopoverMenu } from "../../components/Modal";

const { width, height } = Dimensions.get("window");
const IMG_INTERVAL = 8;
const IMG_WIDTH = (width - 46) / 3;

class NoteItem extends Component {
	render() {
		const { post, navigation, compress, recommend, longPress = () => null } = this.props;
		let { type, user, time_ago, title, description, category, has_image, images, cover, hits, count_likes, count_comments } = post;
		let layout = images.length > 1 ? "vertical" : "horizontal";
		return (
			<TouchableHighlight underlayColor={Colors.tintGray} onPress={this.skipScreen} onLongPress={longPress}>
				<View style={styles.noteContainer}>
					{!compress ? (
						<View style={styles.noteUser}>
							{user && (
								<View style={styles.userInfo}>
									<TouchableWithoutFeedback
										onPress={() => navigation.dispatch(navigationAction({ routeName: "用户详情", params: { user } }))}
									>
										<Avatar size={28} uri={user.avatar} />
									</TouchableWithoutFeedback>
									<Text style={styles.userName}>{user.name}</Text>
								</View>
							)}
							{recommend ? (
								<CustomPopoverMenu
									width={110}
									selectHandler={() => null}
									triggerComponent={<Iconfont name={"more-vertical"} size={19} color={Colors.lightFontColor} />}
									options={["不感兴趣"]}
								/>
							) : null}
						</View>
					) : (
						<View style={styles.noteUser}>
							<Text style={{ fontSize: 14, color: Colors.tintFontColor }}>{time_ago}</Text>
						</View>
					)}
					{type == "video" ? (
						<View style={styles.layoutFlexRow}>
							<View style={{ flex: 1 }}>
								<View>
									<Text numberOfLines={2} style={styles.title}>
										{description ? description : title}
									</Text>
								</View>
								{this._renderFooter(category, hits, count_comments, count_likes)}
							</View>
							<View>{this._renderCover(layout, has_image, type, cover, images)}</View>
						</View>
					) : (
						<View>
							<View style={layout == "horizontal" && styles.layoutFlexRow}>
								<View style={{ flex: 1 }}>
									{title ? (
										<View>
											<Text numberOfLines={2} style={styles.title}>
												{title}
											</Text>
										</View>
									) : null}
									{description ? (
										<View>
											<Text numberOfLines={2} style={styles.description}>
												{description}
											</Text>
										</View>
									) : null}
								</View>
								<View>{this._renderCover(layout, has_image, type, cover, images)}</View>
							</View>
							{this._renderFooter(category, hits, count_comments, count_likes)}
						</View>
					)}
				</View>
			</TouchableHighlight>
		);
	}

	_renderFooter = (category, hits, count_comments, count_likes) => {
		const { navigation } = this.props;
		return (
			<View style={styles.noteFooter}>
				{category ? (
					<TouchableWithoutFeedback onPress={() => navigation.dispatch(navigationAction({ routeName: "专题详情", params: { category } }))}>
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
						<Text style={styles.count}>{count_comments || 0}</Text>
					</View>
					<View style={styles.meta}>
						<Iconfont name={"like"} size={14} color={Colors.lightFontColor} />
						<Text style={styles.count}>{count_likes || 0}</Text>
					</View>
				</View>
			</View>
		);
	};

	_renderCover = (layout, has_image, type, cover, images) => {
		if (type == "video") {
			return (
				<View style={styles.coverWrap}>
					<VideoCover width={IMG_WIDTH} height={IMG_WIDTH} cover={cover} markWidth={32} markSize={16} />
				</View>
			);
		} else {
			if (layout == "horizontal" && cover) {
				return (
					<View style={styles.coverWrap}>
						<Image style={styles.noteImage} source={{ uri: cover }} />
					</View>
				);
			} else if (layout == "vertical") {
				return (
					<View style={[styles.gridView, styles.layoutFlexRow]}>
						{images.slice(0, 3).map(function(img, i) {
							if (img) return <Image key={i} style={[styles.noteImage, styles.imgWrap]} source={{ uri: img }} />;
						})}
					</View>
				);
			}
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
		marginBottom: 10
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	userName: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginLeft: 6
	},
	layoutFlexRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	noteImage: {
		width: IMG_WIDTH,
		height: IMG_WIDTH,
		resizeMode: "cover"
	},
	coverWrap: {
		marginLeft: IMG_INTERVAL,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		overflow: "hidden"
	},
	imgWrap: {
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		marginLeft: IMG_INTERVAL
	},
	gridView: {
		marginLeft: -IMG_INTERVAL,
		marginTop: 10
	},
	title: {
		fontSize: 17,
		lineHeight: 23,
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
		alignItems: "center"
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
	}
});

export default withNavigation(NoteItem);
