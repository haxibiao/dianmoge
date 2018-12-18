import React from "react";
import { ScrollView, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import { Colors, Config, Divice } from "../../constants";
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
      modalVisible: false,
      Counts: props.user
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    this.didFocusSubscription = navigation.addListener("didFocus", payload => {
      let { user, client, dispatch } = this.props;
      if (user && user.id) {
        client
          .query({
            query: userResourceCountQuery,
            variables: {
              id: user.id
            },
            fetchPolicy: "network-only"
          })
          .then(({ data }) => {
            this.setState({ Counts: data.user });
            // dispatch(actions.updateUserResource(data.user));
          })
          .catch(error => {
            console.log("error", error);
          });
      }
    });
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  render() {
    let { modalVisible, Counts } = this.state;
    const { navigation, user, login } = this.props;
    return (
      <Screen header customStyle={{ paddingTop: Divice.STATUSBAR_HEIGHT }}>
        <ScrollView style={styles.container} bounces={false}>
          <UserTopInfo user={user} login={login} navigation={navigation} />
          <View style={styles.itemContainer}>
            <View style={styles.columnContainer}>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("我的发布", { user })}>
                <Text style={styles.countFont}>{Counts.count_production || 0}</Text>
                <Text style={styles.rowsType1}>发布</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("全部关注", { user })}>
                <Text style={styles.countFont}>{Counts.count_followings || 0}</Text>
                <Text style={styles.rowsType1}>关注</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("粉丝", { user })}>
                <Text style={styles.countFont}>{Counts.count_followers || 0}</Text>
                <Text style={styles.rowsType1}>粉丝</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.columnContainer}>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("私密作品")}>
                <Iconfont name={"lock"} size={26} color={Colors.tintColor} style={{ marginTop: -1 }} />
                <Text style={styles.rowsType2}>私密</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("我的收藏")}>
                <Iconfont name={"star-fill"} size={26} color={Colors.qqzoneColor} style={{ marginTop: -1 }} />
                <Text style={styles.rowsType2}>收藏</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowsItem} onPress={() => this.navigateMiddlewear("喜欢", { user })}>
                <Iconfont name={"like-fill"} size={24} color={Colors.weiboColor} />
                <Text style={styles.rowsType2}>喜欢</Text>
              </TouchableOpacity>
            </View>
            <DivisionLine style={{ height: 15, marginTop: -1, marginHorizontal: -15 }} />
            <TouchableOpacity onPress={() => this.navigateMiddlewear("浏览记录")}>
              <View style={styles.columnItem}>
                <Iconfont name={"time-fill"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                <Text style={styles.columnType}>浏览记录</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateMiddlewear("意见反馈")}>
              <View style={styles.columnItem}>
                <Iconfont name={"feedback"} size={18} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                <Text style={styles.columnType}>意见反馈</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("设置")}>
              <View style={styles.columnItem}>
                <Iconfont name={"fill-setting"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
                <Text style={styles.columnType}>设置</Text>
              </View>
            </TouchableOpacity>
            {
              // <TouchableOpacity onPress={() => this.navigateMiddlewear("我的钱包")}>
              //   <View style={styles.columnItem}>
              //     <Iconfont name={"wallet"} size={19} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
              //     <Text style={styles.columnType}>我的钱包</Text>
              //   </View>
              // </TouchableOpacity>
              // <TouchableOpacity onPress={this.toggleModalVisible}>
              //   <View style={styles.columnItem}>
              //     <Iconfont name={"share-fill"} size={18} style={{ width: 20, height: 20, textAlign: "center" }} color={Colors.tintFontColor} />
              //     <Text style={styles.columnType}>分享{Config.AppDisplayName}</Text>
              //   </View>
              // </TouchableOpacity>
            }
          </View>
        </ScrollView>
        <ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
      </Screen>
    );
  }

  navigateMiddlewear(routeName, params) {
    let { navigation, login } = this.props;
    if (login) {
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
  itemContainer: {
    paddingHorizontal: 15
  },
  columnContainer: {
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  rowsItem: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowsType1: {
    fontSize: 14,
    color: Colors.tintFontColor
  },
  rowsType2: {
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  countFont: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.darkFontColor
  },
  columnItem: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  columnType: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    color: Colors.primaryFontColor
  }
});

export default connect(store => {
  return { user: store.users.user, login: store.users.login };
})(withApollo(HomeScreen));
