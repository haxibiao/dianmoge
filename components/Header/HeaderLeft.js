import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

class HeaderLeft extends Component {
  render() {
    // backHandler是用来处理点击左边箭头不是navigation.goBack()的情况
    const { navigation, routeName, goBack = true, backHandler = null, color = Colors.primaryFontColor, children } = this.props;
    return (
      <View style={styles.headerLeft}>
        {goBack && (
          <TouchableOpacity
            onPress={() => {
              if (backHandler) {
                backHandler();
              } else {
                navigation.goBack();
              }
            }}
          >
            <Iconfont name={"back-ios"} size={23} color={color} style={{ marginRight: 15 }} />
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: 17, color }}>{routeName ? routeName : navigation.state.routeName}</Text>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default HeaderLeft;
