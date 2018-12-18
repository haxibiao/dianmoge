import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { navigationAction, userOperationMiddleware } from "../../constants/Methods";

class SlideWrite extends Component {
	render() {
		let { style = {}, size = 30, color = "#fff", navigation, category, login } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() =>
					userOperationMiddleware({
						login,
						action: () => navigation.dispatch(navigationAction({ routeName: "发布动态", params: { category } })),
						navigation
					})
				}
			>
				<View style={[styles.write, style]} elevation={5}>
					<Iconfont name="write" size={25} color={color} />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	write: {
		backgroundColor: "rgba(0, 0, 0, 0.85)",
		justifyContent: "center",
		alignItems: "center",
		width: 46,
		height: 46,
		borderRadius: 23
	}
});

export default SlideWrite;
