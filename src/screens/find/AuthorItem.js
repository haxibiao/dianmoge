import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";

import { FollowButton } from "../../components/Button";
import { Colors, Divice, Methods } from "../../constants";
import { Avatar } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";

class AuthorItem extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let { user, navigation } = this.props;
		return (
			<TouchableWithoutFeedback onPress={() => Methods.goContentScreen(navigation, { ...user, type: "user" })}>
				<View style={styles.cardWrap}>
					<View>
						<Avatar uri={user.avatar} size={Divice.wp("16%")} />
					</View>
					<View style={{ flex: 1 }}>
						<Text numberOfLines={1} style={styles.name}>
							{user.name}
						</Text>
					</View>
					<View>
						<FollowButton type={"user"} id={user.id} status={user.followed_status} fontSize={13} customStyle={styles.followWrap} />
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	cardWrap: {
		flex: 1,
		paddingHorizontal: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	name: {
		fontSize: 14,
		color: Colors.darkFontColor,
		marginVertical: 10
	},
	followWrap: {
		width: "auto",
		paddingHorizontal: 12,
		height: 24,
		borderRadius: 12
	}
});

export default AuthorItem;
