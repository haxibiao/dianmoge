import React from "react";
import { ScrollView, FlatList, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import { Iconfont } from "../../utils/Fonts";
import { ShareModal } from "../../components/Modal";
import UserTopInfo from "./UserTopInfo";
import { Header } from "../../components/Header";
import { DivisionLine, ContentEnd } from "../../components/Pure";
import Screen from "../Screen";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { withApollo } from "react-apollo";
import { userResourceCountQuery } from "../../graphql/user.graphql";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {
    // 请求数据更新 user resource
    let { users, client, dispatch } = this.props;
    if (users.user && users.user.id) {
      client
        .query({
          query: userResourceCountQuery,
          variables: {
            id: users.user.id
          }
        })
        .then(({ data }) => {
          dispatch(actions.updateUserResource(data.user));
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }

  render() {
    let { modalVisible } = this.state;
    const { navigation, users } = this.props;
    var { user, login } = users;
    return (
      <Screen>
        <View style={styles.container}>
          <Header navigation={navigation} goBack={false} setting search />
          <ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
            <UserTopInfo user={user} login={login} navigation={navigation} />
            {login && (
              <View style={styles.flowContainer}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("我的发布", { user })}>
                  <View style={styles.flowList}>
                    <Text style={styles.flowQuantity}>{user.count_articles || 0}</Text>
                    <Text style={styles.flowType}>发布</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("关注", { user })}>
                  <View style={styles.flowList}>
                    <Text style={styles.flowQuantity}>{user.count_followings || 0}</Text>
                    <Text style={styles.flowType}>关注</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("粉丝", { user })}>
                  <View style={styles.flowList}>
                    <Text style={styles.flowQuantity}>{user.count_followers || 0}</Text>
                    <Text style={styles.flowType}>粉丝</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <DivisionLine height={15} />
            <View style={styles.columnContainer}>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("私密作品")}>
                <View style={styles.columnItem}>
                  <Iconfont name={"lock"} size={20} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>私密作品</Text>
                  <Text style={styles.columnQuantity}>{user.count_drafts || ""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("我的收藏")}>
                <View style={styles.columnItem}>
                  <Iconfont name={"label"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>我的收藏</Text>
                  <Text style={styles.columnQuantity}>{user.count_favorites || ""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("喜欢", { user })}>
                <View style={styles.columnItem}>
                  <Iconfont name={"like"} size={18} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>我喜欢的</Text>
                  <Text style={styles.columnQuantity}>{user.count_likes || ""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("已购内容", { user })}>
                <View style={[styles.columnItem, styles.noBorder]}>
                  <Iconfont name={"diamond"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>已购内容</Text>
                  <Text style={styles.columnQuantity}>{user.purchased_content || ""}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <DivisionLine height={15} />
            <View style={styles.columnContainer}>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("个人专题", { user })}>
                <View style={styles.columnItem}>
                  <Iconfont name={"category"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>我的专题</Text>
                  <Text style={styles.columnQuantity}>{user.count_categories || ""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("个人文集", { user })}>
                <View style={styles.columnItem}>
                  <Iconfont name={"collection"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>我的文集</Text>
                  <Text style={styles.columnQuantity}>{user.count_collections || ""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("关注的专题和文集", { user })}>
                <View style={styles.columnItem}>
                  <Iconfont name={"followed"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>关注的专题/文集</Text>
                  <Text style={styles.columnQuantity}>{""}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateMiddlewear("我的钱包")}>
                <View style={[styles.columnItem, styles.noBorder]}>
                  <Iconfont name={"wallet"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>我的钱包</Text>
                </View>
              </TouchableOpacity>
            </View>
            <DivisionLine height={15} />
            <View style={styles.columnContainer}>
              <TouchableOpacity onPress={this.toggleModalVisible}>
                <View style={styles.columnItem}>
                  <Iconfont name={"share"} size={18} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>分享{Config.AppName}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("浏览记录")}>
                <View style={styles.columnItem}>
                  <Iconfont name={"time"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>浏览记录</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("常见帮助")}>
                <View style={styles.columnItem}>
                  <Iconfont name={"feedback"} size={18} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>帮助与反馈</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  null;
                }}
              >
                <View style={[styles.columnItem, styles.noBorder]}>
                  <Iconfont name={"star"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                  <Text style={styles.columnType}>给{Config.AppName}评分</Text>
                </View>
              </TouchableOpacity>
            </View>
            <DivisionLine height={15} />
          </ScrollView>
        </View>
        <ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
      </Screen>
    );
  }

  navigateMiddlewear(routeName, params) {
    let { navigation, users } = this.props;
    if (users.login) {
      navigation.navigate(routeName, { ...params });
    } else {
      navigation.navigate("登录注册", { login: true });
    }
  }

  toggleModalVisible() {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  flowContainer: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center"
  },
  flowList: {
    alignItems: "center"
  },
  flowQuantity: {
    fontSize: 18,
    color: Colors.primaryFontColor
  },
  flowType: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.tintFontColor
  },
  columnContainer: {
    paddingHorizontal: 15
  },
  columnItem: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  noBorder: {
    borderBottomWidth: 0
  },
  columnType: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    color: "#666"
  },
  columnQuantity: {
    fontSize: 13,
    color: Colors.tintFontColor
  }
});

export default connect(store => {
  return { users: store.users };
})(withApollo(HomeScreen));
