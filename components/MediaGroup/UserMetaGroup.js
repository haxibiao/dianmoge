import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { FollowButton } from "../Button";
import { Avatar } from "../Pure";
import Colors from "../../constants/Colors";

class UserMetaGroup extends Component {
	render() {
		const {
			user = {},
			customStyle = {},
			height = 45,
			navigation,
			hideButton = false,
			plain = false,
			topInfo = false,
			bottomInfo = false
		} = this.props;
		let { avatar = 34, nameSize = 16, metaSize = 14 } = customStyle;
		return (
			<View style={styles.groupWrap}>
				<View style={styles.groupLeft}>
					<TouchableOpacity onPress={() => navigation.navigate("用户详情", { user })}>
						<Avatar size={avatar} uri={user.avatar} />
					</TouchableOpacity>
					<View style={[styles.userInfo, { height }]}>
						<Text
							numberOfLines={1}
							style={{
								color: Colors.primaryFontColor,
								fontSize: nameSize
							}}
						>
							{topInfo ? topInfo : <Text>{user.name || " "}</Text>}
						</Text>
						<Text
							numberOfLines={1}
							style={{
								color: Colors.tintFontColor,
								fontSize: metaSize
							}}
						>
							{bottomInfo ? (
								bottomInfo
							) : (
								<Text>
									{user.count_articles || "0"}个作品，获得了{user.count_likes || "0"}个喜欢
								</Text>
							)}
						</Text>
					</View>
				</View>
				{!hideButton && (
					<FollowButton
						type={"user"}
						id={user.id}
						plain={plain}
						status={user.followed_status}
						customStyle={plain ? { height: 28, width: 72 } : null}
						fontSize={plain ? 14 : 15}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	groupWrap: {
		flexDirection: "row",
		alignItems: "center"
	},
	userInfo: {
		justifyContent: "space-between",
		flex: 1,
		paddingLeft: 12
	},
	groupLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		marginRight: 20
	}
});

export default withNavigation(UserMetaGroup);
