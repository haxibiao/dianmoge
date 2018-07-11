import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import SettingItem from "../../../components/Setting/SettingItem";
import Screen from "../../Screen";

// import { commentsQuery, addCommentMutation } from "../../../graphql/comment.graphql";
import { Query, Mutation } from "react-apollo";

class ResetPasswordScreen extends Component {
	render() {
		const { navigation, users } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<View style={styles.hint}>
						<Text style={{ fontSize: 15, color: Colors.themeColor }}>为了你的账户安全，请选择以下方式进行身份验证</Text>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate("密码验证")}>
						<SettingItem itemName="使用当前密码验证" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("密码验证")}>
						<SettingItem itemName="使用手机号验证" explain="158****1314" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("密码验证")}>
						<SettingItem itemName="使用邮箱验证" />
					</TouchableOpacity>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	hint: {
		paddingHorizontal: 15,
		paddingTop: 16,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default ResetPasswordScreen;
