import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

class Dashed extends Component {
  renderDasheds() {
    const { borderWidth = 3, borderHeight = 1, borderColor = Colors.tintBorderColor } = this.props;
    let dasheds = Array(Math.floor(width / (borderWidth * 2)))
      .fill(1)
      .map((ele, index) => {
        return <View style={{ width: borderWidth, height: borderHeight, backgroundColor: Colors.tintBorderColor }} key={index} />;
      });
    return <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", overflow: "hidden" }}>{dasheds}</View>;
  }

  render() {
    return <View>{this.renderDasheds()}</View>;
  }
}

const styles = StyleSheet.create({});

export default Dashed;
