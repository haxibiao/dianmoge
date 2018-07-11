import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, Animated, Easing } from "react-native";

import Color from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";

class RefreshControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rotateValue: new Animated.Value(0)
		};
	}

	render() {
		let { refreshing, refresh, size = 14, color = Color.tintFontColor } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					if (!refreshing) {
						this.refreshAnimation();
						refresh();
					}
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Animated.View
						style={{
							transform: [
								{
									rotate: this.state.rotateValue.interpolate({
										inputRange: [0, 1],
										outputRange: ["0deg", "360deg"]
									})
								}
							]
						}}
					>
						<Iconfont name={"fresh"} size={size} color={color} />
					</Animated.View>
					<Text style={{ fontSize: size - 2, color, marginLeft: size / 3, marginTop: -size / 7 }}>换一批</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	// 刷新动画，通过判断加载状态可以重复执行
	refreshAnimation = () => {
		//是否正在加载
		let { refreshing } = this.props;
		let { rotateValue } = this.state;
		rotateValue.setValue(0);
		Animated.timing(rotateValue, {
			toValue: 1,
			duration: 500,
			easing: Easing.linear
		}).start(() => {
			if (refreshing) {
				this.refreshAnimation();
			} else {
				return null;
			}
		});
	};
}

const styles = StyleSheet.create({});

export default RefreshControl;
