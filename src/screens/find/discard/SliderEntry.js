"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Platform, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

function wp(percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideWidth = wp(80);
const slideHeight = slideWidth * 0.66;
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

class SliderEntry extends Component {
	get image() {
		const {
			data: { top_image }
		} = this.props;

		return <Image source={{ uri: top_image }} style={styles.image} />;
	}

	render() {
		const { data, navigation } = this.props;
		let { id, type, title } = data;
		const uppercaseTitle = title ? (
			<Text style={styles.title} numberOfLines={2}>
				{title.toUpperCase()}
			</Text>
		) : (
			false
		);

		return (
			<TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer} onPress={() => navigation.navigate("文章详情", { article: data })}>
				<View style={styles.shadow} />
				<View style={styles.imageContainer}>{this.image}</View>
				<View style={styles.textContainer}>{uppercaseTitle}</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	slideInnerContainer: {
		width: itemWidth,
		height: slideHeight,
		paddingHorizontal: itemHorizontalMargin,
		paddingBottom: 18 // needed for shadow
	},
	shadow: {
		position: "absolute",
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		shadowColor: "#1a1917",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius
	},
	imageContainer: {
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: "#ececec",
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
		overflow: "hidden"
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: "cover",
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius
	},
	textContainer: {
		justifyContent: "center",
		height: 48,
		paddingTop: 10 - entryBorderRadius,
		paddingHorizontal: 10,
		backgroundColor: "#ececec",
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius
	},
	title: {
		color: "#1a1917",
		fontSize: 13,
		lineHeight: 17,
		fontWeight: "bold",
		letterSpacing: 0.5
	},
	titleEven: {
		color: "white"
	}
});

export default withNavigation(SliderEntry);
