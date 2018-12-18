import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors, Config } from "../../constants";
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
					<View style={styles.userInfo}>
						<View>
							{login ? (
								<Avatar uri={user.avatar} size={60} />
							) : (
								<View style={styles.defaultAvatar}>
									<Iconfont name={"user"} size={40} color={Colors.lightFontColor} />
								</View>
							)}
						</View>

						<View style={{ flex: 1 }}>
							<View style={styles.userInfo}>
								{login ? (
									<Text style={styles.userName}>{user.name}</Text>
								) : (
									<Text style={styles.userName}>
										立即加入
										{Config.AppDisplayName}
									</Text>
								)}
							</View>
						</View>
						{login && (
							<View style={styles.label}>
								<Iconfont name="city-fill" size={13} color="#fff" />
								<Text style={styles.homepage}>个人主页</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	userInfoContainer: {
		paddingLeft: 20,
		height: 120,
		backgroundColor: Colors.lightGray,
		flexDirection: "row",
		alignItems: "center"
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
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
		fontSize: 17,
		color: Colors.darkFontColor,
		fontWeight: "500",
		marginLeft: 20
	},
	label: {
		paddingLeft: 8,
		paddingRight: 6,
		height: 28,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 14,
		borderBottomLeftRadius: 14,
		backgroundColor: Colors.themeColor
	},
	homepage: {
		fontSize: 13,
		color: "#fff",
		marginLeft: 4
	}
});

export default UserTopInfo;
