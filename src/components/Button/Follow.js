import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

import { followUserMutation, followCollectionMutation, followCategoryMutation, userFollowedCategoriesQuery } from "../../graphql/user.graphql";
import { recommandDynamicQuery } from "../../graphql/article.graphql";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

class Follow extends Component {
	handleFollow() {
		let { type, id, status, followUser, followCollection, followCategory, login, navigation, personal } = this.props;
		if (login) {
			switch (type) {
				case "user":
					followUser({
						variables: {
							user_id: id,
							undo: status
						},
						refetchQueries: result => [
							{
								query: recommandDynamicQuery,
								variables: {
									user_id: personal.id
								}
							}
						]
					});
					break;
				case "collection":
					followCollection({
						variables: {
							collection_id: id,
							undo: status
						}
					});
					break;
				case "category":
					followCategory({
						variables: {
							category_id: id,
							undo: status
						},
						refetchQueries: result => [
							{
								query: userFollowedCategoriesQuery,
								variables: {
									user_id: personal.id
								}
							}
						]
					});
					break;
			}
		} else {
			navigation.navigate("登录注册");
		}
	}

	render() {
		let {
			id,
			type,
			status,
			customStyle = {},
			fontSize = 14,
			fontColor,
			theme = Colors.themeColor,
			under = Colors.darkGray,
			personal,
			login
		} = this.props;
		if (!login) status = 0;
		let mergeStyle = StyleSheet.flatten([styles.followButton, customStyle]);
		fontSize = status == 2 ? fontSize - 1 : fontSize;
		let color = fontColor ? fontColor : status ? "#666" : "#fff";
		if (type == "user" && personal.id == id) {
			return null;
		}
		return (
			<TouchableOpacity style={[{ backgroundColor: status ? under : theme }, mergeStyle]} onPress={this.handleFollow.bind(this)}>
				<Text
					style={[
						{
							color,
							fontSize
						}
					]}
				>
					{status ? (status == 2 ? "互相关注" : "已关注") : "关注"}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	followButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 72,
		height: 30,
		borderRadius: 3
	}
});
export default compose(
	withNavigation,
	graphql(followUserMutation, { name: "followUser" }),
	graphql(followCollectionMutation, { name: "followCollection" }),
	graphql(followCategoryMutation, { name: "followCategory" }),
	connect(store => ({ login: store.users.login, personal: store.users.user }))
)(Follow);
