import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Button, TouchableOpacity, Platform } from "react-native";

import { FollowButton } from "../../components/Button";
import Colors from "../../constants/Colors";
import { Avatar } from "../../components/Pure";

import Config from "../../constants/Config";
import { connect } from "react-redux";
import actions from "../../store/actions";

class AuthorCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let { user } = this.props;
		return (
			<View style={styles.cardWrap}>
				<View>
					<Avatar uri={user.avatar} size={70} />
				</View>
				<View>
					<Text numberOfLines={1} style={styles.name}>
						{user.name}
					</Text>
				</View>
				<View>
					<Text numberOfLines={1} style={styles.latestFollower}>
						{user.followings.length ? user.followings[0].name + "关注" : Config.AppName + "推荐"}
					</Text>
				</View>
				<FollowButton type={"user"} id={user.id} status={user.followed_status} customStyle={styles.followWrap} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cardWrap: {
		borderRadius: 4,
		backgroundColor: Colors.skinColor,
		width: 140,
		paddingVertical: 12,
		paddingHorizontal: 20,
		alignItems: "center"
	},
	name: {
		fontSize: 15,
		color: Colors.darkFontColor,
		paddingTop: 8
	},
	latestFollower: {
		fontSize: 12,
		color: Colors.tintFontColor,
		paddingTop: 6
	},
	followWrap: {
		alignSelf: "stretch",
		marginTop: 8,
		height: 32,
		width: "auto",
		borderRadius: 20
	}
});

export default AuthorCard;
