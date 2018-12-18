import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { connect } from "react-redux";

class RecommendFollow extends Component {
  navigate() {
    let { login, navigation } = this.props;
    login ? navigation.navigate("推荐关注") : navigation.navigate("登录注册", { login: true });
  }

  render() {
    const { customStyle = {}, color = "#515151" } = this.props;
    return (
      <TouchableOpacity style={styles.wrap} onPress={() => this.navigate()}>
        <Iconfont name={"add-person"} size={23} style={customStyle} color={color} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connect(store => ({
  login: store.users.login
}))(RecommendFollow);
