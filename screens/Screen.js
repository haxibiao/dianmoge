import React, { Component } from "react";

import { StyleSheet, View, StatusBar } from "react-native";

class Screen extends Component {
	render() {
		let { noPadding, customStyle = {}, lightBar } = this.props;
		return (
			<View
				style={[
					{
						flex: 1,
						paddingTop: noPadding ? 0 : 24,
						backgroundColor: "#ffffff"
					},
					customStyle
				]}
			>
				<StatusBar translucent={true} backgroundColor={"transparent"} barStyle={lightBar ? "light-content" : "dark-content"} />
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Screen;
