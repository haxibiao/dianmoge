import React from "react";
import Colors from "../../constants/Colors";
import { TabNavigator } from "react-navigation";
import { Text, View, Platform } from "react-native";

import Search from "../../components/Header/Search";
import RecommendScreen from "./RecommendScreen";
import CategoriesScreen from "./CategoriesScreen";
import CustomFindTab from "./CustomFindTab";

export default TabNavigator(
  {
    推荐: {
      screen: RecommendScreen
    },
    专题: {
      screen: CategoriesScreen
    }
  },
  {
    tabBarPosition: "top",
    animationEnabled: false,
    swipeEnabled: true,
    lazy: false,
    backBehavior: "none",
    tabBarOptions: {
      activeTintColor: Colors.themeColor,
      inactiveTintColor: Colors.primaryFontColor
    },
    tabBarComponent: props => <CustomFindTab {...props} />
  }
);
