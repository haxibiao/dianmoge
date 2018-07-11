import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width / 3;

class BlankContent extends Component {
	render() {
		let { size = 70, fontSize = 16, customStyle = {}, remind = "这里还木有内容哦 ~", children } = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={require("../../assets/images/blank.png")} />
				{children ? children : <Text style={{ fontSize, color: Colors.tintFontColor, marginTop: 12 }}>{remind}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
		backgroundColor: Colors.skinColor
	},
	image: {
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH,
		resizeMode: "contain"
	}
});

export default BlankContent;
