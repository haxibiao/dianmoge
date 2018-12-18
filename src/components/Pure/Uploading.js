"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import Spinner from "react-native-spinkit";

class Uploading extends Component {
	render() {
		let { size = 30, color = "#fff", type = "FadingCircleAlt", style = {} } = this.props;
		return (
			<View style={[styles.uploading, style]}>
				<Spinner isVisible={true} size={size} type={type} color={color} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	uploading: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(00,00,00,0.3)",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default Uploading;
