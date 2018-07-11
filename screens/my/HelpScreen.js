import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, FlatList, Text, Dimensions } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import { CustomScrollTabBar, ContentEnd, LoadingMore } from "../../components/Pure";
import { Header, HeaderLeft } from "../../components/Header";
import Screen from "../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../store/actions";

let { width, height } = Dimensions.get("window");

class HelpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hot: [
				{ id: 1, title: "收入结算与提现常见问题（ iOS ）" },
				{ id: 2, title: `${Config.AppName}收入结算与提现常见问题` },
				{ id: 3, title: "为什么文章会被锁定？" },
				{ id: 104, title: `${Config.AppName}账号绑定解绑相关问题汇总` },
				{ id: 5, title: `${Config.AppName}官方专题投稿指南大全` },
				{ id: 6, title: "关于文章投稿次数的有关说明" },
				{ id: 7, title: "关于举报“抄袭类文章”的说明" },
				{ id: 8, title: "如果你被封号了？" },
				{ id: 109, title: "我该如何发表付费内容？" },
				{ id: 10, title: `如何在${Config.AppName}进行创作` },
				{ id: 11, title: "删除的文章如何找回，有回收站吗？" }
			],
			explain: [
				{ id: 1, title: `如何在${Config.AppName}进行创作` },
				{ id: 2, title: "如何让更多的人看到自己的文章" },
				{ id: 3, title: "发现页热门文章使用指南" },
				{ id: 104, title: "公告：关于首页投稿专题密集投稿相关问题" },
				{ id: 5, title: "如何创建并玩转属于你自己的专题" }
			],
			account: [{ id: 1, title: "为什么文章会被锁定？" }, { id: 2, title: "如果你被封号了？" }, { id: 3, title: "身份认证" }]
		};
	}

	render() {
		let { hot, explain, account } = this.state;
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header
						navigation={navigation}
						rightComponent={
							<TouchableOpacity onPress={() => navigation.navigate("意见反馈")}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.themeColor
									}}
								>
									去反馈
								</Text>
							</TouchableOpacity>
						}
					/>
					<ScrollView style={styles.container}>
						<FlatList
							data={hot}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderHelpItem}
							ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
							ListHeaderComponent={this._renderHeader("热门问题")}
						/>
						<FlatList
							data={explain}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderHelpItem}
							ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
							ListHeaderComponent={this._renderHeader(`如何玩转${Config.AppName}`)}
						/>
						<FlatList
							data={account}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderHelpItem}
							ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
							ListHeaderComponent={this._renderHeader(`${Config.AppName}账号问题`)}
						/>
						<View style={styles.feedBack}>
							<Image
								style={styles.image}
								source={{
									uri: "https://dongmeiwei.com/images/feedBack.png"
								}}
							/>
							<View>
								<Text
									style={{
										fontSize: 15,
										color: Colors.tintFontColor,
										textAlign: "center"
									}}
								>
									没解决你的疑问？
									<Text
										style={{
											marginLeft: 10,
											color: Colors.linkColor
										}}
										onPress={() => navigation.navigate("意见反馈")}
									>
										去反馈~
									</Text>
								</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</Screen>
		);
	}

	_keyExtractor = (item, index) => item.id.toString();

	_renderHeader(title) {
		return (
			<View style={[styles.classifyWrap, title == "热门问题" && { borderTopColor: "transparent" }]}>
				<View style={styles.classifyItem}>
					<Text style={styles.classifyText}>{title}</Text>
				</View>
			</View>
		);
	}

	_renderHelpItem = ({ item, index }) => {
		let { navigation } = this.props;
		return (
			<TouchableOpacity onPress={() => navigation.navigate("文章详情", { article: item })}>
				<View style={styles.HelpItem}>
					<Text style={styles.HelpText}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	classifyWrap: {
		padding: 15,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: Colors.lightBorderColor
	},
	classifyItem: {
		paddingLeft: 10,
		borderLeftColor: Colors.themeColor,
		borderLeftWidth: 3
	},
	classifyText: {
		fontSize: 17,
		lineHeight: 20,
		color: Colors.primaryFontColor
	},
	HelpItem: {
		marginHorizontal: 15,
		paddingVertical: 10
	},
	itemSeparator: {
		marginHorizontal: 15,
		height: 1,
		backgroundColor: Colors.tintGray
	},
	HelpText: {
		fontSize: 16,
		lineHeight: 23,
		color: Colors.primaryFontColor
	},
	feedBack: {
		paddingTop: 30,
		paddingBottom: 40,
		alignItems: "center",
		backgroundColor: Colors.lightGray
	},
	image: {
		width: width / 6,
		height: width / 4,
		resizeMode: "contain"
	}
});

export default HelpScreen;
