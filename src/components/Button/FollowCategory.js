import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

import {
	followCollectionMutation,
	followCategoryMutation,
	userFollowedCategoriesQuery,
	userFollowedCollectionsQuery
} from "../../graphql/user.graphql";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

class FollowCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			followed: this.props.followed,
			follows: this.props.follows
		};
	}

	_handleFollow() {
		let { type, id, followCollection, followCategory, user, login, navigation } = this.props;
		let { followed, follows } = this.state;
		if (login) {
			switch (type) {
				case "collection":
					followCollection({
						variables: {
							collection_id: id,
							undo: followed
						},
						refetchQueries: result => [
							{
								query: userFollowedCollectionsQuery,
								variables: { user_id: user.id }
							}
						]
					});
					break;
				case "category":
					followCategory({
						variables: {
							category_id: id,
							undo: followed
						},
						refetchQueries: result => [
							{
								query: userFollowedCategoriesQuery,
								variables: { user_id: user.id }
							}
						]
					});
					break;
			}
			this.setState(prevState => {
				return {
					followed: !prevState.followed,
					follows: prevState.followed ? --prevState.follows : ++prevState.follows
				};
			});
		} else {
			navigation.navigate("登录注册");
		}
	}

	render() {
		let { followed, follows } = this.state;
		let { size } = this.props;
		return (
			<TouchableOpacity style={[styles.categoryButton, followed ? styles.followed : styles.follow]} onPress={this._handleFollow.bind(this)}>
				<Iconfont name={followed ? "gougou" : "add"} size={size} color={followed ? Colors.tintFontColor : "#fff"} />
				<Text style={{ fontSize: size, color: followed ? Colors.tintFontColor : "#ffffff" }}>
					{followed ? " 已关注" : " 关 注"}
					{" | " + follows}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	categoryButton: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	follow: {
		borderWidth: 1,
		borderRadius: 3,
		borderColor: Colors.weixinColor,
		backgroundColor: Colors.weixinColor
	},
	followed: {
		borderWidth: 1,
		borderRadius: 3,
		borderColor: Colors.lightBorderColor,
		backgroundColor: "#fff"
	}
});

export default compose(
	withNavigation,
	graphql(followCollectionMutation, { name: "followCollection" }),
	graphql(followCategoryMutation, { name: "followCategory" }),
	connect(store => ({ login: store.users.login }))
)(FollowCategory);
