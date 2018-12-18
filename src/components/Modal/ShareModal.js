"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback } from "react-native";

import { Colors, Divice, Methods } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import SlideInUpModal from "./SlideInUpModal";
import { DivisionLine } from "../../components/Pure";

class ShareModal extends Component {
  render() {
    let { visible, toggleVisible } = this.props;
    return (
      <SlideInUpModal visible={visible} toggleVisible={() => toggleVisible(false)}>
        <View>
          <View>
            <View style={{ padding: 15, paddingBottom: 5 }}>
              <Text style={styles.darkText}>分享到</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
              <TouchableWithoutFeedback>
                <View style={styles.cycleItemWrap}>
                  <Image source={require("../../assets/images/pyq.png")} style={styles.socialIcon} />
                  <Text style={styles.smDarkText}>朋友圈</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.cycleItemWrap}>
                  <Image source={require("../../assets/images/weixin.png")} style={styles.socialIcon} />
                  <Text style={styles.smDarkText}>微信好友</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.cycleItemWrap}>
                  <Image source={require("../../assets/images/qq.png")} style={styles.socialIcon} />
                  <Text style={styles.smDarkText}>QQ好友</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.cycleItemWrap}>
                  <Image source={require("../../assets/images/qqzone.png")} style={styles.socialIcon} />
                  <Text style={styles.smDarkText}>QQ空间</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.cycleItemWrap}>
                  <Image source={require("../../assets/images/weibo.png")} style={styles.socialIcon} />
                  <Text style={styles.smDarkText}>微博</Text>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
          <DivisionLine height={1} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            <TouchableWithoutFeedback>
              <View style={styles.cycleItemWrap}>
                <Image
                  source={require("../../assets/images/download.png")}
                  style={[styles.socialIcon, { borderWidth: 2, borderColor: Colors.shade3 }]}
                />
                <Text style={styles.smDarkText}>下载</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.cycleItemWrap}>
                <Image
                  source={require("../../assets/images/collection.png")}
                  style={[styles.socialIcon, { borderWidth: 2, borderColor: Colors.shade3 }]}
                />
                <Text style={styles.smDarkText}>收藏</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.cycleItemWrap}>
                <Image
                  source={require("../../assets/images/QRCode.png")}
                  style={[styles.socialIcon, { borderWidth: 2, borderColor: Colors.shade3 }]}
                />
                <Text style={styles.smDarkText}>二维码</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.cycleItemWrap}>
                <Image
                  source={require("../../assets/images/report.png")}
                  style={[styles.socialIcon, { borderWidth: 2, borderColor: Colors.shade3 }]}
                />
                <Text style={styles.smDarkText}>举报</Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <DivisionLine height={1} />
          <TouchableWithoutFeedback onPress={() => toggleVisible(false)}>
            <View style={styles.close}>
              <Text style={styles.darkText}>取消</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SlideInUpModal>
    );
  }
}

const styles = StyleSheet.create({
  cycleItemWrap: {
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover"
  },
  cycle: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25
  },
  smDarkText: {
    fontSize: 12,
    color: Colors.font1,
    marginTop: 10
  },
  darkText: {
    fontSize: 14,
    color: Colors.font1
  },
  close: {
    paddingVertical: 15,
    alignItems: "center"
  }
});

export default ShareModal;
