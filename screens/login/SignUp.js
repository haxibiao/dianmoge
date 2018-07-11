import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import LoginInput from "./LoginInput";
import SocialAccount from "./SocialAccount";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.focusKey = this.focusKey.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.emptyValue = this.emptyValue.bind(this);
		this.state = {
			name: "",
			email: "",
			password: "",
			focusItem: "name",
			disableSubmit: true
		};
	}

	focusKey(key) {
		this.setState({ focusItem: key });
	}

	changeValue(key, value) {
		console.log("key", key, value);
		this.setState({ [key]: value + "" });
		if (this.state.name && this.state.email && this.state.password) {
			this.setState({ disableSubmit: false });
		} else if (!this.state.disableSubmit) {
			this.setState({ disableSubmit: true });
		}
	}

	emptyValue(value) {
		this.setState({ [value]: "" });
	}

	render() {
		let { name, email, password, focusItem, disableSubmit } = this.state;
		let { handleSkip } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.login}>
					<View style={[{ alignItems: "flex-end" }, Platform.OS == "ios" && { marginTop: 20 }]}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Iconfont name={"chacha"} size={20} color={Colors.tintFontColor} style={{ fontWeight: "600" }} />
						</TouchableOpacity>
					</View>
					<View>
						<View style={{ marginBottom: 40 }}>
							<Text style={styles.brand}>{Config.AppName}</Text>
						</View>
						<View>
							<LoginInput
								name={"user"}
								keys={"name"}
								focusItem={focusItem}
								value={name}
								focusKey={this.focusKey}
								emptyValue={this.emptyValue}
								placeholder={"你的昵称"}
								changeValue={this.changeValue}
								customStyle={{
									borderTopLeftRadius: 3,
									borderTopRightRadius: 3
								}}
							/>
							<LoginInput
								name={"email-fill"}
								keys={"email"}
								focusItem={focusItem}
								value={email}
								focusKey={this.focusKey}
								emptyValue={this.emptyValue}
								placeholder={"Email"}
								changeValue={this.changeValue}
								customStyle={{
									borderTopWidth: 0,
									borderBottomWidth: 0
								}}
							/>
							<LoginInput
								name={"lock"}
								keys={"password"}
								focusItem={focusItem}
								value={password}
								secure={true}
								focusKey={this.focusKey}
								placeholder={"设置密码"}
								changeValue={this.changeValue}
								customStyle={{
									borderBottomLeftRadius: 3,
									borderBottomRightRadius: 3
								}}
							/>
						</View>
						<View style={{ marginTop: 20 }}>
							<TouchableOpacity
								disabled={disableSubmit}
								onPress={() => {
									if (!disableSubmit) {
										this.props.handleSubmit(this.state);
									}
									this.setState({
										disableSubmit: true
									});
								}}
								style={[styles.signUpBtn, !disableSubmit && { backgroundColor: "rgba(66,192,2,1)" }]}
							>
								<Text style={styles.signUpBtnText}>注册</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ alignItems: "center" }}>
						<SocialAccount />
						<View style={{ marginVertical: 15 }}>
							<TouchableOpacity onPress={handleSkip}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.themeColor
									}}
								>
									已有账号登录
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	login: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: Colors.skinColor,
		justifyContent: "space-between"
	},
	brand: {
		fontSize: 50,
		fontWeight: "500",
		letterSpacing: 8,
		color: Colors.themeColor,
		textAlign: "center"
	},
	signUpBtn: {
		height: 46,
		borderRadius: 3,
		backgroundColor: "rgba(66,192,2,0.5)",
		alignItems: "center",
		justifyContent: "center"
	},
	signUpBtnText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#fff"
	}
});

export default SignUp;
