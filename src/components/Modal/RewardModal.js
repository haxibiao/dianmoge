import React, { Component } from "react";
import { StyleSheet, View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-root-toast";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import BasicModal from "./BasicModal";
import PaymentModal from "./PaymentModal";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation } from "react-apollo";
import { tipArticleMutation } from "../../graphql/article.graphql";

class RewardModal extends Component {
  constructor(props) {
    super(props);
    this.handlePaymentVisible = this.handlePaymentVisible.bind(this);
    this.handleWarningVisible = this.handleWarningVisible.bind(this);
    this.selectMoney = this.selectMoney.bind(this);
    this.emptySelectMoney = this.emptySelectMoney.bind(this);
    this.customMoney = this.customMoney.bind(this);
    this.warning = "";
    this.message = "";
    this.state = {
      amount: 2,
      selectMoney: 2,
      inputMoney: "",
      paymentVisible: false,
      warningVisible: false
    };
  }

  render() {
    const { visible, handleVisible, type, article, user, personal } = this.props;
    const { selectMoney, inputMoney, paymentVisible, warningVisible, amount } = this.state;
    return (
      <Mutation mutation={tipArticleMutation}>
        {tipArticle => {
          return (
            <BasicModal visible={visible} handleVisible={handleVisible} header={this.rewardModalHeader()}>
              <View>
                <View style={{ marginTop: 20 }}>
                  <View style={styles.rewardModalSelect}>
                    <TouchableOpacity
                      style={[styles.rewardModalSelectItem, selectMoney === 2 ? styles.selected : null]}
                      onPress={() => this.selectMoney(2)}
                    >
                      <Text style={{ color: selectMoney === 2 ? Colors.themeColor : Colors.tintFontColor }}>
                        <Text style={styles.selectMoneyAmount}>2 </Text>
                        <Text style={{ fontSize: 14 }}>颗</Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.rewardModalSelectItem, selectMoney === 5 ? styles.selected : null]}
                      onPress={() => this.selectMoney(5)}
                    >
                      <Text style={{ color: selectMoney === 5 ? Colors.themeColor : Colors.tintFontColor }}>
                        <Text style={styles.selectMoneyAmount}>5 </Text>
                        <Text style={{ fontSize: 14 }}>颗</Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.rewardModalSelectItem, selectMoney === 10 ? styles.selected : null]}
                      onPress={() => this.selectMoney(10)}
                    >
                      <Text style={{ color: selectMoney === 10 ? Colors.themeColor : Colors.tintFontColor }}>
                        <Text style={styles.selectMoneyAmount}>10 </Text>
                        <Text style={{ fontSize: 14 }}>颗</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rewardModalSelect}>
                    <TouchableOpacity
                      style={[styles.rewardModalSelectItem, selectMoney === 20 ? styles.selected : null]}
                      onPress={() => this.selectMoney(20)}
                    >
                      <Text style={{ color: selectMoney === 20 ? Colors.themeColor : Colors.tintFontColor }}>
                        <Text style={styles.selectMoneyAmount}>20 </Text>
                        <Text style={{ fontSize: 14 }}>颗</Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.rewardModalSelectItem, selectMoney === 50 ? styles.selected : null]}
                      onPress={() => this.selectMoney(50)}
                    >
                      <Text style={{ color: selectMoney === 50 ? Colors.themeColor : Colors.tintFontColor }}>
                        <Text style={styles.selectMoneyAmount}>50 </Text>
                        <Text style={{ fontSize: 14 }}>颗</Text>
                      </Text>
                    </TouchableOpacity>
                    {selectMoney ? (
                      <TouchableOpacity
                        style={[styles.rewardModalSelectItem, selectMoney === "自定义" ? styles.selected : null]}
                        onPress={this.emptySelectMoney}
                      >
                        <Text style={{ color: Colors.tintFontColor }}>
                          <Text style={{ fontSize: 16, fontWeight: "600" }}>自定义</Text>
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={[styles.rewardModalSelectItem, styles.selected]} onPress={this.emptySelectMoney}>
                        <TextInput
                          keyboardType="numeric"
                          style={[styles.rewardModalInput, { fontSize: 19, color: Colors.themeColor }]}
                          onChangeText={this.customMoney}
                          value={inputMoney + ""}
                          underlineColorAndroid="transparent"
                          autoFocus={true}
                          maxLength={5}
                          selectionColor={Colors.themeColor}
                          textAlign={"center"}
                        />
                        <Text style={{ fontSize: 14, color: Colors.themeColor, marginRight: 5 }}>颗</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={styles.rewardModalLeaveMessage}>
                  <Text style={styles.rewardModalText}>留言：</Text>
                  <TextInput
                    style={styles.rewardModalInput}
                    onChangeText={message => (this.message = message)}
                    defaultValue=""
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.rewardModalAmount}>
                  <Text style={{ fontSize: 20, color: Colors.themeColor, letterSpacing: 2 }}>
                    <Iconfont name={"RMB"} size={18} />
                    <Text>{amount || 0}</Text>
                  </Text>
                  <Text style={styles.paymentText}>
                    当前余额¥
                    {personal.balance}
                  </Text>
                  {/*
                    // 更换支付方式
                      <TouchableOpacity onPress={this.handlePaymentVisible}>
                        <Text style={{ fontSize: 15, color: Colors.linkColor }}>更换</Text>
                      </TouchableOpacity>
                  **/}
                </View>
                <View style={styles.rewardModalFooter}>
                  <Text
                    style={{ fontSize: 16, color: Colors.themeColor }}
                    onPress={() => {
                      if (personal.balance >= amount) {
                        if (amount < 1) {
                          this.handleWarningVisible("最少也给一颗糖果嘛~");
                        } else {
                          tipArticle({
                            variables: {
                              id: article.id,
                              amount: selectMoney ? selectMoney : inputMoney ? inputMoney : 0,
                              message: this.message
                            },
                            update: (cache, { data: { likeArticle } }) => {
                              handleVisible();
                              this.toast();
                            }
                          });
                        }
                      } else {
                        this.handleWarningVisible("抱歉，余额不足");
                      }
                    }}
                  >
                    确认支付
                  </Text>
                  <Text style={{ fontSize: 16, color: Colors.themeColor, marginRight: 20 }} onPress={handleVisible}>
                    取消
                  </Text>
                </View>
              </View>
              <PaymentModal visible={paymentVisible} handleVisible={this.handlePaymentVisible} />
              <BasicModal visible={warningVisible} handleVisible={() => this.handleWarningVisible("warn")} customStyle={styles.toastModal}>
                <View>
                  <Text style={styles.toastText}>{this.warning}</Text>
                </View>
              </BasicModal>
            </BasicModal>
          );
        }}
      </Mutation>
    );
  }

  handlePaymentVisible() {
    this.setState(prevState => ({ paymentVisible: !prevState.paymentVisible }));
  }

  handleWarningVisible(warn) {
    this.warning = warn;
    this.setState(
      prevState => ({ warningVisible: !prevState.warningVisible }),
      () => {
        setTimeout(() => {
          this.setState({ warningVisible: false });
        }, 2000);
      }
    );
  }

  selectMoney(money) {
    this.setState({ selectMoney: money, amount: money });
  }

  customMoney(value) {
    let newValue = "";
    let numbers = "0123456789";
    for (var i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newValue = newValue + value[i];
      }
    }
    this.setState({ inputMoney: newValue, amount: newValue });
  }

  emptySelectMoney() {
    let { inputMoney } = this.state;
    this.setState({ selectMoney: 0, amount: inputMoney });
  }

  rewardModalHeader() {
    let { balance } = this.props.personal;
    let { amount } = this.state;
    return (
      <View style={styles.rewardModalHeader}>
        <Text style={{ fontSize: 18, marginRight: 8, color: Colors.primaryFontColor }}>给作者送糖</Text>
        <Iconfont name={"gift"} size={20} color={Colors.themeColor} />
      </View>
    );
  }

  toast() {
    let toast = Toast.show("感谢您的支持(づ￣3￣)づ╭❤～", {
      duration: Toast.durations.LONG,
      position: 70,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 100,
      backgroundColor: Colors.nightColor
    });
    setTimeout(function() {
      Toast.hide(toast);
    }, 2500);
  }
}

const styles = StyleSheet.create({
  rewardModalHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  rewardModalSelect: {
    flexDirection: "row",
    marginHorizontal: -6
  },
  rewardModalSelectItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.tintBorderColor,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginHorizontal: 6
  },
  selectMoneyAmount: {
    fontSize: 20,
    fontWeight: "600"
  },
  selected: {
    borderColor: Colors.themeColor
  },
  rewardModalLeaveMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.skinColor,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 3,
    paddingLeft: 8
  },
  rewardModalText: {
    fontSize: 15,
    color: Colors.primaryFontColor
  },
  rewardModalInput: {
    flex: 1,
    height: 38,
    fontSize: 15,
    padding: 0,
    color: Colors.primaryFontColor
  },
  rewardModalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tintBorderColor
  },
  rewardModalFooter: {
    marginTop: 20,
    flexDirection: "row-reverse"
  },
  paymentText: {
    fontSize: 15,
    color: Colors.primaryFontColor,
    marginLeft: 10
  },
  toastModal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "auto",
    padding: 10
  },
  toastText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  }
});

export default connect(store => ({ personal: store.users.user }))(RewardModal);
