import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import Header from "./Header";
import { Input } from "../Element";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

class SearchHeader extends Component {
  render() {
    let { name, handleSearch = () => null, onChangeText = () => null, placeholder = "搜索文章、专题、用户" } = this.props;
    return (
      <Header
        centerComponent={
          <View style={styles.searchWrap}>
            <Input words={false} style={styles.textInput} placeholder={placeholder} onChangeText={onChangeText} autoFocus />
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Iconfont name={"search"} size={22} color={Colors.tintFontColor} style={{ marginRight: 8 }} />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  searchWrap: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: 22,
    lineHeight: 22,
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: Colors.primaryFontColor
  },
  searchIcon: {
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: Colors.lightBorderColor
  }
});

export default SearchHeader;
