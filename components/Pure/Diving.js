import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";

class Diving extends Component {
	render() {
		let { size = 40, fontSize = 15, customStyle = null, description = "暂无消息", children } = this.props;
		return (
			<View style={[styles.divingContainer, customStyle && customStyle]}>
				<Iconfont name={"diving"} size={size} color={Colors.lightFontColor} />
				{children ? children : <Text style={{ fontSize, color: Colors.lightFontColor, marginTop: 12 }}>{description}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	divingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Diving;
