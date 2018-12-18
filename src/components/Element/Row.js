"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

class Row extends Component {
	render() {
		let { style, children } = this.props;
		return <View style={[styles.style, style]}>{children}</View>;
	}
}

const styles = StyleSheet.create({
	style: {
		flexDirection: "row",
		alignItems: "center"
	}
});

export default Row;
