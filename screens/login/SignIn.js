import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import BasicModal from "../../components/Modal/BasicModal";
import Config from "../../constants/Config";
import LoginInput from "./LoginInput";
import SocialAccount from "./SocialAccount";

const { width, height } = Dimensions.get("window");

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.handleModal = this.handleModal.bind(this);
		this.focusKey = this.focusKey.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.emptyValue = this.emptyValue.bind(this);
		this.state = {
			email: "",
			password: "",
			focusItem: "email",
			modalVisible: false,
			disableSubmit: true
		};
	}

	focusKey(key) {
		this.setState({ focusItem: key });
	}

	changeValue(key, value) {
		this.setState({ [key]: value + "" });
		if (this.state.email && this.state.password) {
			this.setState({ disableSubmit: false });
		} else if (!this.state.disableSubmit) {
			this.setState({ disableSubmit: true });
		}
	}

	emptyValue(value) {
		this.setState({ [value]: "" });
	}

	handleModal() {
		this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
	}

	render() {
		let { email, password, focusItem, modalVisible, disableSubmit } = this.state;
		let { handleSkip } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.login}>
					<View style={{ marginTop: 20, alignItems: "flex-end" }}>
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
								keys={"email"}
								focusItem={focusItem}
								value={email}
								focusKey={this.focusKey}
								emptyValue={this.emptyValue}
								placeholder={"账户Email"}
								changeValue={this.changeValue}
								customStyle={{
									borderTopLeftRadius: 3,
									borderTopRightRadius: 3
								}}
							/>
							<LoginInput
								name={"lock"}
								keys={"password"}
								focusItem={focusItem}
								value={password}
								secure={true}
								focusKey={this.focusKey}
								placeholder={"密码"}
								changeValue={this.changeValue}
								customStyle={{
									borderTopWidth: 0,
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
								style={[styles.signInBtn, !disableSubmit && { backgroundColor: "rgba(64,127,207,1)" }]}
							>
								<Text style={styles.signInBtnText}>登录</Text>
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: 20, alignItems: "center" }}>
							<TouchableOpacity onPress={this.handleModal}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.tintFontColor
									}}
								>
									忘记密码？
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ alignItems: "center" }}>
						<SocialAccount />
						<View
							style={{
								marginVertical: 15
							}}
						>
							<TouchableOpacity onPress={handleSkip}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.themeColor
									}}
								>
									注册
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				{/*helpModal*/}
				<BasicModal
					visible={modalVisible}
					handleVisible={this.handleModal}
					customStyle={{ width: width - 60 }}
					header={<Text style={styles.helpSignIn}>小爱提供以下方式帮你登录</Text>}
				>
					<View>
						<View>
							<TouchableOpacity onPress={() => null}>
								<Text
									style={{
										fontSize: 17,
										color: Colors.primaryFontColor
									}}
								>
									重置密码
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={{
								height: 2,
								backgroundColor: Colors.tintGray,
								marginVertical: 12
							}}
						/>
						<View>
							<TouchableOpacity onPress={() => null}>
								<Text
									style={{
										fontSize: 17,
										color: Colors.primaryFontColor
									}}
								>
									使用验证码登录
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</BasicModal>
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
	signInBtn: {
		height: 46,
		borderRadius: 3,
		backgroundColor: "rgba(64,127,207,0.5)",
		alignItems: "center",
		justifyContent: "center"
	},
	signInBtnText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#fff"
	},
	helpSignIn: {
		fontSize: 16,
		color: Colors.themeColor,
		marginBottom: 20
	}
});

export default SignIn;
