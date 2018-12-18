import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { Colors } from "../../../constants";
import Header from "../../../components/Header/Header";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CustomScrollTabBar from "../../../components/Pure/CustomScrollTabBar";
import TwentyFourHoursHot from "./TwentyFourHoursHot";
import SevenDaysHot from "./SevenDaysHot";
import ThirtyDaysHot from "./ThirtyDaysHot";
import Screen from "../../Screen";

class ArticleRankingScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <ScrollableTabView
            renderTabBar={() => (
              <CustomScrollTabBar
                tabNames={["24H热门", "7日热门", "30日热门"]}
                tabBarTextStyle={{ fontSize: 17 }}
                tabBarStyle={{ borderTopColor: "transparent" }}
              />
            )}
          >
            <TwentyFourHoursHot tabLabel="24H热门" navigation={navigation} />
            <SevenDaysHot tabLabel="7日热门" navigation={navigation} />
            <ThirtyDaysHot tabLabel="30日热门" navigation={navigation} />
          </ScrollableTabView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default ArticleRankingScreen;
