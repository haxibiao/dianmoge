"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

class Center extends Component {
	render() {
		let { style, children } = this.props;
		return <View style={[styles.style, style]}>{children}</View>;
	}
}

const styles = StyleSheet.create({
	style: {
		justifyContent: "center",
		alignItems: "center"
	}
});

export default Center;
