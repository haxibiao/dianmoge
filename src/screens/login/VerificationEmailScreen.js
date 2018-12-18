import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-root-toast";

import Screen from "../Screen";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { graphql, compose } from "react-apollo";
import { signUpMutation, signInMutation } from "../../graphql/user.graphql";
import { NavigationActions } from "react-navigation";

import Header from "../../components/Header/Header";
import SettingItem from "../../components/Setting/SettingItem";
import { Button } from "../../components/Button";

import { Colors } from "../../constants";
import { connect } from "react-redux";
import actions from "../../store/actions";

class VerificationEmailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ""
		};
	}

	render() {
		const { navigation } = this.props;
		let { email } = this.state;

		return (
			<Screen>
				<View style={styles.container}>
					<View style={styles.textWrap}>
						<TextInput
							textAlignVertical="center"
							underlineColorAndroid="transparent"
							placeholder="请输入注册时的邮箱地址"
							placeholderText={Colors.tintFontColor}
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							onChangeText={email => {
								this.setState({ email });
							}}
						/>
					</View>
					<View style={{ margin: 20, height: 48 }}>
						<Button
							name="发送验证码"
							handler={() => {
								navigation.navigate("找回密码");
							}}
							disabled={email ? false : true}
						/>
					</View>
				</View>
			</Screen>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	textWrap: {
		marginTop: 20,
		paddingHorizontal: 20,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	textInput: {
		fontSize: 16,
		color: Colors.primaryFontColor,
		padding: 0,
		height: 50
	}
});

export default connect(store => store)(VerificationEmailScreen);
