import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, Dimensions } from "react-native";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { Header } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";

const { width, height } = Dimensions.get("window");

class PublishedScreen extends React.Component {
	render() {
		const { navigation } = this.props;
		const article = navigation.getParam("article", {});
		return (
			<Screen>
				<View style={styles.container}>
					<View style={styles.published}>
						<View style={styles.publishedShare}>
							<View style={styles.sharetLeft}>
								<Iconfont name="book" size={70} color={Colors.darkGray} />
								<View style={styles.shareLabel}>
									<Iconfont name="contribute" size={30} color={Colors.themeColor} />
								</View>
							</View>
							<View style={styles.shareRight}>
								<Text style={styles.text1}>好东西值得与更多好朋友分享，分享文章到你的社交账号上吧！</Text>
								<Text style={[styles.text2, { marginTop: 12 }]}>或者你可以选择投稿到对应的专题</Text>
							</View>
						</View>
						{
							// 隐藏功能
							// <View>
							// 	<Text style={styles.text2}>分享到</Text>
							// </View>
						}
					</View>
					{
						// 隐藏功能
						// <View>{this.shareList()}</View>
					}
					<View style={styles.contribute}>
						<View style={styles.contributeTop}>
							<Text style={styles.text2}>投稿到</Text>
						</View>
						<TouchableOpacity style={styles.contributeBottom} onPress={() => navigation.replace("文章投稿", { article })}>
							<View style={styles.sharetLeft}>
								<Iconfont name="upload" size={30} color={Colors.themeColor} />
							</View>
							<View style={styles.shareRight}>
								<Text style={styles.text1}>向专题投稿</Text>
								<Text style={[styles.text2, { marginTop: 8 }]}>每篇文章最多可向5个专题投稿</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Screen>
		);
	}

	shareList = () => {
		return (
			<View style={styles.shareList}>
				<View style={styles.shareItemWrap}>
					<TouchableOpacity style={styles.shareItem} onPress={() => null}>
						<Iconfont name="image" size={28} color={Colors.darkBorderColor} />
					</TouchableOpacity>
					<Text style={styles.text3}>生成图片</Text>
				</View>
				<View style={styles.shareItemWrap}>
					<TouchableOpacity style={styles.shareItem} onPress={() => null}>
						<Image style={{ width: 33, height: 33, resizeMode: "cover" }} source={require("../../assets/images/weibo.png")} />
					</TouchableOpacity>
					<Text style={styles.text3}>新浪微博</Text>
				</View>
				<View style={styles.shareItemWrap}>
					<TouchableOpacity style={styles.shareItem} onPress={() => null}>
						<Iconfont name="weixin" size={33} color={Colors.weixinColor} />
					</TouchableOpacity>
					<Text style={styles.text3}>微信好友</Text>
				</View>
				<View style={styles.shareItemWrap}>
					<TouchableOpacity style={styles.shareItem} onPress={() => null}>
						<Image style={{ width: 30, height: 30, resizeMode: "cover" }} source={require("../../assets/images/pengyouquan.png")} />
					</TouchableOpacity>
					<Text style={styles.text3}>微信朋友圈</Text>
				</View>
				<View style={styles.shareItemWrap}>
					<TouchableOpacity style={styles.shareItem} onPress={() => null}>
						<Image style={{ width: 33, height: 33, resizeMode: "cover" }} source={require("../../assets/images/qq.png")} />
					</TouchableOpacity>
					<Text style={styles.text3}>QQ</Text>
				</View>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	published: {
		paddingTop: 40,
		paddingBottom: 15,
		paddingHorizontal: 15,
		backgroundColor: "#fbfbfb"
	},
	publishedShare: {
		paddingHorizontal: 15,
		marginBottom: 25,
		flexDirection: "row",
		alignItems: "center"
	},
	sharetLeft: {
		position: "relative",
		marginRight: 10
	},
	shareLabel: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center"
	},
	shareRight: {
		flex: 1,
		justifyContent: "space-between"
	},
	shareList: {
		paddingVertical: 35,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		flexDirection: "row"
	},
	shareItemWrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	shareItem: {
		width: width / 7,
		height: width / 7,
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 6
	},
	contribute: {
		flex: 1,
		backgroundColor: "#fbfbfb"
	},
	contributeTop: {
		padding: 15,
		backgroundColor: Colors.lightGray
	},
	contributeBottom: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor
	},
	text1: {
		fontSize: 16,
		lineHeight: 20,
		color: Colors.primaryFontColor
	},
	text2: {
		fontSize: 12,
		color: Colors.tintFontColor
	},
	text3: {
		fontSize: 11,
		color: Colors.primaryFontColor
	}
});

export default PublishedScreen;
