import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Screen from "../Screen";

class IntroduceScreen extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<Screen header>
				<View style={styles.container}>
					<View style={styles.cover}>
						<View style={{ marginTop: 20 }}>
							<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
								<Iconfont name={"chacha"} size={20} color={Colors.tintFontColor} style={{ fontWeight: "600" }} />
							</TouchableOpacity>
						</View>
						<View style={{ marginVertical: 30 }}>
							<Text style={styles.slogan}>立即体验属于你的创作</Text>
						</View>
						<View style={{ marginBottom: 30 }}>
							<View style={styles.feature}>
								<View style={{ width: 100, alignItems: "center" }}>
									<Iconfont
										name={"collection"}
										size={60}
										color={Colors.themeColor}
										style={{
											fontWeight: "700"
										}}
									/>
								</View>
								<View style={{ width: 200 }}>
									<Text style={styles.featureDscribe}>写下内心感悟，记录生活点滴</Text>
								</View>
							</View>
							<View style={styles.feature}>
								<View style={{ width: 100, alignItems: "center" }}>
									<Iconfont
										name={"image"}
										size={50}
										color={Colors.softPink}
										style={{
											fontWeight: "700"
										}}
									/>
								</View>
								<View style={{ width: 200 }}>
									<Text style={styles.featureDscribe}>加上图片，更好的展现你的作品</Text>
								</View>
							</View>
							<View style={styles.feature}>
								<View style={{ width: 100, alignItems: "center" }}>
									<Iconfont
										name={"time-fill"}
										size={60}
										color={Colors.skyBlue}
										style={{
											fontWeight: "700"
										}}
									/>
								</View>
								<View style={{ width: 200 }}>
									<Text style={styles.featureDscribe}>随时随地，创作属于你的创作</Text>
								</View>
							</View>
						</View>
						<View style={{ paddingHorizontal: 35 }}>
							<TouchableOpacity
								style={{
									backgroundColor: Colors.weixinColor,
									borderRadius: 3
								}}
								onPress={() => {
									navigation.navigate("登录注册");
								}}
							>
								<Text style={styles.signUp}>立即注册</Text>
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: 30 }}>
							<Text
								style={{
									fontSize: 16,
									color: Colors.tintFontColor,
									textAlign: "center"
								}}
							>
								<Text>{`已有${Config.AppDisplayName}账号？`}</Text>
								<Text
									style={{ color: Colors.linkColor }}
									onPress={() => {
										navigation.navigate("登录注册", {
											login: true
										});
									}}
								>
									去登录
								</Text>
							</Text>
						</View>
					</View>
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
	cover: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: Colors.skinColor
	},
	slogan: {
		fontSize: 23,
		color: "#717171",
		textAlign: "center"
	},
	feature: {
		marginBottom: 30,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	featureDscribe: {
		fontSize: 17,
		color: Colors.tintFontColor,
		lineHeight: 21
	},
	signUp: {
		fontSize: 19,
		fontWeight: "700",
		color: "#fff",
		lineHeight: 40,
		textAlign: "center"
	}
});

export default IntroduceScreen;
