import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Header } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { otherNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class OtherRemindScreen extends Component {
	render() {
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<Query query={otherNotificationsQuery}>
						{({ loading, error, data, refetch, fetchMore, client }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user)) return <SpinnerLoading />;
							if (data.user.notifications.length < 1) return <BlankContent />;
							//retech unreadsQuery ...
							client.query({
								query: unreadsQuery,
								fetchPolicy: "network-only"
							});
							return (
								<FlatList
									data={data.user.notifications}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem}
									ListFooterComponent={() => <ContentEnd />}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	_renderItem = ({ item }) => {
		let { navigation } = this.props;
		let notification = item;
		return (
			<View style={styles.remindItem}>
				<View style={{ flexDirection: "row" }}>
					<View style={{ alignSelf: "flex-start" }}>
						<Iconfont name={this.remindMark(notification.type)} size={19} color={Colors.themeColor} />
					</View>
					<View style={styles.remindItemContent}>
						<View>{this.remindContent({ notification })}</View>
						<View>
							<Text
								style={{
									fontSize: 13,
									color: Colors.tintFontColor,
									marginTop: 10
								}}
							>
								{notification.time_ago}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	remindMark = type => {
		switch (type) {
			case "关注了专题":
				return "followed";
				break;
			case "gift":
				return "diamond";
				break;
			case "收录了文章":
				return "ranking";
				break;
			case "拒绝了文章":
				return "cry";
				break;
			default:
				return "star";
				break;
		}
	};

	remindContent = ({ notification }) => {
		let { navigation } = this.props;
		switch (notification.type) {
			case "关注了专题":
				return (
					<Text style={styles.remindText}>
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("用户详情", {
									user: notification.user
								})}
						>
							{notification.user.name + " "}
						</Text>
						关注了你的专题
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("专题详情", {
									category: notification.category
								})}
						>
							{" 《" + notification.category.name + "》 "}
						</Text>
					</Text>
				);
				break;
			case "收录了文章":
				return (
					<Text style={styles.remindText}>
						你投稿的文章
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("文章详情", {
									article: notification.article
								})}
						>
							{" 《" + notification.article.title + "》 "}
						</Text>
						已被加入专题
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("专题详情", {
									category: notification.category
								})}
						>
							{" 《" + notification.category.name + "》 "}
						</Text>
					</Text>
				);
				break;
			case "拒绝了文章":
				return (
					<Text style={styles.remindText}>
						抱歉！你投稿的文章
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("文章详情", {
									article: notification.article
								})}
						>
							{" 《" + notification.article.title + "》 "}
						</Text>
						未能加入专题
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("专题详情", {
									category: notification.category
								})}
						>
							{" 《" + notification.category.name + "》 "}
						</Text>
						请再接再厉(๑•̀ㅂ•́)و✧
					</Text>
				);
				break;
			default:
				return <Text style={styles.remindText}>{notification.info}</Text>;
				break;
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	remindItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 25,
		paddingLeft: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	remindItemContent: {
		marginLeft: 10,
		flex: 1
	},
	remindText: {
		fontSize: 16,
		lineHeight: 24,
		color: Colors.primaryFontColor
	},
	linkText: {
		lineHeight: 24,
		color: Colors.linkColor
	}
});

export default connect(store => ({ other_remind: store.users.other_remind }))(OtherRemindScreen);
