import React, { Component } from "react";
import Colors from "../../constants/Colors";
import { StyleSheet, View } from "react-native";

class TextContainer extends Component {
  render() {
    let { customStyle = {} } = this.props;
    return <View style={[styles.commentBox, customStyle]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  commentBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 4,
    backgroundColor: "#fafafa"
  }
});

export default TextContainer;
