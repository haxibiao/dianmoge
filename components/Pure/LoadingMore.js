import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Spinner from "react-native-spinkit";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";

class LoadingMore extends Component {
  render() {
    let { size = 18, fontSize = 12, color = Colors.themeColor, type = "FadingCircleAlt", isVisible = true } = this.props;
    return (
      <View style={styles.loadingMore}>
        <Spinner isVisible={isVisible} size={size} type={type} color={color} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize, color: Colors.tintFontColor }}>正在为您加载呢</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingMore: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingMore;
