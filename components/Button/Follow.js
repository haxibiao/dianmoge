import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";

import { followUserMutation, followCollectionMutation, followCategoryMutation } from "../../graphql/user.graphql";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

class Follow extends Component {
	handleFollow() {
		let { type, id, status, followUser, followCollection, followCategory, login, navigation } = this.props;
		if (login) {
			switch (type) {
				case "user":
					followUser({
						variables: {
							user_id: id,
							undo: status
						}
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
						}
					});
					break;
			}
		} else {
			navigation.navigate("登录注册");
		}
	}

	render() {
		let { type, plain = false, customStyle = {}, fontSize = 15, status, personal, id, theme = Colors.weixinColor, outline } = this.props;
		let mergeStyle = StyleSheet.flatten([styles.followButton, customStyle]);
		let statusStyle = outline
			? status ? styles.outlineFollwed : { borderColor: theme, backgroundColor: "#fff" }
			: status ? styles.followed : { borderColor: theme, backgroundColor: theme };
		let color = outline ? (status ? "#666" : theme) : status ? Colors.tintFontColor : "#fff";
		if (type == "user" && personal.id == id) {
			return null;
		}
		return (
			<TouchableOpacity style={[statusStyle, mergeStyle]} onPress={this.handleFollow.bind(this)}>
				<Text
					style={[
						{
							color,
							fontSize: fontSize
						}
					]}
				>
					{!plain && status !== 2 && <Iconfont name={status ? (status == 2 ? "follow-eachOther" : "gougou") : "add"} size={fontSize} />}
					{status ? (status == 2 ? " 互相关注" : " 已关注") : " 关注"}
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
		borderWidth: 1,
		borderRadius: 3,
		width: 80,
		height: 32
	},
	followed: {
		borderColor: Colors.tintBorderColor,
		backgroundColor: Colors.skinColor
	},
	outlineFollwed: {
		borderColor: Colors.darkGray,
		backgroundColor: Colors.darkGray
	}
});
export default compose(
	withNavigation,
	graphql(followUserMutation, { name: "followUser" }),
	graphql(followCollectionMutation, { name: "followCollection" }),
	graphql(followCategoryMutation, { name: "followCategory" }),
	connect(store => ({ login: store.users.login, personal: store.users.user }))
)(Follow);
