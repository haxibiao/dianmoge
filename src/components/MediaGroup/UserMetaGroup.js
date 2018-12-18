import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";

import { FollowButton } from "../Button";
import { Avatar } from "../Pure";
import { Colors } from "../../constants";

class UserMetaGroup extends Component {
	render() {
		const { user = {}, customStyle = {}, navigation, topInfo = false, bottomInfo = false } = this.props;
		let { avatar = 48, nameSize = 15, metaSize = 13 } = customStyle;
		return (
			<TouchableWithoutFeedback onPress={() => navigation.navigate("用户详情", { user })}>
				<View style={styles.groupWrap}>
					<Avatar size={avatar} uri={user.avatar} />
					<View style={styles.userInfo}>
						<Text
							numberOfLines={1}
							style={{
								fontSize: nameSize,
								color: Colors.primaryFontColor
							}}
						>
							{topInfo ? topInfo : <Text>{user.name || " "}</Text>}
						</Text>
						<Text
							numberOfLines={1}
							style={{
								fontSize: metaSize,
								color: Colors.tintFontColor,
								marginTop: 6
							}}
						>
							{bottomInfo ? (
								bottomInfo
							) : (
								<Text>
									{user.count_articles || "0"} 作品
									{"  "}
									{user.count_likes || "0"} 喜欢
								</Text>
							)}
						</Text>
					</View>
					<FollowButton type={"user"} id={user.id} status={user.followed_status} />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	groupWrap: {
		flexDirection: "row",
		alignItems: "center"
	},
	userInfo: {
		flex: 1,
		marginHorizontal: 15
	}
});

export default withNavigation(UserMetaGroup);
