import React, { Component } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";

import Video from "react-native-video";
import FullScreenVideo from "./FullScreenVideo";

const { width, height } = Dimensions.get("window");

class VideoList extends Component {
	constructor(props) {
		super(props);
		this.activeIndex = 0;
		this.state = {
			activeIndex: 0
		};
	}

	render() {
		let { activeIndex } = this.state;
		let { navigation, videos, style } = this.props;
		return (
			<FlatList
				style={[
					{
						width: height - 50,
						position: "relative",
						transform: [
							{ rotateZ: "90deg" },
							// 默认flex:1,高度等于height
							{ translateY: height - width - 50 }
						]
					},
					style
				]}
				horizontal={true}
				bounces={false}
				pagingEnabled //每次滑动一个item
				data={videos}
				keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
				renderItem={({ item, index }) => (
					<FullScreenVideo video={item} index={index} active={activeIndex == index} dislikeHandler={this.updateVideos} />
				)}
				getItemLayout={(data, index) => ({
					length: width,
					offset: width * index,
					index
				})}
				onMomentumScrollEnd={this.onMomentumScrollEnd}
			/>
		);
	}

	onMomentumScrollEnd = e => {
		let activeIndex = Math.floor(e.nativeEvent.contentOffset.x / (height - 50));
		this.activeIndex = activeIndex;
		this.setState({ activeIndex });
	};
}

const styles = StyleSheet.create({});

export default VideoList;
