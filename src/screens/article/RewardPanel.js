import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions, ScrollView, FlatList } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import { Avatar, ContentEnd } from "../../components/Pure";
import UserListHorizontal from "../../components/User/UserListHorizontal";
import { SlideInUpModal } from "../../components/Modal";

const { width, height } = Dimensions.get("window");

class RewardPanel extends Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    const { rewardUsers, rewardDescrib, handleRewardVisible } = this.props;
    let { modalVisible } = this.state;
    return (
      <View style={{ alignItems: "center" }}>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.rewardDescrib}>{rewardDescrib || `小礼物走一走，来${Config.AppDisplayName}关注我`}</Text>
        </View>
        <TouchableOpacity style={styles.rewardButton} onPress={handleRewardVisible}>
          <Text style={styles.rewardButtonText}>赞赏支持</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rewardUsers} onPress={this.toggleVisible}>
          <UserListHorizontal users={rewardUsers} radius={18} />
          {rewardUsers.length > 6 && (
            <Text
              style={{
                fontSize: 14,
                color: Colors.tintFontColor,
                marginHorizontal: 6
              }}
            >
              等{rewardUsers.length}人
            </Text>
          )}
          {rewardUsers.length > 6 && <Iconfont name={"right"} size={13} color={Colors.tintFontColor} />}
        </TouchableOpacity>
        <SlideInUpModal visible={modalVisible} toggleVisible={this.toggleVisible}>
          <FlatList
            style={{ height: height * 0.6 }}
            data={rewardUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._rewardUserItem.bind(this)}
            ListFooterComponent={() => <ContentEnd />}
          />
        </SlideInUpModal>
      </View>
    );
  }

  _rewardUserItem({ item, index }) {
    let { navigation } = this.props;
    let user = item;
    return (
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 20,
          height: 90,
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightBorderColor
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/*关闭当前slideMenu并且跳转页面**/}
          <TouchableOpacity
            onPress={() => {
              this.toggleVisible();
              navigation.navigate("用户详情", { user });
            }}
          >
            <Avatar uri={user.avatar} size={36} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View>
              <Text numberOfLines={1} style={{ fontSize: 16, color: "#666" }}>
                {user.name} 赞赏了文章
              </Text>
            </View>
            {user.leave_message && (
              <View style={{ marginTop: 8 }}>
                <Text numberOfLines={1} style={{ fontSize: 12, color: Colors.lightFontColor }}>
                  {user.leave_message}
                </Text>
              </View>
            )}
            <View style={{ marginTop: 8 }}>
              <Text numberOfLines={1} style={{ fontSize: 13, color: "#969696" }}>
                {user.time_ago}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  toggleVisible() {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  }
}

const styles = StyleSheet.create({
  rewardDescrib: {
    fontSize: 17,
    lineHeight: 23,
    color: Colors.primaryFontColor,
    textAlign: "center"
  },
  rewardButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: Colors.themeColor,
    borderRadius: 4
  },
  rewardButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff"
  },
  rewardUsers: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  }
});

export default RewardPanel;
