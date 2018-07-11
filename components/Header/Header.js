import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { withNavigation } from "react-navigation";

import Colors from "../../constants/Colors";
import HeaderLeft from "./HeaderLeft";
import Search from "./Search";
import NotificationSetting from "./NotificationSetting";
import Setting from "./Setting";

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {
			routeName,
			leftComponent,
			rightComponent,
			navigation,
			backHandler = null,
			goBack = true,
			notification = false,
			setting = false,
			search = false,
			lightTabBar = false,
			customStyle = {},
			searchRouteName = "搜索中心"
		} = this.props;
		return (
			<View style={[styles.header, customStyle]}>
				{leftComponent ? (
					leftComponent
				) : (
					<HeaderLeft
						navigation={navigation}
						routeName={routeName}
						backHandler={backHandler}
						goBack={goBack}
						color={lightTabBar ? "#fff" : "#515151"}
					/>
				)}
				{rightComponent ? (
					rightComponent
				) : (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						{notification && (
							<View style={{ marginLeft: 15 }}>
								<NotificationSetting navigation={navigation} />
							</View>
						)}
						{setting && (
							<View style={{ marginLeft: 15 }}>
								<Setting navigation={navigation} />
							</View>
						)}
						{search && (
							<View style={{ marginLeft: 15 }}>
								<Search navigation={navigation} color={lightTabBar ? "#fff" : "#515151"} routeName={searchRouteName} />
							</View>
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		// height: Platform.OS === "ios" ? 65 : 45,
		// paddingTop: Platform.OS === "ios" ? 20 : 0,
		height: 46,
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor
	}
});

export default withNavigation(Header);
