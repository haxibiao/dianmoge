import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice } from '../../constants';

import Player from './Player';
import SideBar from './SideBar';

class FullScreenVideo extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.isLoad !== this.props.isLoad || nextProps.active !== this.props.active) {
			return true;
		} else {
			return false;
		}
	}

	// isList 是否为视频列表
	render() {
		const { width, height, video, active, isLoad, outerStyle, innerStyle } = this.props;
		const { user, video_url, description } = video;
		return (
			<View style={[styles.fullScreen, outerStyle, { width: height, height: width, transform: [{ translateY: height - width }] }]}>
				<View style={[styles.fullScreen2, innerStyle, { width, height }]}>
					{isLoad && <Player id={video.id} source={video_url} active={active} isList />}
					<View style={styles.info}>
						<View>
							<Text style={styles.name}>@{user.name}</Text>
						</View>
						<View>
							<Text style={styles.body} numberOfLines={3}>
								{description}
							</Text>
						</View>
					</View>
					<View style={styles.meta}>
						<SideBar video={video} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	fullScreen: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000'
	},
	fullScreen2: {
		transform: [{ rotateZ: '-90deg' }],
		backgroundColor: '#000'
	},
	name: {
		fontSize: 16,
		fontWeight: '500',
		color: '#fff'
	},
	body: {
		marginTop: 8,
		fontSize: 14,
		lineHeight: 18,
		color: '#fff'
	},
	info: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 100,
		padding: 10
	},
	meta: {
		position: 'absolute',
		right: 5,
		bottom: 10
	}
});

export default FullScreenVideo;
