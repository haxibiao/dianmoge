import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import Orientation from "react-native-orientation";

import VideoStatus from "./VideoStatus";
import VideoControl from "./VideoControl";
import { Colors, Divice } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

class VideoPlayer extends Component {
	constructor(props) {
		super(props);
		this.slidingComplete = true;
		this.state = {
			status: "loading", //视频播放状态
			controlVisible: false, //控制器
			paused: true, //视频是否暂停
			currentTime: 0, //视频当前时间
			duration: 0 //视频时长
		};
	}

	componentWillUnmount() {
		this.controlIntervel && clearTimeout(this.controlIntervel);
	}

	render() {
		let { video, isFullScreen, videoWidth, videoHeight, isPortrait } = this.props;
		let { paused, status } = this.state;
		return (
			<View style={styles.playerContainer}>
				<Video
					style={{ width: videoWidth, height: videoHeight }}
					ref={ref => (this.videoRef = ref)}
					source={{ uri: video.video_url }}
					rate={1.0}
					volume={1.0}
					muted={false}
					paused={paused}
					resizeMode={"contain"}
					playWhenInactive={false}
					playInBackground={false}
					onLoadStart={this._onLoadStart}
					onLoad={this._onLoaded}
					onProgress={this._onProgressChanged}
					onEnd={this._onPlayEnd}
					onError={this._onPlayError}
					onBuffer={this._onBuffering}
				/>
				<TouchableOpacity activeOpacity={1} onPress={this.controlSwitch} style={styles.controlContainer}>
					<VideoControl
						{...this.state}
						isPortrait={isPortrait}
						isFullScreen={isFullScreen}
						playButtonHandler={this.playButtonHandler}
						onSlidingComplete={this.onSlidingComplete}
						onSliderValueChanged={this.onSliderValueChanged}
						onSwitchLayout={this.onSwitchLayout}
					/>
				</TouchableOpacity>
				<VideoStatus isLandscape={isPortrait || isFullScreen} status={status} replay={this.onReplayVideo} />
			</View>
		);
	}

	_onLoadStart = () => {
		// console.log("_onLoadStart");
	};

	_onBuffering = () => {
		// console.log("_onBuffering");
	};

	_onLoaded = data => {
		// console.log("_onLoaded");
		this.setState({
			duration: data.duration,
			paused: false,
			status: null
		});
	};

	_onProgressChanged = data => {
		// console.log("_onProgressChanged");
		if (this.slidingComplete) {
			// console.log("_onProgressChanged", data.currentTime);
			if (!this.state.paused) {
				this.setState({
					currentTime: data.currentTime
				});
			}
		}
	};

	_onPlayEnd = () => {
		// console.log("_onPlayEnd");
		this.setState({
			paused: true,
			status: "end",
			controlVisible: false
		});
	};

	_onPlayError = () => {
		// console.log("_onPlayError");
		this.setState({
			status: "error"
		});
	};

	// 重播
	onReplayVideo = () => {
		this.videoRef.seek(0);
		setTimeout(() => {
			this.setState({
				currentTime: 0,
				status: null,
				paused: false
			});
		}, 10);
	};

	// video control visible
	controlSwitch = () => {
		this.controlIntervel && clearInterval(this.controlIntervel);
		this.setState(
			prevState => ({ controlVisible: !prevState.controlVisible }),
			() => {
				if (this.state.controlVisible && !this.state.paused) {
					this.setControlInterval();
				}
			}
		);
	};

	// 播放/暂停
	playButtonHandler = () => {
		this.controlIntervel && clearInterval(this.controlIntervel);
		this.setState(
			prevState => ({
				paused: !prevState.paused
			}),
			() => {
				// 点击播放后videoControl也5秒后消失
				if (!this.state.paused) {
					this.setControlInterval();
				}
			}
		);
	};

	//全屏按钮
	onSwitchLayout = () => {
		Orientation.unlockAllOrientations();
		if (this.props.isFullScreen) {
			Orientation.lockToPortrait();
		} else {
			Orientation.lockToLandscape();
		}
	};

	// 进度条值改变
	onSliderValueChanged = currentTime => {
		// console.log("onSliderValueChanged", currentTime);
		this.slidingComplete = false;
		this.controlIntervel && clearInterval(this.controlIntervel);
		this.setState({ currentTime });
		if (!this.state.controlVisible) {
			this.setState({
				controlVisible: true
			});
		}
	};

	// 拖拽结束
	onSlidingComplete = currentTime => {
		// console.log("onSlidingComplete", currentTime);
		this.slidingComplete = true;
		this.videoRef.seek(currentTime);
		this.setControlInterval();
	};

	// 进度条定时器
	setControlInterval = () => {
		this.controlIntervel = setTimeout(() => {
			this.setState({ controlVisible: false });
		}, 5000);
	};

	//外部调用
	//播放
	play = () => {
		this.setState({
			paused: false
		});
	};

	//暂停
	pause = () => {
		this.setState({
			paused: true,
			controlVisible: true
		});
	};
}

const styles = StyleSheet.create({
	playerContainer: {
		position: "relative",
		backgroundColor: "#000"
	},
	controlContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default VideoPlayer;
