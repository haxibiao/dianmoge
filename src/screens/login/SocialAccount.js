"use strict";

import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

class SocialAccount extends Component {
  render() {
    return null;
    return (
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 40, height: 2, backgroundColor: Colors.tintGray }} />
          <Text style={{ fontSize: 16, color: Colors.tintFontColor, marginHorizontal: 8 }}>社交账号直接登录</Text>
          <View style={{ width: 40, height: 2, backgroundColor: Colors.tintGray }} />
        </View>
        <View style={{ marginVertical: 20, flexDirection: "row", alignItems: "center" }}>
          <View style={[{ width: 42, height: 42, borderRadius: 21 }, { backgroundColor: Colors.weixinColor }]}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Iconfont name={"weixin"} size={25} color={"#ffffff"} />
            </TouchableOpacity>
          </View>
          <View style={[{ width: 42, height: 42, borderRadius: 21 }, { backgroundColor: Colors.qqColor, marginHorizontal: 21 }]}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Iconfont name={"qq"} size={25} color={"#ffffff"} />
            </TouchableOpacity>
          </View>
          <View style={[{ width: 42, height: 42, borderRadius: 21 }, { backgroundColor: Colors.weiboColor }]}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Iconfont name={"weibo"} size={25} color={"#ffffff"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default SocialAccount;
