import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableWithoutFeedback } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods } from "../../constants";
import { Button } from "../../components/Button";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";

import { Query, withApollo, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { topCategoriesQuery } from "../../graphql/category.graphql";
import { userFollowedCategoriesQuery } from "../../graphql/user.graphql";

class FollowedScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			//当前tab页，点击tabbar跳转到顶部并刷新页面
			tabBarOnPress: ({ scene, previousScene, jumpToIndex }) => {
				let scrollToTop = navigation.getParam("scrollToTop", null);
				if (scene.focused && scrollToTop) {
					scrollToTop();
				} else {
					jumpToIndex(scene.index);
				}
			}
		};
	};

	state = { fetchingMore: true };

	componentWillMount() {
		this.props.navigation.setParams({
			scrollToTop: this._scrollToTop
		});
	}

	render() {
		let { navigation, user } = this.props;
		if (!user.id) {
			return this._signInComponent(navigation);
		}
		return (
			<View style={styles.container}>
				<View style={{ paddingLeft: 15 }}>
					<Query query={userFollowedCategoriesQuery} variables={{ user_id: user.id }}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.categories)) return <SpinnerLoading />;
							return (
								<FlatList
									ref={scrollview => {
										this.scrollview = scrollview;
									}}
									data={data.categories}
									refreshing={loading}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem}
									getItemLayout={(data, index) => ({
										length: 90,
										offset: 90 * index,
										index
									})}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.categories) {
											fetchMore({
												variables: {
													offset: data.categories.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.categories && fetchMoreResult.categories.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														categories: [...prev.categories, ...fetchMoreResult.categories]
													});
												}
											});
										} else {
											this.setState({
												fetchingMore: false
											});
										}
									}}
									ListEmptyComponent={this._emptyComponent(navigation)}
									ListFooterComponent={() => {
										return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
									}}
								/>
							);
						}}
					</Query>
				</View>
			</View>
		);
	}

	_renderItem = ({ item }) => {
		let { navigation } = this.props;
		let category = item;
		return (
			<TouchableWithoutFeedback onPress={() => Methods.goContentScreen(navigation, { ...category, type: "category" })}>
				<View style={styles.recommendItem}>
					<Avatar size={60} type="category" uri={category.logo} />
					<View style={styles.followInfo}>
						<Text numberOfLines={1} style={styles.drakText}>
							{category.name}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	_scrollToTop = () => {
		if (this.scrollview) {
			this.scrollview.scrollToOffset({ x: 0, y: 0, animated: true });
			this.props.client.query({
				query: topCategoriesQuery,
				fetchPolicy: "network-only"
			});
		}
	};

	_signInComponent = navigation => {
		return (
			<View style={styles.emptyWrap}>
				<View style={styles.divingWrap}>
					<Iconfont name="diving" size={50} color="#fff" />
				</View>
				<View>
					<Text style={styles.emptyText}>登录后才可以查看关注的专题哦~</Text>
				</View>
				<View style={styles.buttonWrap}>
					<Button
						style={styles.button}
						name="登录"
						handler={() => {
							navigation.dispatch(Methods.navigationAction({ routeName: "登录注册", params: { login: true } }));
						}}
					/>
				</View>
			</View>
		);
	};

	_emptyComponent = navigation => {
		return (
			<View style={styles.emptyWrap}>
				<View style={styles.divingWrap}>
					<Iconfont name="blank" size={50} color="#fff" />
				</View>
				<View>
					<Text style={styles.emptyText}>还没任何关注哦</Text>
				</View>
				<View style={styles.buttonWrap}>
					<Button
						style={styles.button}
						name="查看推荐"
						handler={() => {
							navigation.dispatch(Methods.navigationAction({ routeName: "推荐" }));
						}}
					/>
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
	recommendItem: {
		height: 90,
		paddingVertical: 15,
		paddingRight: 15,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	followInfo: {
		marginHorizontal: 15,
		flex: 1
	},
	drakText: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.darkFontColor
	},
	emptyWrap: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		justifyContent: "center",
		alignItems: "center"
	},
	divingWrap: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.darkGray,
		justifyContent: "center",
		alignItems: "center"
	},
	emptyText: {
		fontSize: 15,
		color: Colors.tintFontColor,
		marginVertical: 20
	},
	buttonWrap: {
		width: 90,
		height: 34
	},
	button: { borderRadius: 45, borderWidth: 0 }
});

export default compose(
	withApollo,
	connect(store => ({ user: store.users.user }))
)(FollowedScreen);
