import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { Header } from "../../components/Header";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { likeNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class BeLikedScreen extends Component {
	render() {
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={this.props.navigation} />
					<Query query={likeNotificationsQuery}>
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
			<View style={styles.likeItem}>
				<View style={{ flexDirection: "row" }}>
					<View style={{ alignSelf: "flex-start" }}>
						<Iconfont name={notification.type == "喜欢了文章" ? "like" : "praise"} size={19} color={Colors.themeColor} />
					</View>
					<View style={styles.likeItemContent}>
						<View>
							<Text style={styles.likeText} numberOfLines={2}>
								<Text
									style={styles.linkText}
									onPress={() =>
										navigation.navigate("用户详情", {
											user: notification.user
										})}
								>
									{notification.user.name + " "}
								</Text>
								{notification.type == "喜欢了文章" ? "喜欢了你的文章" : "赞了你的评论"}
								<Text
									style={styles.linkText}
									onPress={() =>
										navigation.navigate(notification.type == "喜欢了文章" ? "文章详情" : "评论详情", {
											article: notification.article
										})}
								>
									{notification.type == "喜欢了文章"
										? " 《" + notification.article.title + "》 "
										: ' "' + notification.comment.body + '" '}
								</Text>
							</Text>
						</View>
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	likeItem: {
		flexDirection: "row",
		alignItems: "center",
		height: 105,
		paddingHorizontal: 15,
		paddingRight: 25,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	likeItemContent: {
		marginLeft: 10,
		flex: 1
	},
	likeText: {
		fontSize: 16,
		lineHeight: 24,
		color: Colors.primaryFontColor
	},
	linkText: {
		lineHeight: 24,
		color: Colors.linkColor
	}
});

export default BeLikedScreen;
