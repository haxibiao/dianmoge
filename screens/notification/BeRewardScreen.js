import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Header } from "../../components/Header";
import { ShareModal } from "../../components/Modal";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import MediaGroup from "./MediaGroup";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { tipNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class BeRewardScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		this.state = {
			inputCommentVisible: false,
			modalVisible: false
		};
	}

	render() {
		let { modalVisible } = this.state;
		const { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header
						navigation={navigation}
						rightComponent={
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("文章详情", {
										article: { id: 1 }
									})}
							>
								<Text
									style={{
										fontSize: 17,
										color: Colors.themeColor
									}}
								>
									常见问题
								</Text>
							</TouchableOpacity>
						}
					/>
					<Query query={tipNotificationsQuery}>
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
				<ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
			</Screen>
		);
	}

	_renderItem = ({ item, index }) => {
		let { navigation } = this.props;
		let notification = item;
		return (
			<MediaGroup
				navigation={navigation}
				user={notification.user}
				rightComponent={
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity
							style={styles.customButton}
							onPress={() =>
								navigation.navigate("聊天页", {
									withUser: notification.user
								})}
						>
							<Text style={{ fontSize: 14, color: "#717171" }}>回复</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.customButton, { marginLeft: 15 }]} onPress={this.toggleModalVisible}>
							<Iconfont name={"share"} size={13} color={Colors.tintFontColor} />
							<Text
								style={{
									fontSize: 14,
									color: "#717171",
									marginLeft: 4
								}}
							>
								分享
							</Text>
						</TouchableOpacity>
					</View>
				}
				description={
					<Text style={{ lineHeight: 24 }}>
						向你的文章
						<Text
							style={styles.linkText}
							onPress={() =>
								navigation.navigate("文章详情", {
									article: notification.article
								})}
						>
							{" 《" + notification.article.title + "》 "}
						</Text>
						送了{notification.tip.amount.slice(0, -3)}颗糖（赞赏
						<Iconfont name={"RMB"} size={16} color={Colors.themeColor} />
						<Text style={{ color: Colors.themeColor }}>{notification.tip.amount}</Text>
						）
					</Text>
				}
				notification={{
					content: notification.tip.message,
					type: "交易记录"
				}}
				meta={notification.time_ago + " " + `支付宝支付，实时到账${notification.tip.amount}元`}
			/>
		);
	};

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	customButton: {
		height: 30,
		minWidth: 55,
		paddingHorizontal: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	linkText: {
		lineHeight: 24,
		color: Colors.linkColor
	}
});

export default connect(store => ({
	be_rewards: store.users.be_rewards
}))(BeRewardScreen);
