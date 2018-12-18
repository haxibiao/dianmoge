import React, { Component } from "react";
import { Colors } from "../../constants";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

class CustomScrollTabBar extends Component {
	renderTabOption = (tab, i) => {
		const color = this.props.activeTab == i ? Colors.themeColor : Colors.tintFontColor; // 判断i是否是当前选中的tab，设置不同的颜色
		const borderColor = this.props.activeTab == i ? Colors.themeColor : "transparent";
		let { tabItemWrapStyle = { flex: 1 }, tabBarTextStyle = { fontSize: 15 } } = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.props.goToPage(i)}
				style={[tabItemWrapStyle, { borderBottomColor: borderColor, borderBottomWidth: 2 }]}
				key={i.toString()}
			>
				<View style={[styles.tabItem]}>
					<Text style={[tabBarTextStyle, { color }]}>{this.props.tabNames[i]}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		let { tabBarStyle = {} } = this.props;
		let mergeStyle = StyleSheet.flatten([styles.tabBar, tabBarStyle]);
		return <View style={mergeStyle}>{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}</View>;
	}
}

const styles = StyleSheet.create({
	tabBar: {
		height: 50,
		paddingHorizontal: 40,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor,
		flexDirection: "row",
		justifyContent: "center"
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default CustomScrollTabBar;
