import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import FollowButton from "../Button/Follow";
import { Colors } from "../../constants";
import Avatar from "../Pure/Avatar";

class AuthorCard extends Component {
	render() {
		const { user, navigation } = this.props;
		return (
			<View style={styles.cardWrap}>
				<View>
					<Text
						style={{
							fontSize: 13,
							color: Colors.tintFontColor,
							paddingVertical: 10
						}}
					>
						关注作者，看更多TA的好文章
					</Text>
				</View>
				<View style={styles.cardBody}>
					<TouchableOpacity onPress={() => navigation.navigate("用户详情", { user })}>
						<Avatar size={50} uri={user.avatar} />
					</TouchableOpacity>
					<View style={styles.introduction}>
						<View>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 17,
									color: Colors.darkFontColor
								}}
							>
								{user.name || ""}
							</Text>
						</View>
						<View>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 14,
									color: Colors.tintFontColor
								}}
							>
								{user.introduction || "TA还没有freestyle"}
							</Text>
						</View>
					</View>
					<View style={styles.followAuthor}>
						<FollowButton type={"user"} id={user.id} status={user.followed_status} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cardWrap: {
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		borderRadius: 2,
		paddingHorizontal: 10
	},
	cardBody: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor
	},
	introduction: {
		justifyContent: "space-between",
		flex: 1,
		marginLeft: 8,
		height: 50,
		paddingVertical: 4
	},
	followAuthor: {
		width: 88,
		height: 36
	}
});

export default AuthorCard;
