import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.6;

class Find extends Component {
	render() {
		let { navigation, size = 70, fontSize = 16, customStyle = {}, remind = "更多有趣的朋友和专题 ~", children, user } = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={require("../../assets/images/find.png")} />
				<Text style={{ fontSize, color: Colors.tintFontColor, marginTop: 20 }}>
					去发现
					<Text
						style={{ color: Colors.linkColor }}
						onPress={() => {
							if (user.token) {
								navigation.navigate("推荐关注");
							} else {
								navigation.navigate("登录注册");
							}
						}}
					>
						{remind}
					</Text>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20
	},
	image: {
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH / 2,
		resizeMode: "contain"
	}
});

export default connect(store => ({ user: store.users.user }))(withNavigation(Find));
