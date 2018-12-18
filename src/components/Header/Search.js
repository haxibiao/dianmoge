import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

class Search extends Component {
  render() {
    const { customStyle = {}, color = "#515151", navigation, routeName = "搜索中心" } = this.props;
    return (
      <TouchableOpacity onPress={navigation ? () => navigation.navigate(routeName) : () => null}>
        <Iconfont name={"search"} size={22} color={color} style={customStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default Search;
