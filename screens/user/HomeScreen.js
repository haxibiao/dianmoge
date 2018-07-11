import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Image,
  Modal
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageViewer from "react-native-image-zoom-viewer";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { userOperationMiddleware } from "../../constants/Methods";
import PostItem from "../../components/Article/PostItem";
import { FollowButton, Button } from "../../components/Button";
import { Header, HeaderLeft, HeaderRight } from "../../components/Header";
import { RewardModal, OperationModal, ReportModal, ShareModal } from "../../components/Modal";

import { Avatar, BlankContent, LoadingError, SpinnerLoading, LoadingMore, ContentEnd } from "../../components/Pure";

import { connect } from "react-redux";
import { Query, Mutation, graphql, compose } from "react-apollo";
import { createChatMutation } from "../../graphql/chat.graphql";
import { userDetailQuery, blockUserMutation, blockedUsersQuery } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 70;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackdropVisible = this.handleBackdropVisible.bind(this);
    this.handleReportVisible = this.handleReportVisible.bind(this);
    this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
    this.state = {
      cover: "https://www.ainicheng.com/images/appicons/cover.jpg",
      fetchingMore: true,
      reportVisible: false,
      backdropVisible: false,
      avatarViewerVisible: false,
      shareModalVisible: false,
      offsetTop: new Animated.Value(0)
    };
  }

  render() {
    const { navigation, personal, login } = this.props;
    const user = navigation.getParam("user", {});
    const self = user.id == personal.id;
    let { fetchingMore, backdropVisible, reportVisible, avatarViewerVisible, shareModalVisible, offsetTop } = this.state;
    let headerTransparence = offsetTop.interpolate({
      inputRange: [0, HEADER_HEIGHT * 2],
      outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"],
      extrapolate: "clamp"
    });
    let lightHeaderOpacity = offsetTop.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    let darkHeaderOpacity = offsetTop.interpolate({
      inputRange: [HEADER_HEIGHT, HEADER_HEIGHT * 2],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    return (
      <Screen noPadding>
        <Query query={userDetailQuery} variables={{ id: user.id }}>
          {({ loading, error, data, refetch, fetchMore }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (!(data && data.user && data.articles)) return <SpinnerLoading />;
            let user = data.user;
            let articles = data.articles;
            return (
              <View style={styles.container}>
                <FlatList
                  bounces={false}
                  ListHeaderComponent={() => this._renderListHeader(user, self)}
                  data={articles}
                  refreshing={loading}
                  onRefresh={() => {
                    fetch();
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={Animated.event([
                    {
                      nativeEvent: { contentOffset: { y: offsetTop } }
                    }
                  ])}
                  renderItem={this._renderItem}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    if (articles) {
                      fetchMore({
                        variables: {
                          offset: articles.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!(fetchMoreResult && fetchMoreResult.articles && fetchMoreResult.articles.length > 0)) {
                            this.setState({
                              fetchingMore: false
                            });
                            return prev;
                          }
                          return Object.assign({}, prev, {
                            articles: [...prev.articles, ...fetchMoreResult.articles]
                          });
                        }
                      });
                    } else {
                      this.setState({
                        fetchingMore: false
                      });
                    }
                  }}
                  ListEmptyComponent={() => <BlankContent remind="TA还没有发布任何作品" />}
                  ListFooterComponent={() => {
                    if (articles.length < 1) return <View />;
                    return <View style={{ paddingBottom: 25, backgroundColor: "#fff" }}>{fetchingMore ? <LoadingMore /> : <ContentEnd />}</View>;
                  }}
                />
                <Animated.View style={[styles.header, { backgroundColor: headerTransparence }, avatarViewerVisible && { backgroundColor: "#000" }]}>
                  <Animated.View style={[styles.header, { opacity: lightHeaderOpacity }]}>
                    <Header
                      navigation={navigation}
                      routeName={user.name}
                      customStyle={styles.customStyle}
                      lightTabBar
                      rightComponent={this._headerRight("#fff", user, self)}
                    />
                  </Animated.View>
                  <Animated.View style={[styles.header, { opacity: darkHeaderOpacity }]}>
                    <Header
                      navigation={navigation}
                      customStyle={styles.customStyle}
                      leftComponent={
                        <HeaderLeft navigation={navigation} routeName={true}>
                          <View style={styles.layoutFlexRow}>
                            <Avatar size={28} uri={user.avatar} />
                            <Text style={[styles.tintText14, { marginLeft: 5 }]}>{user.name}</Text>
                          </View>
                        </HeaderLeft>
                      }
                      rightComponent={this._headerRight("#515151", user, self)}
                    />
                  </Animated.View>
                </Animated.View>
              </View>
            );
          }}
        </Query>
        <OperationModal
          visible={backdropVisible}
          operation={["更换背景"]}
          handleVisible={this.handleBackdropVisible}
          handleOperation={() => {
            //上传封面
            ImagePicker.openPicker({
              cropping: true
            })
              .then(image => {
                this.setState({
                  backdropVisible: false,
                  cover: image.path
                });
              })
              .catch(error => {});
          }}
        />
        <ReportModal visible={reportVisible} handleVisible={this.handleReportVisible} type="user" report={user} />
        <ShareModal visible={shareModalVisible} toggleVisible={this.handleSlideShareMenu} />
      </Screen>
    );
  }

  // 头部popover
  _headerRight = (color, user, self) => {
    let { login, navigation } = this.props;
    return (
      <HeaderRight
        color={color}
        options={self ? ["分享用户"] : ["分享用户", "举报用户", user.isBlocked ? "移除黑名单" : "加入黑名单"]}
        selectHandler={index => {
          switch (index) {
            case 0:
              navigation.navigate("个人介绍", { user });
              break;
            case 1:
              this.handleReportVisible();
              break;
            case 2:
              this.putBlacklist(user.id);
              break;
          }
        }}
      />
    );
  };

  // 个人信息
  _renderListHeader(user, self) {
    let { cover, avatarViewerVisible, shareModalVisible } = this.state;
    let { navigation } = this.props;
    return (
      <View>
        <TouchableWithoutFeedback onPress={self ? this.handleBackdropVisible : null}>
          <Image
            style={styles.backdrop}
            source={{
              uri: cover
            }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.userInfo}>
          <View style={[styles.layoutFlexRow, styles.baseInfo]}>
            <TouchableOpacity style={styles.userAvatar} onPress={() => this.setState({ avatarViewerVisible: true })}>
              <Avatar uri={user.avatar} size={86} borderStyle={{ borderWidth: 0 }} />
            </TouchableOpacity>
            {self ? (
              <View style={[styles.layoutFlexRow, styles.buttonGroup]}>
                <View style={{ width: 70 }}>
                  <Button name="编辑资料" outline handler={() => navigation.navigate("编辑个人资料")} />
                </View>
              </View>
            ) : (
              <View style={[styles.layoutFlexRow, styles.buttonGroup]}>
                <View style={{ width: 70, marginRight: 6 }}>
                  <FollowButton
                    customStyle={{ flex: 1, width: "auto" }}
                    theme={Colors.themeColor}
                    status={user.followed_status}
                    id={user.id}
                    type={"user"}
                    fontSize={14}
                  />
                </View>
                <View style={{ width: 70 }}>
                  <Button name="发信息" outline handler={() => this.chatting(user)} />
                </View>
              </View>
            )}
          </View>
          <View style={styles.userMetaInfo}>
            <View style={styles.layoutFlexRow}>
              <Text numberOfLines={1} style={styles.name}>
                {user.name}
              </Text>
              <Iconfont name={user.gender == 1 ? "girl" : "boy"} size={18} color={user.gender == 1 ? Colors.softPink : Colors.skyBlue} />
            </View>
            <TouchableOpacity style={[styles.layoutFlexRow, styles.userIntroduce]} onPress={() => navigation.navigate("个人介绍", { user })}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={styles.introduceText}>
                  简介: {user.introduction ? user.introduction : "本宝宝暂时还没想到个性签名"}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.layoutFlexRow}>
              <View style={styles.layoutFlexRow}>
                <Text style={styles.darkText16}>{user.count_likes}</Text>
                <Text style={styles.tintText16}>获赞</Text>
              </View>
              <TouchableOpacity style={[styles.layoutFlexRow, styles.metaLine]} onPress={() => navigation.navigate("关注", { user })}>
                <Text style={styles.darkText16}>{user.count_followings}</Text>
                <Text style={styles.tintText16}>关注</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.layoutFlexRow} onPress={() => navigation.navigate("粉丝", { user })}>
                <Text style={styles.darkText16}>{user.count_follows}</Text>
                <Text style={styles.tintText16}>粉丝</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.layoutFlexRow, styles.tabList]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("喜欢", { user })}>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/like.png")} style={styles.listItemImg} />
              <View>
                <Text style={styles.listItemName}>喜欢</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate("动态", {
                user,
                self
              })}
          >
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/actively.png")} style={styles.listItemImg} />
              <View>
                <Text style={styles.listItemName}>动态</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate("个人文集", {
                user
              })}
          >
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/collection.png")} style={styles.listItemImg} />
              <View>
                <Text style={styles.listItemName}>文集</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate("关注的专题和文集", {
                user
              })}
          >
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/category.png")} style={styles.listItemImg} />
              <View>
                <Text style={styles.listItemName}>兴趣</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Modal visible={avatarViewerVisible} transparent={true} onRequestClose={() => this.setState({ avatarViewerVisible: false })}>
          <ImageViewer
            onClick={() => this.setState({ avatarViewerVisible: false })}
            onSwipeDown={() => this.setState({ avatarViewerVisible: false })}
            imageUrls={[
              {
                url: user.avatar,
                width,
                height: width,
                resizeMode: "cover"
              }
            ]}
          />
        </Modal>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    return <PostItem post={item} toggleShareModal={this.handleSlideShareMenu} />;
  };

  _onScroll(event) {
    let { y } = event.nativeEvent.contentOffset;
    if (y >= 100) {
      this.tabBar.setNativeProps({
        style: {
          opacity: 1
        }
      });
      this.fixTabBar.setNativeProps({
        style: {
          opacity: 0
        }
      });
    } else {
      this.tabBar.setNativeProps({
        style: {
          opacity: 0
        }
      });
    }
  }

  // 举报模态框
  handleReportVisible() {
    let { login, navigation } = this.props;
    userOperationMiddleware({
      login,
      navigation,
      action: () => this.setState(prevState => ({ reportVisible: !prevState.reportVisible }))
    });
  }

  // 更换背景模态框
  handleBackdropVisible() {
    this.setState(prevState => ({ backdropVisible: !prevState.backdropVisible }));
  }

  // 分享模态框
  handleSlideShareMenu(post) {
    this.setState(prevState => ({
      shareModalVisible: !prevState.shareModalVisible
    }));
  }

  // 加入黑名单
  putBlacklist(id) {
    let { login, navigation, blockUserMutation } = this.props;
    userOperationMiddleware({
      login,
      navigation,
      action: () => {
        blockUserMutation({
          variables: {
            user_id: id
          },
          refetchQueries: result => [
            {
              query: blockedUsersQuery
            }
          ]
        });
        this.setState(prevState => ({
          isBlocked: !prevState.isBlocked
        }));
      }
    });
  }

  // 发信息
  chatting(user) {
    let { login, navigation } = this.props;
    userOperationMiddleware({
      login,
      navigation,
      action: () =>
        navigation.navigate("聊天页", {
          withUser: user
        })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  layoutFlexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  tintText16: {
    fontSize: 16,
    color: Colors.tintFontColor
  },
  tintText14: {
    fontSize: 14,
    color: Colors.tintFontColor
  },
  darkText16: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.darkFontColor,
    marginRight: 3
  },
  backdrop: {
    width,
    height: 160
  },
  userInfo: {
    paddingHorizontal: 15
  },
  baseInfo: {
    height: 60,
    justifyContent: "space-between"
  },
  tabList: {
    height: 80,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 6,
    borderColor: Colors.lightBorderColor
  },
  listItemImg: {
    width: 30,
    height: 30,
    resizeMode: "cover"
  },
  listItemName: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  userAvatar: {
    marginRight: 20,
    marginTop: -30,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 45
  },
  name: {
    fontSize: 20,
    color: Colors.darkFontColor,
    fontWeight: "500",
    marginRight: 5
  },
  userMetaInfo: {
    marginTop: 15
  },
  metaLine: {
    paddingHorizontal: 6,
    marginHorizontal: 6,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.lightBorderColor
  },
  userIntroduce: {
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightBorderColor
  },
  introduceText: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.tintFontColor
  },
  buttonGroup: {
    height: 30
  },
  header: {
    position: "absolute",
    width,
    height: HEADER_HEIGHT,
    paddingTop: 24
  },
  customStyle: { backgroundColor: "transparent", borderBottomColor: "transparent" }
});

export default connect(store => {
  return {
    personal: store.users.user,
    login: store.users.login
  };
})(compose(graphql(blockUserMutation, { name: "blockUserMutation" }))(HomeScreen));
