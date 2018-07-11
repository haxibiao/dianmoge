import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import { Header } from "../../components/Header";
import { Avatar } from "../../components/Pure";
import { ShareModal } from "../../components/Modal";
import Screen from "../Screen";

import actions from "../../store/actions";
import { connect } from "react-redux";
import { Query, Mutation } from "react-apollo";
import { categoryDetailQuery } from "../../graphql/category.graphql";

const { width, height } = Dimensions.get("window");

class IntroduceScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		this.state = {
			modalVisible: false
		};
	}

	render() {
		let { modalVisible } = this.state;
		let { navigation } = this.props;
		let { category } = navigation.state.params;
		return (
			<Screen customStyle={{ backgroundColor: Colors.nightColor }} lightBar>
				<View style={styles.container}>
					<Header navigation={navigation} customStyle={{ backgroundColor: "transparent", borderBottomColor: "transparent" }} lightTabBar />
					<ScrollView style={styles.visitingCardContainer}>
						<View style={styles.visitingCard}>
							<View style={{ alignItems: "center" }}>
								<View style={{ marginVertical: 15 }}>
									<Avatar uri={category.logo} type="category" size={90} borderStyle={{ borderColor: "#fff", borderWidth: 2 }} />
								</View>
								<View>
									<Text style={{ fontSize: 22, fontWeight: "500", color: Colors.primaryFontColor }}>{category.name}</Text>
								</View>
								<View style={{ marginTop: 15 }}>
									<Text style={{ fontSize: 15, color: "#666" }}>
										{category.count_follows}人关注·{category.count_articles}篇帖子
									</Text>
								</View>
							</View>
							<View style={styles.gutterWrap}>
								<View style={styles.hole} />
								<View style={styles.gutter} />
								<View style={styles.hole} />
							</View>
							<View style={styles.cardBottom}>
								<View>
									<Text style={{ fontSize: 15, color: Colors.primaryFontColor, lineHeight: 21 }}>
										{category.description ? category.description : "暂无简介"}
									</Text>
								</View>
								<View style={styles.QRcodeRow}>
									<Image style={styles.QRcode} source={{ uri: "https://www.dongmeiwei.com/images/app/heiheihei.png" }} />
									<View style={styles.QRcodeInfo}>
										<Text style={{ fontSize: 12, color: Colors.primaryFontColor }}>长按识别图中二维码，查看该专题的{Config.AppName}主页</Text>
									</View>
								</View>
							</View>
						</View>
					</ScrollView>
					<View style={styles.bottomSection}>
						<View>
							<Text style={{ fontSize: 14, color: "#fff", textAlign: "center" }}>———— 分享图片到 ————</Text>
						</View>
						<View style={styles.shareVisitingCrad}>
							<TouchableOpacity>
								<Iconfont name={"weixin"} size={35} color={Colors.weixinColor} />
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									style={{ width: 32, height: 32, resizeMode: "contain" }}
									source={require("../../assets/images/pengyouquan.png")}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.toggleModalVisible}>
								<Iconfont name={"more"} size={36} color={Colors.lightFontColor} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
			</Screen>
		);
	}

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.nightColor
	},
	visitingCardContainer: {
		flex: 1,
		paddingHorizontal: 20
	},
	visitingCard: {
		marginTop: 35,
		marginBottom: 25,
		borderRadius: 5,
		backgroundColor: "#fff"
	},
	gutterWrap: {
		marginTop: 25,
		marginHorizontal: -8,
		flexDirection: "row",
		alignItems: "center"
	},
	gutter: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.lightGray,
		marginHorizontal: 16
	},
	hole: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: Colors.nightColor
	},
	cardBottom: {
		paddingHorizontal: 20,
		paddingVertical: 15
	},
	QRcodeRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30
	},
	QRcode: {
		width: 58,
		height: 58,
		resizeMode: "contain",
		marginRight: 12
	},
	QRcodeInfo: {
		flex: 1,
		marginTop: 3,
		height: 55,
		borderTopWidth: 1,
		borderColor: Colors.lightBorderColor,
		justifyContent: "center"
	},
	bottomSection: {
		paddingVertical: 25,
		backgroundColor: "#303030"
	},
	shareVisitingCrad: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	}
});

export default IntroduceScreen;
