import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { Header } from "../../../components/Header";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";

class WithdrawDepositScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			money: 0,
			disableSubmit: true
		};
	}

	render() {
		let { money, disableSubmit } = this.state;
		let { balance, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<View style={styles.form}>
						<TouchableOpacity
							style={[
								styles.row,
								{
									borderBottomWidth: 1,
									borderBottomColor: Colors.lightBorderColor
								}
							]}
						>
							<Text
								style={{
									fontSize: 17,
									color: Colors.tintFontColor
								}}
							>
								提现至支付宝
							</Text>
							<Text
								style={{
									fontSize: 17,
									color: Colors.primaryFontColor
								}}
							>
								158****9898
							</Text>
						</TouchableOpacity>
						<View style={styles.center}>
							<View>
								<Text
									style={{
										fontSize: 17,
										color: Colors.tintFontColor
									}}
								>
									提现金额
								</Text>
							</View>
							<View style={styles.inputMoney}>
								<Iconfont name={"RMB"} size={20} color={Colors.primaryFontColor} style={{ marginBottom: 10 }} />
								<TextInput
									words={false}
									underlineColorAndroid="transparent"
									keyboardType="numeric"
									selectionColor={Colors.themeColor}
									style={styles.textInput}
									autoFocus={true}
									onChangeText={this.changeValue}
									value={money > 0 ? money + "" : ""}
								/>
								{money ? (
									<TouchableOpacity style={styles.inputOperation} onPress={() => this.changeValue(0)}>
										<Iconfont name={"close"} size={18} color={Colors.lightFontColor} />
									</TouchableOpacity>
								) : null}
							</View>
						</View>
						<View style={styles.row}>
							{money > balance ? (
								<Text
									style={{
										fontSize: 15,
										color: Colors.weiboColor,
										lineHeight: 20
									}}
								>
									金额已超过提现余额
								</Text>
							) : (
								<Text
									style={{
										fontSize: 15,
										color: Colors.tintFontColor,
										lineHeight: 20
									}}
								>
									可提现金额
									<Iconfont name={"RMB"} size={14} color={Colors.tintFontColor} />
									{balance}.00
								</Text>
							)}
							<TouchableOpacity onPress={() => this.changeValue(balance + "")}>
								<Text
									style={{
										fontSize: 15,
										color: Colors.themeColor
									}}
								>
									全部提现
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.buttonWrap}>
						<TouchableOpacity
							style={[
								styles.button,
								{
									backgroundColor: balance < money || money <= 0 ? Colors.primaryBorderColor : Colors.themeColor
								}
							]}
							disabled={balance < money || money <= 0 || money == ""}
						>
							<Text style={{ fontSize: 18, color: "#fff" }}>确认提现</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Screen>
		);
	}

	changeValue = value => {
		// /^[0-9]+(\.[0-9]{1,2})?$/gm
		let newValue = "";
		let numbers = "0123456789";
		for (var i = 0; i < value.length; i++) {
			if (numbers.indexOf(value[i]) > -1) {
				newValue = newValue + value[i];
			}
		}
		this.setState({ money: newValue });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightBorderColor
	},
	form: {
		marginTop: 15,
		backgroundColor: "#fff",
		paddingHorizontal: 15
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 15
	},
	center: {
		paddingTop: 20,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	inputMoney: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 30
	},
	textInput: {
		flex: 1,
		marginHorizontal: 8,
		fontSize: 35,
		height: 50,
		padding: 0,
		color: Colors.primaryFontColor
	},
	inputOperation: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	buttonWrap: {
		marginTop: 40,
		paddingHorizontal: 15
	},
	button: {
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4
	}
});

export default connect(store => ({ balance: store.users.user.balance }))(WithdrawDepositScreen);
