"use strict";
import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text, TouchableWithoutFeedback } from "react-native";

import { FollowButton, Button } from "../../components/Button";
import { Avatar, ContentEnd, LoadingMore, LoadingError } from "../../components/Pure";
import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods } from "../../constants";

import { Query, withApollo } from "react-apollo";
import { topCategoriesQuery } from "../../graphql/category.graphql";

class RecommendScreen extends Component {
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
		return (
			<View style={styles.container}>
				<Query query={topCategoriesQuery}>
					{({ loading, error, data, fetchMore, fetch }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.categories)) return null;
						return (
							<FlatList
								ref={scrollview => {
									this.scrollview = scrollview;
								}}
								data={data.categories}
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
								ListFooterComponent={() => {
									return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
								}}
							/>
						);
					}}
				</Query>
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
						<Text numberOfLines={1} style={styles.tintText}>
							{category.description ? `${category.description}` : `${category.count_articles}条精选内容`}
						</Text>
					</View>
					<FollowButton
						type="category"
						id={category.id}
						status={category.followed}
						customStyle={styles.followWrap}
						theme={Colors.themeColor}
						fontSize={13}
					/>
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		paddingLeft: 15
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
	tintText: {
		marginTop: 8,
		fontSize: 12,
		color: Colors.tintFontColor
	},
	followWrap: {
		width: 58,
		height: 26,
		borderRadius: 13
	}
});

export default withApollo(RecommendScreen);
