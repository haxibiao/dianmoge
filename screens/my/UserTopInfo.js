import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import Avatar from "../../components/Pure/Avatar";

class UserTopInfo extends Component {
	render() {
		let { user, login } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					let { navigation, login, user } = this.props;
					login ? navigation.navigate("用户详情", { user }) : navigation.navigate("登录注册", { login: true });
				}}
			>
				<View style={styles.userInfoContainer}>
					<View style={styles.userAvatarWrap}>
						{login ? (
							<Avatar uri={user.avatar} size={60} />
						) : (
							<View style={styles.defaultAvatar}>
								<Iconfont name={"user"} size={40} color={Colors.lightFontColor} />
							</View>
						)}
					</View>
					{login ? (
						<View style={{ flex: 1 }}>
							<View style={styles.userInfo}>
								<Text style={styles.userName}>{user.name}</Text>
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate("编辑个人资料");
									}}
								>
									<Iconfont name={"editor"} size={16} color={Colors.tintFontColor} />
								</TouchableOpacity>
							</View>
							{user.introduction && (
								<View style={[styles.userInfo, { marginTop: 6 }]}>
									<Text numberOfLines={1} style={styles.introduction}>
										{user.introduction}
									</Text>
								</View>
							)}
						</View>
					) : (
						<View>
							<View style={{ marginBottom: 5 }}>
								<Text
									style={{
										fontSize: 18,
										color: Colors.tintFontColor
									}}
								>
									点击登录账号
								</Text>
							</View>
							<View>
								<Text
									style={{
										fontSize: 16,
										color: Colors.tintFontColor
									}}
								>
									立即加入这座暖心的小城
								</Text>
							</View>
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	userInfoContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		flexDirection: "row",
		alignItems: "center"
	},
	userAvatarWrap: {
		marginRight: 20
	},
	defaultAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.tintGray,
		justifyContent: "center",
		alignItems: "center"
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	userName: {
		fontSize: 15,
		color: Colors.primaryFontColor,
		marginRight: 6
	},
	introduction: {
		fontSize: 14,
		color: Colors.tintFontColor
	}
});

export default UserTopInfo;
