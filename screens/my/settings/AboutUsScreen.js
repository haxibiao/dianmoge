import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from "react-native";

import Config from "../../../constants/Config";
import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";

class AboutUsScreen extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<Screen>
				<Header navigation={navigation} />
				<View style={styles.container}>
					<View style={styles.appMark}>
						<Text style={styles.appName}>{Config.AppName}</Text>
					</View>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>简介</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>我们的网站</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>微信公众号</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>新浪微博</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>用户协议</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.aboutItem} onPress={() => navigation.navigate("文章详情", { article: { id: 1375 } })}>
						<Text style={styles.aboutItemText}>隐私政策</Text>
					</TouchableOpacity>
					<View style={styles.copyright}>
						<Text style={{ fontSize: 13, color: Colors.themeColor }}>版权所有 ©2012-{new Date().getFullYear() + Config.AppName}</Text>
					</View>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	appMark: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	appName: {
		fontSize: 45,
		fontWeight: "500",
		color: `rgba(${Colors.rgbThemeColor},0.9)`,
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4
	},
	aboutItem: {
		paddingLeft: 15,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	aboutItemText: {
		fontSize: 16,
		color: Colors.primaryFontColor
	},
	copyright: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default AboutUsScreen;
