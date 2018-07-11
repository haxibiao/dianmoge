import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";

class User extends Component {
  navigate(user) {
    this.props.navigation ? this.props.navigation.navigate("用户详情", { user }) : () => null;
  }

  render() {
    const { customStyle = {}, color = "#515151", user } = this.props;
    return (
      <TouchableOpacity onPress={() => this.navigate(user)}>
        <Iconfont name={"user"} size={22} color={color} style={customStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default User;
