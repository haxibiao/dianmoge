"use strict";
import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, Platform } from "react-native";
import Spinner from "react-native-spinkit";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

class VideoStatus extends Component {
	render() {
		let { isLandscape, status, replay } = this.props;
		switch (status) {
			case "error":
				return (
					<View style={styles.videoStatus}>
						<TouchableWithoutFeedback onPress={replay}>
							<View style={styles.status}>
								<Iconfont name="replay" size={isLandscape ? 50 : 40} color="#fff" />
								<Text style={[styles.statusText, isLandscape && { fontSize: 14 }]}>好像迷路啦，请检查网络或者重试</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				);
				break;
			case "loading":
				return (
					<View style={styles.videoStatus}>
						<View style={styles.status}>
							<Spinner
								size={isLandscape ? 50 : 40}
								type="FadingCircleAlt"
								color="#fff"
								style={Platform.OS == "ios" && { marginBottom: 10 }}
							/>
							<Text style={[styles.statusText, isLandscape && { fontSize: 14 }]}>我在努力加载哦ヾ(◍°∇°◍)ﾉﾞ</Text>
						</View>
					</View>
				);
				break;
			case "end":
				return (
					<View style={styles.videoStatus}>
						<TouchableWithoutFeedback onPress={replay}>
							<View style={styles.status}>
								<Iconfont name="replay" size={isLandscape ? 50 : 40} color="#fff" />
								<Text style={[styles.statusText, isLandscape && { fontSize: 14 }]}>喜欢就请点个赞鼓励作者吧</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				);
				break;
			default:
				return null;
		}
	}
}

const styles = StyleSheet.create({
	videoStatus: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.8)",
		justifyContent: "center",
		alignItems: "center"
	},
	status: {
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	statusText: {
		marginTop: 10,
		fontSize: 12,
		color: "#fff"
	}
});

export default VideoStatus;
