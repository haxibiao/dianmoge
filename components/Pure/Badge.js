import React, { Component } from "react";
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text } from "react-native";

class Badge extends Component {
  render() {
    let { radius = 8, fontSize = 9, count = 0 } = this.props;
    if (count < 1) {
      return null;
    }
    return (
      <View
        style={{
          minWidth: radius * 2,
          minHeight: radius * 2,
          borderRadius: radius,
          backgroundColor: Colors.themeColor,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize, color: "#fff" }}>{count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Badge;
