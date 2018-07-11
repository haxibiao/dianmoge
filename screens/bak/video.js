import React, { Component } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Screen from "../Screen";
import Colors from "../../constants/Colors";

import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// trouble:
// 2.ScrollView嵌套ScrollableTabView在Android不能自适应高度
// 3.tabView切换的时候是共用一个scrollView,切换之后要恢复当前tab的scroll状态，同时保持上一个tab的状态
// 1.Animated.Value(0)才能保证动画的流畅性，但是无法获取offsetTop.value，造成状态也无法保存

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.scrollRecord = [0, 0, 0]; //用来记录tabview最后scroll的距离
		this.prevActiveTab = 1;
		this.state = {
			offsetTop: new Animated.Value(0)
		};
	}

	componentWillMount() {}

	render() {
		let { offsetTop } = this.state;
		const headerHeight = offsetTop.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
			extrapolate: "clamp"
		});
		const imageOpacity = offsetTop.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 0],
			extrapolate: "clamp"
		});
		const imageTranslate = offsetTop.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, -100],
			extrapolate: "clamp"
		});
		return (
			<Screen noPadding>
				<ScrollView
					bounces={false}
					scrollEventThrottle={16}
					style={styles.container}
					ref={ref => (this.scrollView = ref)}
					onScroll={Animated.event([
						{
							nativeEvent: { contentOffset: { y: offsetTop } }
						}
					])}
				>
					<View style={{ marginTop: HEADER_MAX_HEIGHT }}>
						<ScrollableTabView renderTabBar={() => <View ref={ref => (this.scrollTabRef = ref)} />} onChangeTab={this._changeTab}>
							<View style={{ height: 1000, backgroundColor: "#ff0000" }} />
							<View style={{ height: 2000, backgroundColor: "#00ff00" }} />
							<View style={{ height: 500, backgroundColor: "#0000ff" }} />
						</ScrollableTabView>
					</View>
				</ScrollView>
				<Animated.View
					style={[styles.header, { height: headerHeight }]}
					onLayout={event => (this.tabBarHeight = event.nativeEvent.layout.height)}
				>
					<Animated.Image
						style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
						source={{ uri: "https://www.dongmeiwei.com/storage/img/23433.top.jpg" }}
					/>
					<View style={styles.tabBar}>
						<TouchableOpacity style={styles.tabItem} onPress={() => this.scrollTabRef.props.goToPage(1)}>
							<Text>1</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tabItem} onPress={() => this.scrollTabRef.props.goToPage(2)}>
							<Text>2</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tabItem} onPress={() => this.scrollTabRef.props.goToPage(3)}>
							<Text>3</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Screen>
		);
	}

	_changeTab(obj) {
		console.log(this.state.offsetTop);
		this.scrollRecord[this.prevActiveTab] = this.state.offsetTop;
		if (this.scrollRecord[this.prevActiveTab] > HEADER_SCROLL_DISTANCE) {
			this.scrollView.scrollTo({ x: 0, y: this.scrollRecord[obj.i] + 100 });
		} else {
			this.scrollView.scrollTo({ x: 0, y: this.scrollRecord[obj.i] });
		}
		this.prevActiveTab = obj.i;
	}

	_outerScroll(event) {
		let { y } = event.nativeEvent.contentOffset;
		if (y >= 100) {
			this.tabBar.setNativeProps({
				style: {
					opacity: 1
				}
			});
			this.fixTabBar.setNativeProps({
				style: {
					opacity: 0
				}
			});
		} else {
			this.tabBar.setNativeProps({
				style: {
					opacity: 0
				}
			});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	header: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		overflow: "hidden"
	},
	backgroundImage: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		width: null,
		height: HEADER_MAX_HEIGHT,
		resizeMode: "cover"
	},
	tabBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width,
		height: 50,
		paddingHorizontal: 40,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor,
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#ac85de"
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default HomeScreen;
