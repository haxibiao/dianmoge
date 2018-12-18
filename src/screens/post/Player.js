"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Video from "react-native-video";
import Spinner from "react-native-spinkit";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

const { width, height } = Dimensions.get("window");

class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			duration: 0,
			currentTime: 0,
			loading: true,
			paused: false
		};
	}

	componentDidMount() {
		let { navigation } = this.props;
		this.willBlurSubscription = navigation.addListener("willBlur", payload => {
			this.videoPlayerControl();
		});
	}

	componentWillUnmount() {
		this.willBlurSubscription.remove();
	}

	render() {
		let { currentTime, loading, paused } = this.state;
		let { navigation, video } = this.props;
		return (
			<TouchableOpacity activeOpacity={1} onPress={this.videoPlayerControl} style={styles.videoWrap}>
				<Video
					source={{ uri: video.video_url }}
					poster={video.cover}
					posterResizeMode="cover"
					style={{
						width,
						height: (width * 9) / 16
					}}
					rate={1}
					muted={false}
					volume={1}
					paused={paused}
					resizeMode={"contain"}
					repeat={true} // 是否重复播放
					playInBackground={true}
					onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
					onLoad={this.onLoad} // 当视频加载完毕时的回调函数
					// onProgress={this.onProgress}      //  进度控制，每250ms调用一次，以获取视频播放的进度
					onEnd={this.onEnd} // 当视频播放完毕后的回调函数
					onError={this.onError}
				/>
				{paused && (
					<View style={styles.pausedStyle}>
						<Iconfont name="video" size={40} color={Colors.tintGray} />
					</View>
				)}
			</TouchableOpacity>
		);
	}

	loadStart(data) {}

	onLoad = data => {
		// this.setState({ loading: false });
	};

	onProgress(data) {}

	onEnd(data) {}

	onError(data) {}

	// 播放暂停
	videoPlayerControl = () => {
		this.setState(prevState => ({ paused: !prevState.paused }));
	};

	playStatus = () => {
		let { loading, paused } = this.state;
		switch (true) {
			case !loading:
				return <Spinner size={40} type="FadingCircleAlt" color={Colors.tintGray} />;
				break;
			case paused:
				return (
					<View style={styles.pausedStyle}>
						<Iconfont name="video" size={40} color={Colors.tintGray} />
					</View>
				);
				break;
		}
	};
}

const styles = StyleSheet.create({
	videoWrap: {
		position: "relative",
		height: (width * 9) / 16,
		backgroundColor: "#212121"
	},
	pausedStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 50,
		height: 50,
		opacity: 0.7,
		marginLeft: -25,
		marginTop: -25,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default Player;
