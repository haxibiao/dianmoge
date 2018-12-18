import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, TouchableOpacity, Dimensions } from "react-native";
import Toast from "react-native-root-toast";

import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";

const { width, height } = Dimensions.get("window");

class WalletScreen extends Component {
	render() {
		let { user, navigation } = this.props;
		return (
			<Screen>
				<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
					<View style={styles.container}>
						<View style={styles.walletTop}>
							<View style={styles.balanceBanner}>
								<View style={styles.walletMark}>
									<Iconfont name={"wallet"} size={100} color={"#f0f0f0"} />
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "500",
											color: "#fff"
										}}
									>
										现金金额
									</Text>
									<Text
										style={{
											fontSize: 26,
											fontWeight: "600",
											color: "#fff",
											marginLeft: 15
										}}
									>
										{user.balance + ".00"}
									</Text>
								</View>
								<TouchableOpacity
									style={styles.withdrawDepositHelpButton}
									onPress={() => {
										this.toast();
										// if (user.balance < 100) {
										// 	this.toast();
										// 	return;
										// }
										// navigation.navigate("提现");
									}}
								>
									<Text style={{ fontSize: 15, color: "#fff" }}>提现</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.withdrawDepositHelp}>
								<Text
									style={{
										fontSize: 13,
										color: Colors.lightFontColor
									}}
								>
									提现金额需满100元，
									<Text
										style={{ color: Colors.linkColor }}
										onPress={() =>
											navigation.navigate("文章详情", {
												article: { id: "008" }
											})
										}
									>
										查看提现帮助
									</Text>
								</Text>
							</View>
						</View>
						<View style={styles.walletItemWrap}>
							<Iconfont name={"income"} size={24} color={Colors.weiboColor} />
							<TouchableOpacity style={styles.walletItem} onPress={() => navigation.navigate("我的收入")}>
								<Text style={styles.walletItemName}>我的收入</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.walletItemWrap}>
							<Iconfont name={"modification"} size={26} color={Colors.linkColor} />
							<TouchableOpacity
								style={[styles.walletItem, { borderBottomColor: "transparent" }]}
								onPress={() => navigation.navigate("交易记录")}
							>
								<Text style={styles.walletItemName}>交易记录</Text>
							</TouchableOpacity>
						</View>
						{
							// //TODO
							// <View style={styles.walletItemWrap}>
							// 	<Iconfont
							// 		name={"QR-code"}
							// 		size={22}
							// 		color={Colors.qqzoneColor}
							// 	/>
							// 	<TouchableOpacity style={styles.walletItem} onPress={()=>navigation.navigate('赞赏码')}>
							// 		<Text style={styles.walletItemName}>我的赞赏码</Text>
							// 	</TouchableOpacity>
							// </View>
						}
					</View>
				</View>
			</Screen>
		);
	}

	toast() {
		let toast = Toast.show("提现金额需满100元，如有疑惑请阅读提现帮助哦(,,•́ . •̀,,)", {
			duration: Toast.durations.LONG,
			position: 70,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 100,
			backgroundColor: Colors.nightColor
		});
		setTimeout(function() {
			Toast.hide(toast);
		}, 2000);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.skinColor,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	walletTop: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	balanceBanner: {
		height: 100,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.themeColor,
		borderRadius: 4
	},
	walletMark: {
		position: "absolute",
		left: -15,
		bottom: -20,
		zIndex: -1,
		opacity: 0.5
	},
	withdrawDepositHelp: {
		alignItems: "center",
		marginTop: 20,
		marginBottom: 5
	},
	withdrawDepositHelpButton: {
		width: 48,
		height: 25,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 4
	},
	walletItemWrap: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15
	},
	walletItem: {
		flex: 1,
		paddingVertical: 25,
		marginLeft: 8,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	walletItemName: {
		fontSize: 16,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({ user: store.users.user }))(WalletScreen);
