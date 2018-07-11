import React, { Component } from "react";

import { StyleSheet, View, ImageBackground } from "react-native";
import VideoMark from "./VideoMark";

class VideoCover extends Component {
	render() {
		let { width, height, cover, markWidth, markSize, customStyle = {} } = this.props;
		return (
			<View style={[styles.coverView, customStyle]}>
				<ImageBackground style={[styles.cover, { width, height }]} source={{ uri: cover }}>
					<VideoMark width={markWidth} size={markSize} />
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	coverView: {
		position: "relative"
	},
	cover: {
		justifyContent: "center",
		alignItems: "center"
	}
});

export default VideoCover;
