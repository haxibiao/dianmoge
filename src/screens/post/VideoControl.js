"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Slider, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";

import { Colors, Methods } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

class VideoControl extends Component {
	render() {
		let {
			controlVisible,
			currentTime,
			duration,
			paused,
			isPortrait,
			isFullScreen,
			onSlidingComplete,
			onSliderValueChanged,
			playButtonHandler,
			onSwitchLayout
		} = this.props;
		if (!controlVisible) {
			return null;
		}
		return (
			<View style={styles.videoControl}>
				{isFullScreen && (
					<TouchableOpacity activeOpacity={1} onPress={onSwitchLayout} style={styles.headerControl}>
						<Iconfont name="back-ios" size={22} color="#fff" />
					</TouchableOpacity>
				)}
				<TouchableWithoutFeedback style={styles.pauseMark} onPress={playButtonHandler}>
					<Iconfont name={paused ? "play" : "paused"} size={isFullScreen || isPortrait ? 50 : 40} color="#fff" />
				</TouchableWithoutFeedback>
				<View style={styles.bottomControl}>
					<Text style={styles.timeText}>{Methods.formatTime(currentTime)}</Text>
					<Slider
						style={{ flex: 1, marginHorizontal: 10 }}
						maximumTrackTintColor="rgba(225,225,225,0.5)" //滑块右侧轨道的颜色
						minimumTrackTintColor={Colors.themeColor} //滑块左侧轨道的颜色
						thumbTintColor="#fff"
						value={currentTime}
						minimumValue={0}
						maximumValue={Number(duration)}
						onSlidingComplete={onSlidingComplete}
						onValueChange={onSliderValueChanged}
					/>
					<Text style={styles.timeText}>{Methods.formatTime(duration)}</Text>
					{!isPortrait && (
						<TouchableOpacity activeOpacity={1} onPress={onSwitchLayout} style={styles.layoutButton}>
							<Iconfont name={isFullScreen ? "fullscreen" : "exitFullscreen"} size={20} color="#fff" />
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	videoControl: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center",
		alignItems: "center"
	},
	headerControl: {
		position: "absolute",
		top: 15,
		left: 15,
		width: 40,
		height: 40,
		justifyContent: "center"
	},
	pauseMark: {
		width: 60,
		height: 60,
		alignItems: "center",
		justifyContent: "center"
	},
	bottomControl: {
		position: "absolute",
		left: 20,
		right: 20,
		bottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	layoutButton: {
		marginLeft: 10,
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	timeText: {
		fontSize: 12,
		color: "#fff"
	}
});

export default VideoControl;
