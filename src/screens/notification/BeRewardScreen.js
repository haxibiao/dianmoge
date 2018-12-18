import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { navigationAction, goContentScreen } from "../../constants/Methods";
import { Header } from "../../components/Header";
import { ShareModal } from "../../components/Modal";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent, ContentType } from "../../components/Pure";
import MediaGroup from "./MediaGroup";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { tipNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class BeRewardScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		return (
			<Screen header={this.renderHeader()}>
				<View style={styles.container}>
					<Query query={tipNotificationsQuery} fetchPolicy="network-only">
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
									onEndReached={() => {
										if (data.user.notifications) {
											fetchMore({
												variables: {
													offset: data.user.notifications.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (
														!(
															fetchMoreResult &&
															fetchMoreResult.user &&
															fetchMoreResult.user.notifications &&
															fetchMoreResult.user.notifications.length > 0
														)
													) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														user: Object.assign({}, prev.user, {
															notifications: [...prev.user.notifications, ...fetchMoreResult.user.notifications]
														})
													});
												}
											});
										} else {
											this.setState({
												fetchingMore: false
											});
										}
									}}
									ListFooterComponent={() => {
										return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
									}}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	renderHeader = () => {
		const { navigation } = this.props;
		return (
			<Header
				rightComponent={
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("文章详情", {
								article: { id: 12574 }
							})
						}
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
		);
	};

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
								})
							}
						>
							<Text style={{ fontSize: 14, color: "#717171" }}>回复</Text>
						</TouchableOpacity>
					</View>
				}
				description={
					<Text style={{ lineHeight: 24 }}>
						向你的发布的
						{<ContentType content={notification.article} />}
						送了
						{notification.tip.amount.slice(0, -3)}
						颗糖（赞赏
						<Iconfont name={"RMB"} size={16} color={Colors.themeColor} />
						<Text style={{ color: Colors.themeColor }}>{notification.tip.amount}</Text>）
					</Text>
				}
				message={{
					body: notification.tip.message ? (
						<Text style={{ fontSize: 16, color: Colors.primaryFontColor }}>{notification.tip.message}</Text>
					) : null,
					skipScreen: () => navigation.navigate("交易记录")
				}}
				meta={`${notification.time_ago} ，实时到账${notification.tip.amount}元`}
			/>
		);
	};
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
