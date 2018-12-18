import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "../Pure";
import { Colors } from "../../constants";

class FollowedGroup extends Component {
	render() {
		let { follow = {} } = this.props;
		return (
			<View style={styles.groupWrap}>
				<Avatar type={follow.followed_type == "users" ? "user" : "category"} uri={follow.avatar} />
				<View style={styles.followInfo}>
					<View style={styles.topInfo}>
						<Text numberOfLines={1} style={{ color: Colors.primaryFontColor, fontSize: 17 }}>
							{follow.name || ""}
						</Text>
						{follow.dynamic_msg ? (
							<View style={styles.updates}>
								<View style={styles.indicator} />
								<Text numberOfLines={1} style={{ color: Colors.tintFontColor, fontSize: 12 }}>
									{follow.dynamic_msg}
								</Text>
							</View>
						) : null}
					</View>
					<View>
						<Text numberOfLines={1} style={{ color: Colors.tintFontColor, fontSize: 13 }}>
							{follow.latest_article_title || ""}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	groupWrap: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		paddingLeft: 15,
		paddingRight: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	followInfo: {
		flex: 1,
		paddingLeft: 15
	},
	topInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6
	},
	updates: {
		flexDirection: "row",
		alignItems: "center"
	},
	indicator: {
		width: 10,
		height: 10,
		marginHorizontal: 5,
		borderRadius: 5,
		backgroundColor: Colors.linkColor
	}
});

export default FollowedGroup;
