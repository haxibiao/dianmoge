import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";

class Setting extends Component {
  navigate() {
    this.props.navigation ? this.props.navigation.navigate("设置") : () => null;
  }

  render() {
    const { customStyle = {}, color = "#515151" } = this.props;
    return (
      <TouchableOpacity onPress={() => this.navigate()}>
        <Iconfont name={"fill-setting"} size={22} style={customStyle} color={color} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default Setting;
