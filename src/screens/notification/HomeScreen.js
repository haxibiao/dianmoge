import React from "react";
import { ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, RefreshControl } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Divice } from "../../constants";
import { Header } from "../../components/Header";
import { Avatar, DivisionLine, ContentEnd, Badge, LoadingError, SpinnerLoading, Diving } from "../../components/Pure";
import Screen from "../Screen";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { unreadsQuery } from "../../graphql/notification.graphql";
import { chatsQuery } from "../../graphql/chat.graphql";
import { Query, withApollo } from "react-apollo";

let { width, height } = Dimensions.get("window");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
    this.count_unreads = 0;
  }

  syncUnreads = () => {
    const { dispatch } = this.props;
    dispatch(actions.updateUnreads(this.count_unreads));
  };

  // 更新通知badge
  updateUnreads = unreads => {
    let count;
    // Todo: unread_tips隐藏了
    let keys = ["unread_comments", "unread_likes", "unread_follows", "unread_requests", "unread_others"];
    keys.reduce((result, elem) => {
      let number = unreads[elem] ? unreads[elem] : 0;
      count = result + parseInt(number);
      return count;
    }, 0);
    this.count_unreads = count;
    setTimeout(this.syncUnreads, 0);
  };

  componentWillUpdate(nextProps, nextState) {
    this.props.client.query({
      query: unreadsQuery,
      fetchPolicy: "network-only"
    });
  }

  render() {
    let { refreshing } = this.state;
    const { navigation, login, user } = this.props;

    return (
      <Screen header customStyle={{ paddingTop: Divice.STATUSBAR_HEIGHT }}>
        <ScrollView
          style={styles.container}
          removeClippedSubviews={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
        >
          <View style={styles.menuWrap}>
            <Query query={unreadsQuery} pollInterval={10000}>
              {({ loading, error, data, stopPolling }) => {
                if (error || !data || !data.user || !login) {
                  data = {};
                  data.user = {};
                }
                if (!login) {
                  stopPolling();
                }
                if (data && data.user && login) {
                  this.updateUnreads(data.user);
                }
                return (
                  <View style={styles.menuList}>
                    {this._renderMessageMenu({
                      name: "评论",
                      iconName: "comment",
                      unreads: data.user.unread_comments
                    })}
                    {this._renderMessageMenu({
                      name: "喜欢和赞",
                      iconName: "like",
                      unreads: data.user.unread_likes
                    })}
                    {this._renderMessageMenu({
                      name: "新的关注",
                      iconName: "follow-person",
                      unreads: data.user.unread_follows
                    })}
                    {this._renderMessageMenu({
                      name: "投稿请求",
                      iconName: "contribute",
                      unreads: data.user.unread_requests
                    })}
                    {
                      // 隐藏功能
                      // this._renderMessageMenu({
                      // name: "赞赏和付费",
                      // iconName: "coin",
                      // unreads: data.user.unread_tips
                      // })
                    }
                    {// 替补
                    this._renderMessageMenu({
                      name: "全部关注",
                      iconName: "star",
                      unreads: 0
                    })}
                    {this._renderMessageMenu({
                      name: "其它提醒",
                      iconName: "more",
                      unreads: data.user.unread_others
                    })}
                  </View>
                );
              }}
            </Query>
          </View>
          <DivisionLine height={18} />
          <View style={styles.chatsTitle}>
            <Text style={styles.chatsTitleText}>消息</Text>
            <TouchableOpacity
              onPress={() => {
                if (login) {
                  navigation.navigate("新消息");
                } else {
                  navigation.navigate("登录注册");
                }
              }}
            >
              <Text style={[styles.chatsTitleText, { color: Colors.themeColor }]}>新消息</Text>
            </TouchableOpacity>
          </View>
          <Query query={chatsQuery} pollInterval={10000}>
            {({ loading, error, data, refetch, stopPolling }) => {
              if (!login) {
                stopPolling();
                return this._emptyComponent();
              }
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.user && data.user.chats && data.user.chats.length > 0)) {
                return this._emptyComponent();
              }
              return (
                <View>
                  {data.user.chats.map((elem, index) => {
                    return this._renderChatItem({ item: elem, index });
                  })}
                  <ContentEnd />
                </View>
              );
            }}
          </Query>
        </ScrollView>
      </Screen>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    let _this = this;
    Promise.all([this.props.client.query({ query: unreadsQuery }), this.props.client.query({ query: chatsQuery })])
      .then(fulfilled => {
        this.setState({
          refreshing: false
        });
      })
      .catch(rejected => {
        this.setState({ refreshing: false });
        console.log(rejected);
      });
  };

  _keyExtractor = (item, index) => (item.key ? item.key : index.toString());

  _renderMessageMenu = item => {
    let { user, login } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ width: (width - 30) / 3 }}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            if (login) {
              navigate(item.name, { user });
            } else {
              navigate("登录注册");
            }
          }}
        >
          <View style={{ position: "relative" }}>
            <Iconfont name={item.iconName} size={24} color={Colors.themeColor} style={{ marginBottom: 6 }} />
            <View style={styles.badge}>
              <Badge radius={9} count={item.unreads} />
            </View>
          </View>
          <Text style={styles.menuName}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderChatItem = ({ item, index }) => {
    const { navigate } = this.props.navigation;
    let chat = item;
    return (
      <View style={styles.chatItem} key={index}>
        <TouchableOpacity style={styles.chatUser} onPress={() => navigate("用户详情", { user: chat.withUser })}>
          <Avatar uri={chat.withUser.avatar} size={32} />
          <View style={styles.chatBadge}>
            <Badge radius={9} count={chat.unreads} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatContent} onPress={() => navigate("聊天页", { chat })}>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>{chat.withUser.name}</Text>
            <Text style={styles.chatTime}>{chat.updated_at}</Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.chatmessage}>
              {chat.lastMessage ? chat.lastMessage.message : " "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _emptyComponent = () => {
    return (
      <View style={styles.emptyWrap}>
        <View style={styles.divingWrap}>
          <Iconfont name="diving" size={50} color="#fff" />
        </View>
        <View>
          <Text style={styles.emptyText}>还没有消息哦，快去找朋友聊天吧</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  menuWrap: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10
  },
  menuList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  menuItem: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center"
  },
  menuName: {
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  badge: {
    position: "absolute",
    top: -14,
    right: -14
  },
  chatsTitle: {
    height: 40,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tintBorderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  chatsTitleText: {
    fontSize: 16,
    color: Colors.primaryFontColor
  },
  chatItem: {
    paddingTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  chatUser: {
    paddingTop: 10,
    paddingRight: 10,
    marginTop: -10
  },
  chatBadge: {
    position: "absolute",
    top: 2,
    right: 2
  },
  chatContent: {
    flex: 1,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  chatInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chatName: {
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  chatTime: {
    fontSize: 11,
    color: Colors.tintFontColor
  },
  chatmessage: {
    fontSize: 12,
    marginTop: 8,
    color: Colors.tintFontColor
  },
  emptyWrap: {
    marginTop: 30,
    flex: 1,
    backgroundColor: Colors.skinColor,
    justifyContent: "center",
    alignItems: "center"
  },
  divingWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.darkGray,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontSize: 15,
    color: Colors.tintFontColor,
    marginTop: 30
  }
});

export default connect(store => ({ user: store.users.user, login: store.users.login }))(withApollo(HomeScreen));
