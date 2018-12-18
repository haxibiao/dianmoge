import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

class NotificationSetting extends Component {
  navigate() {
    this.props.navigation ? this.props.navigation.navigate("推送通知") : () => null;
  }

  render() {
    const { customStyle = {}, color = "#515151" } = this.props;
    return (
      <TouchableOpacity onPress={() => this.navigate()}>
        <Iconfont name={"notification-setting"} size={22} style={customStyle} color={color} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default NotificationSetting;
