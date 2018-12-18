import React, { Component } from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import BasicModal from "./BasicModal";

import { connect } from "react-redux";

class PaymentModal extends Component {
  render() {
    const { visible, handleVisible } = this.props;
    return (
      <BasicModal
        visible={visible}
        handleVisible={handleVisible}
        header={<Text style={{ fontSize: 18, color: Colors.primaryFontColor }}>选择支付方式</Text>}
      >
        <View>
          <TouchableOpacity style={styles.paymentWay} onPress={() => null}>
            <View style={[styles.paymentWrap, { backgroundColor: Colors.weixinColor }]}>
              <Iconfont name={"weixin"} size={18} color={"#ffffff"} />
            </View>
            <View>
              <Text style={styles.paymentText}>微信钱包</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentWay} onPress={() => null}>
            <View style={[styles.paymentWrap, { backgroundColor: Colors.skyBlue }]}>
              <Iconfont name={"zhifubao"} size={18} color={"#ffffff"} />
            </View>
            <View>
              <Text style={styles.paymentText}>支付宝</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentWay} onPress={() => null}>
            <View style={[styles.paymentWrap, { backgroundColor: "#fff" }]}>
              <Iconfont name={"wallet"} size={18} color={Colors.themeColor} />
            </View>
            <View>
              <Text style={styles.paymentText}>
                {Config.AppDisplayName}
                余额：
                <Text style={{ color: Colors.primaryColor }}>
                  {this.props.user.balance}
                  .00
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BasicModal>
    );
  }
}

const styles = StyleSheet.create({
  paymentWay: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  paymentWrap: {
    width: 22,
    height: 22,
    borderRadius: 3,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  paymentText: {
    fontSize: 16,
    color: "#515151"
  }
});

export default connect(store => ({ user: store.users.user }))(PaymentModal);
