import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

class VideoWatermark extends Component {
	render() {
		let { width = 40, size = width / 2, style = {} } = this.props;
		let fix = Math.floor(size / 4);
		return (
			<View style={styles.wrap}>
				<View style={[styles.videoMark, { width, height: width, borderRadius: width / 2 }, style]}>
					<Iconfont name="play" size={size} color={"#fff"} style={{ marginLeft: fix }} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrap: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center"
	},
	videoMark: {
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden"
	}
});

export default VideoWatermark;
