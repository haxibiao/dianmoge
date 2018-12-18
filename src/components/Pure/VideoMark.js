import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

class VideoMark extends Component {
	render() {
		let { width = 46, size = 21, style = {} } = this.props;
		let fix = Math.floor(size / 4);
		return (
			<View style={[styles.videoMark, { width, height: width, borderRadius: width / 2 }, style]}>
				<Iconfont name="play" size={size} color={"#fff"} style={{ marginLeft: fix, marginTop: 1 }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	videoMark: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden"
	}
});

export default VideoMark;
