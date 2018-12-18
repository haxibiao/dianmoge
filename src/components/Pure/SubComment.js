import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withNavigation } from "react-navigation";

import { Colors } from "../../constants";

class SubComment extends Component {
	render() {
		let { navigation, body, style = { fontSize: 14, color: Colors.tintFontColor }, numberOfLines = 10, spokesperson } = this.props;
		let Comment = JSON.parse(body).map((elem, index) => {
			if (typeof elem === "object") {
				return (
					<Text
						key={index}
						style={styles.linkText}
						onPress={() =>
							navigation.navigate("用户详情", {
								user: elem
							})
						}
					>
						{`@${elem.name} `}
					</Text>
				);
			}
			return (
				<Text key={index} style={{ lineHeight: 20 }}>
					{elem}
				</Text>
			);
		});
		return (
			<Text numberOfLines={numberOfLines} style={style}>
				{spokesperson && spokesperson}
				{spokesperson && ": "}
				{Comment}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
	linkText: {
		color: Colors.linkColor,
		lineHeight: 20
	}
});

export default withNavigation(SubComment);
