import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, StatusBar } from 'react-native';

import Video from 'react-native-video';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';

class Player extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			// 初始化播放状态
			paused: !props.active
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.active !== this.props.active) {
			if (nextProps.active) {
				this.setState({ paused: false }, function() {
					this.video.seek(0);
				});
			} else {
				this.setState({ paused: true });
			}
		}
	}

	render() {
		let { paused } = this.state;
		let { id, source, active } = this.props;
		return (
			<TouchableOpacity style={styles.playContainer} activeOpacity={1} onPress={this.control}>
				<Video
					ref={ref => {
						this.video = ref;
					}}
					cover={require('../../assets/images/bg1.png')}
					source={{ uri: source }}
					style={styles.fullScreen}
					rate={1} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
					paused={paused}
					volume={1} // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
					muted={false} // true代表静音，默认为false.
					resizeMode="contain" // 视频的自适应伸缩铺放行为，
					onLoad={this.onLoad} // 当视频加载完毕时的回调函数
					// onLoadStart={this.loadStart}      // 当视频开始加载时的回调函数
					// onProgress={this.onProgress}   	//  进度控制，每250ms调用一次，以获取视频播放的进度
					// onEnd={this.onEnd}             // 当视频播放完毕后的回调函数
					onError={this.videoError} // 当视频不能加载，或出错后的回调函数
					onAudioBecomingNoisy={this.onAudioBecomingNoisy}
					onAudioFocusChanged={this.onAudioFocusChanged}
					disableFocus={true}
					repeat={true} // 是否重复播放
					ignoreSilentSwitch="obey"
					playWhenInactive
				/>
				{active && paused && <Iconfont name="play" size={60} color={Colors.shade1} style={{ opacity: 0.8 }} />}
			</TouchableOpacity>
		);
	}

	//有异常，应该暂停播放
	onAudioBecomingNoisy = () => {
		console.log('onAudioBecomingNoisy...');
		this.setState({ paused: true });
	};

	//失去声音聚焦，也暂停
	onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
		console.log('onAudioFocusChanged ...', event);
		if (!this.state.paused && !event.hasAudioFocus) {
			this.setState({ paused: true });
		}
	};

	control = () => {
		this.setState(
			prevState => ({ paused: !this.state.paused }),
			() => {
				this.video.seek(0);
			}
		);
	};

	onLoad = error => {
		// do something
		return null;
	};

	videoError = error => {
		console.log('video error:', error);
		// do something
		return null;
	};
}

const styles = StyleSheet.create({
	playContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	fullScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});

export default Player;
