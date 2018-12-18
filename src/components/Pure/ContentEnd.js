import React, { Component } from "react";
import { Colors } from "../../constants";

import { StyleSheet, View, Text } from "react-native";

class ContentEnd extends Component {
  render() {
    return (
      <View style={styles.contentEnd}>
        <Text style={styles.endText}>我是有底线的哦(..•˘_˘•..)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentEnd: {
    paddingVertical: 20
  },
  endText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.tintFontColor
  }
});

export default ContentEnd;
