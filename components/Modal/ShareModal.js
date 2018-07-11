import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

class ShareModal extends Component {
  render() {
    const { visible, plain = false, toggleVisible } = this.props;
    return (
      <Modal
        isVisible={visible}
        onBackButtonPress={toggleVisible}
        onBackdropPress={toggleVisible}
        backdropOpacity={0.4}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.shareSlide}>
          <StatusBar backgroundColor={visible ? "rgba(105,105,105,0.7)" : "#fff"} barStyle={"dark-content"} />
          {!plain && (
            <View style={styles.shareSlideItemWrap}>
              <TouchableOpacity style={styles.shareSlideItem}>
                <Iconfont name={"image"} size={26} color={Colors.darkBorderColor} />
              </TouchableOpacity>
              <Text style={styles.shareLabel}>生成图片分享</Text>
            </View>
          )}
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Iconfont name={"weixin"} size={30} color={Colors.weixinColor} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>微信好友</Text>
          </View>
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Image style={{ width: 27, height: 27, resizeMode: "cover" }} source={require("../../assets/images/pengyouquan.png")} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>微信朋友圈</Text>
          </View>
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Image style={{ width: 30, height: 30, resizeMode: "cover" }} source={require("../../assets/images/weibo.png")} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>新浪微博</Text>
          </View>
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Iconfont name={"qqzone"} size={32} color={Colors.qqzoneColor} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>QQ空间</Text>
          </View>
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Image style={{ width: 30, height: 30, resizeMode: "cover" }} source={require("../../assets/images/qq.png")} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>QQ好友</Text>
          </View>
          {!plain && (
            <View style={styles.shareSlideItemWrap}>
              <TouchableOpacity style={styles.shareSlideItem}>
                <Iconfont name={"link"} size={30} color={Colors.darkBorderColor} />
              </TouchableOpacity>
              <Text style={styles.shareLabel}>复制链接</Text>
            </View>
          )}
          <View style={styles.shareSlideItemWrap}>
            <TouchableOpacity style={styles.shareSlideItem}>
              <Iconfont name={"more"} size={30} color={Colors.darkBorderColor} />
            </TouchableOpacity>
            <Text style={styles.shareLabel}>更多</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  shareSlide: {
    height: height * 2 / 7,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
    paddingBottom: 20,
    backgroundColor: "#fff"
  },
  shareSlideItemWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: width / 4
  },
  shareSlideItem: {
    width: width / 8,
    height: width / 8,
    borderWidth: 1,
    borderColor: Colors.lightBorderColor,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6
  },
  shareLabel: {
    fontSize: 13,
    color: "#666"
  }
});

export default ShareModal;
