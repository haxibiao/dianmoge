import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Colors, Divice } from "../../constants";

class Dashed extends Component {
  renderDasheds() {
    const { length = Divice.width, borderWidth = 3, borderHeight = 1, color = Colors.shade4 } = this.props;
    let dasheds = Array(Math.floor(length / (borderWidth * 2)))
      .fill(1)
      .map((ele, index) => {
        return <View style={{ width: borderWidth, height: borderHeight, backgroundColor: color }} key={index} />;
      });
    return <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", overflow: "hidden" }}>{dasheds}</View>;
  }

  render() {
    return <View>{this.renderDasheds()}</View>;
  }
}

const styles = StyleSheet.create({});

export default Dashed;
