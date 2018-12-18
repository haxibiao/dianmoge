import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

class HeaderLeft extends Component {
  render() {
    const { color = Colors.primaryFontColor, children, navigation, goBack = true } = this.props;
    return (
      <View style={styles.headerLeft}>
        {goBack && (
          <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => navigation.goBack()}>
            <Iconfont name={"back-ios"} size={23} color={color} />
          </TouchableOpacity>
        )}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15
  },
  goBack: {
    height: 40,
    width: 40,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default withNavigation(HeaderLeft);
