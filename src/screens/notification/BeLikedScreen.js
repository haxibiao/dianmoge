import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent, ContentType } from "../../components/Pure";
import { goContentScreen } from "../../constants/Methods";
import { Header } from "../../components/Header";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { likeNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class BeLikedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingMore: true
		};
	}

	render() {
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={likeNotificationsQuery} fetchPolicy="network-only">
						{({ loading, error, data, refetch, fetchMore, client }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.notifications)) return <SpinnerLoading />;
							//retech unreadsQuery ...
							client.query({
								query: unreadsQuery,
								fetchPolicy: "network-only"
							});
							//筛选出article存在的data，避免字段为空导致的错误
							let notifications = data.user.notifications.filter((elem, index) => {
								return elem.article;
							});
							if (notifications.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={notifications}
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
	_renderItem = ({ item }) => {
		let { navigation } = this.props;
		let notification = item;
		return (
			<View style={styles.likeItem}>
				<View style={{ flexDirection: "row" }}>
					<View style={{ alignSelf: "flex-start" }}>
						<Iconfont name={notification.type == "喜欢了文章" ? "like-fill" : "praise-fill"} size={19} color={Colors.themeColor} />
					</View>
					<View style={styles.likeItemContent}>
						<View>
							<Text style={styles.likeText} numberOfLines={3}>
								<Text
									style={styles.linkText}
									onPress={() =>
										navigation.navigate("用户详情", {
											user: notification.user
										})
									}
								>
									{notification.user.name + " "}
								</Text>
								{notification.type == "喜欢了文章" ? "喜欢了你发布的" : "赞了你的评论"}
								{notification.type == "喜欢了文章" ? (
									<ContentType content={notification.article} />
								) : (
									<Text style={styles.linkText} onPress={() => this.skipScreen(notification)}>
										{' "' + notification.comment.body + '" '}
									</Text>
								)}
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

	skipScreen = notification => {
		let { navigation } = this.props;
		notification.type == "喜欢了文章"
			? goContentScreen(navigation, notification.article)
			: navigation.navigate("评论详情", {
					comment: notification.comment
			  });
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
		justifyContent: "center",
		padding: 15,
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
