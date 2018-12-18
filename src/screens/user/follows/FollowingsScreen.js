import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
// import { TabNavigator, TabBarTop } from "react-navigation";
import { Colors, Divice } from "../../../constants";
import { Iconfont } from "../../../utils/Fonts";

import ScrollableTabView from "react-native-scrollable-tab-view";
import FollowedUser from "./FollowedUser";
import FollowedCategory from "./FollowedCategory";
import { HeaderLeft, TabBarHeader } from "../../../components/Header";
import Screen from "../../Screen";

class FollowingsScreen extends Component {
	render() {
		let { navigation } = this.props;
		return (
			<Screen header>
				<View style={styles.container}>
					<ScrollableTabView renderTabBar={props => <TabBarHeader {...props} width={160} />}>
						<FollowedUser tabLabel="用户" navigation={navigation} />
						<FollowedCategory tabLabel="专题" navigation={navigation} />
					</ScrollableTabView>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});

export default FollowingsScreen;

// export default TabNavigator(
// 	{
// 		用户: {
// 			screen: FollowedUser
// 		},
// 		专题: {
// 			screen: FollowedCategory
// 		}
// 	},
// 	{
// 		tabBarPosition: "top",
// 		animationEnabled: false,
// 		swipeEnabled: true,
// 		lazy: false,
// 		backBehavior: "none",
// 		tabBarOptions: {
// 			activeTintColor: Colors.darkFontColor,
// 			inactiveTintColor: Colors.primaryFontColor,
// 			style: {
// 				backgroundColor: "#fff",
// 				borderBottomWidth: 0,
// 				elevation: 0,
// 				shadowColor: "transparent",
// 				paddingTop: Divice.STATUSBAR_HEIGHT,
// 				paddingBottom: 6,
// 				paddingLeft: Divice.width / 2 - 60
// 			},
// 			indicatorStyle: {
// 				height: 2,
// 				width: 20,
// 				marginHorizontal: 20,
// 				backgroundColor: Colors.themeColor,
// 				left: Divice.width / 2 - 60,
// 				bottom: 6
// 			},
// 			labelStyle: {
// 				fontSize: 17,
// 				margin: 3
// 			},
// 			tabStyle: {
// 				width: 60,
// 				paddingHorizontal: 0
// 			}
// 		},
// 		tabBarComponent: props => <TabBarTop {...props} />
// 	}
// );
