"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withNavigation } from "react-navigation";

import { Colors, Methods } from "../../constants";

class ContentType extends Component {
	render() {
		let { navigation, content, textStyle = { lineHeight: 24 } } = this.props;
		return (
			<Text style={[{ color: Colors.linkColor }, textStyle]} onPress={() => Methods.goContentScreen(navigation, content)}>
				{content.title ? `《${content.title}》` : content.description ? ` 《${content.description}》 ` : this.renderType(content)}
			</Text>
		);
	}

	renderType(content) {
		let type;
		switch (content.type) {
			case "article":
				type = "‘文章’";
				break;
			case "video":
				type = "‘视频’";
				break;
			default:
				type = "‘动态’";
				break;
		}
		return type;
	}
}

const styles = StyleSheet.create({});

export default withNavigation(ContentType);
