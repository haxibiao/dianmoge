"use strict";

import React from "react";
import { Colors } from "../../constants";
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Modal, TouchableOpacity, Platform, Dimensions, StatusBar } from "react-native";
import { Iconfont } from "../../utils/Fonts";

import ImagePicker from "react-native-image-picker";
import { throttle } from "lodash";
const { width, height } = Dimensions.get("window");

export default class MediaModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { visible, handleVisible, onPressPhotoUpload, onPressVideoUpload } = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={handleVisible}>
        <View
          style={styles.bgstyle}
          onStartShouldSetResponder={evt => true}
          onResponderStart={handleVisible}
          onStartShouldSetResponderCapture={evt => false}
        >
          <View style={styles.box}>
            <TouchableOpacity onPress={onPressPhotoUpload}>
              <View
                style={{
                  height: 49,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.lightGray,
                  width: width - 30,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.themeColor }}>图片</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressVideoUpload}>
              <View
                style={{
                  height: 49,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.themeColor }}>视频</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleVisible}>
            <View
              style={{
                height: 49,
                borderBottomColor: Colors.lightGray,
                width: width - 30,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                backgroundColor: "white",
                borderRadius: 10
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.themeColor }}>取消</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bgstyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  box: {
    height: 100,
    width: width - 30,
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});
