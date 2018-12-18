import React, { Component } from 'react';
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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

import Screen from '../Screen';
import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice, Methods } from '../../constants';
import PostItem from '../../components/Article/PostItem';
import { FollowButton, Button } from '../../components/Button';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { RewardModal, OperationModal, ReportModal, ShareModal } from '../../components/Modal';

import { DivisionLine, Avatar, BlankContent, LoadingError, SpinnerLoading, LoadingMore, ContentEnd } from '../../components/Pure';

import { connect } from 'react-redux';
import actions from '../../store/actions';
import { Query, Mutation, graphql, compose } from 'react-apollo';
import { createChatMutation } from '../../graphql/chat.graphql';
import { userDetailQuery, blockUserMutation, blockedUsersQuery } from '../../graphql/user.graphql';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackdropVisible = this.handleBackdropVisible.bind(this);
    this.handleReportVisible = this.handleReportVisible.bind(this);
    this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
    this.state = {
      cover: 'https://www.ainicheng.com/images/appicons/cover.jpg',
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
    const user = navigation.getParam('user', {});
    let user_id = user.id;

    //首页检测分享二维码的跳转场景
    if (!user.id) {
      user.id = navigation.getParam('qrcode_user_id', 0);
      //避免重复因为分享的二维码里识别直接进入的用户页,记录到storage
      // if (parseInt(personal.qrcode_user_id) != parseInt(user.id)) {
      //   this.props.dispatch(actions.qrcodeToUser(user.id));
      // }
    }

    const self = user.id == personal.id;
    let { fetchingMore, backdropVisible, reportVisible, avatarViewerVisible, shareModalVisible, offsetTop } = this.state;
    let headerTransparence = offsetTop.interpolate({
      inputRange: [0, Divice.HEADER_HEIGHT * 2],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: 'clamp'
    });
    let lightHeaderOpacity = offsetTop.interpolate({
      inputRange: [0, Divice.HEADER_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    let darkHeaderOpacity = offsetTop.interpolate({
      inputRange: [Divice.HEADER_HEIGHT, Divice.HEADER_HEIGHT * 2],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <Screen header>
        <Query query={userDetailQuery} variables={{ id: user.id }} fetchPolicy="network-only">
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
                  scrollEventThrottle={16}
                  onScroll={Animated.event([
                    {
                      nativeEvent: { contentOffset: { y: offsetTop } }
                    }
                  ])}
                  renderItem={this._renderItem}
                  onEndReachedThreshold={0.8}
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
                    return fetchingMore ? <LoadingMore /> : <ContentEnd />;
                  }}
                />
                <Animated.View style={[styles.header, { backgroundColor: headerTransparence }, avatarViewerVisible && { backgroundColor: '#000' }]}>
                  <Animated.View style={[styles.header, { opacity: lightHeaderOpacity }]}>
                    <Header lightBar routeName rightComponent={this._headerRight(user, self, '#fff')} />
                  </Animated.View>
                  <Animated.View style={[styles.header, { opacity: darkHeaderOpacity }]}>
                    <Header
                      customStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}
                      leftComponent={
                        <HeaderLeft>
                          <View style={styles.layoutFlexRow}>
                            <Avatar size={28} uri={user.avatar} />
                            <Text style={[styles.tintText14, { marginLeft: 5 }]}>{user.name}</Text>
                            <FollowButton id={user.id} type={'user'} customStyle={styles.followButton} status={user.followed_status} />
                          </View>
                        </HeaderLeft>
                      }
                      centerComponent
                      rightComponent={this._headerRight(user, self)}
                    />
                  </Animated.View>
                </Animated.View>
              </View>
            );
          }}
        </Query>
        <OperationModal
          visible={backdropVisible}
          operation={['更换背景']}
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
  _headerRight = (user, self, color = Colors.primaryFontColor) => {
    if (self) {
      return null;
    }
    let { login, navigation } = this.props;
    return (
      <HeaderRight
        color={color}
        options={['举报用户', user.isBlocked ? '移除黑名单' : '加入黑名单', '分享用户']}
        selectHandler={index => {
          switch (index) {
            case 0:
              this.handleReportVisible();
              break;
            case 1:
              this.putBlacklist(user.id);
              break;
            case 2:
              console.log('分享个人介绍页');
              this.shareUser(user);
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
            <TouchableOpacity style={styles.userAvatarWrap} onPress={() => this.setState({ avatarViewerVisible: true })}>
              <Image
                style={styles.userAvatar}
                source={{
                  uri: user.avatar
                }}
              />
            </TouchableOpacity>
            {self ? (
              <View style={[styles.layoutFlexRow, styles.buttonGroup]}>
                <View style={{ width: 72 }}>
                  <Button fontSize={14} name="编辑资料" outline handler={() => navigation.navigate('编辑个人资料')} />
                </View>
              </View>
            ) : (
              <View style={[styles.layoutFlexRow, styles.buttonGroup]}>
                <View style={{ marginRight: 6 }}>
                  <FollowButton theme={Colors.themeColor} status={user.followed_status} id={user.id} type={'user'} />
                </View>
                <View style={{ width: 72 }}>
                  <Button fontSize={14} name="发信息" outline handler={() => this.chatting(user)} />
                </View>
              </View>
            )}
          </View>
          <View>
            <View style={styles.layoutFlexRow}>
              <Text numberOfLines={1} style={styles.name}>
                {user.name}
              </Text>
              <Iconfont name={user.gender == 1 ? 'girl' : 'boy'} size={17} color={user.gender == 1 ? Colors.girl : Colors.boy} />
            </View>
            <View style={styles.userIntroduce}>
              <Text numberOfLines={2} style={styles.introduceText}>
                {user.introduction ? user.introduction : '本宝宝暂时还没想到个性签名~'}
              </Text>
            </View>
            <View style={styles.layoutFlexRow}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.darkText15}>{user.count_likes || 0}</Text>
                <Text style={styles.tintText12}>获赞</Text>
              </View>
              <TouchableOpacity
                style={[{ flexDirection: 'row', alignItems: 'baseline' }, styles.metaLine]}
                onPress={() => navigation.navigate('全部关注', { user })}
              >
                <Text style={styles.darkText15}>{user.count_followings || 0}</Text>
                <Text style={styles.tintText12}>关注</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'baseline' }} onPress={() => navigation.navigate('粉丝', { user })}>
                <Text style={styles.darkText15}>{user.count_follows || 0}</Text>
                <Text style={styles.tintText12}>粉丝</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DivisionLine />
        {
          // <View style={[styles.layoutFlexRow, styles.tabList]}>
          //   <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("喜欢", { user })}>
          //     <View style={{ alignItems: "center" }}>
          //       <Image source={require("../../assets/images/like.png")} style={styles.listItemImg} />
          //       <View>
          //         <Text style={styles.listItemName}>喜欢</Text>
          //       </View>
          //     </View>
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     style={{ flex: 1 }}
          //     onPress={() =>
          //       navigation.navigate("动态", {
          //         user,
          //         self
          //       })
          //     }
          //   >
          //     <View style={{ alignItems: "center" }}>
          //       <Image source={require("../../assets/images/actively.png")} style={styles.listItemImg} />
          //       <View>
          //         <Text style={styles.listItemName}>动态</Text>
          //       </View>
          //     </View>
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     style={{ flex: 1 }}
          //     onPress={() =>
          //       navigation.navigate("个人文集", {
          //         user
          //       })
          //     }
          //   >
          //     <View style={{ alignItems: "center" }}>
          //       <Image source={require("../../assets/images/collection.png")} style={styles.listItemImg} />
          //       <View>
          //         <Text style={styles.listItemName}>文集</Text>
          //       </View>
          //     </View>
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     style={{ flex: 1 }}
          //     onPress={() =>
          //       navigation.navigate("关注的专题和文集", {
          //         user
          //       })
          //     }
          //   >
          //     <View style={{ alignItems: "center" }}>
          //       <Image source={require("../../assets/images/category.png")} style={styles.listItemImg} />
          //       <View>
          //         <Text style={styles.listItemName}>兴趣</Text>
          //       </View>
          //     </View>
          //   </TouchableOpacity>
          // </View>
        }
        <Modal visible={avatarViewerVisible} transparent={true} onRequestClose={() => this.setState({ avatarViewerVisible: false })}>
          <ImageViewer
            onClick={() => this.setState({ avatarViewerVisible: false })}
            onSwipeDown={() => this.setState({ avatarViewerVisible: false })}
            imageUrls={[
              {
                url: user.avatar,
                width: Divice.width,
                height: Divice.width,
                resizeMode: 'cover'
              }
            ]}
          />
        </Modal>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    return <PostItem post={item} toggleShareModal={this.handleSlideShareMenu} popover={false} />;
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
    Methods.userOperationMiddleware({
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

  shareUser(user) {
    let { navigation } = this.props;
    navigation.navigate('个人介绍', { user });
  }

  // 加入黑名单
  putBlacklist(id) {
    let { login, navigation, blockUserMutation } = this.props;
    Methods.userOperationMiddleware({
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
      }
    });
  }

  // 发信息
  chatting(user) {
    let { login, navigation } = this.props;
    Methods.userOperationMiddleware({
      login,
      navigation,
      action: () =>
        navigation.navigate('聊天页', {
          withUser: user
        })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  layoutFlexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tintText12: {
    fontSize: 12,
    color: Colors.tintFontColor
  },
  tintText14: {
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  darkText15: {
    fontSize: 15,
    color: Colors.darkFontColor,
    marginRight: 4
  },
  backdrop: {
    width: Divice.width,
    height: 160
  },
  customHeaderStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0
  },
  headerUserName: {
    fontSize: 14,
    color: Colors.primaryFontColor,
    marginLeft: 10
  },
  followButton: {
    width: 'auto',
    paddingHorizontal: 10,
    height: 26,
    marginLeft: 10,
    borderRadius: 13
  },
  userInfo: {
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  baseInfo: {
    justifyContent: 'space-between',
    marginBottom: 10
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
    resizeMode: 'cover'
  },
  listItemName: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.primaryFontColor
  },
  userAvatarWrap: {
    marginRight: 20,
    marginTop: -25
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#fff'
  },
  name: {
    fontSize: 19,
    lineHeight: 19,
    color: Colors.darkFontColor,
    marginRight: 6
  },
  metaLine: {
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.lightBorderColor
  },
  userIntroduce: {
    flex: 1,
    marginVertical: 10
  },
  introduceText: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.primaryFontColor
  },
  buttonGroup: {
    height: 30
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Divice.HEADER_HEIGHT
  }
});

export default connect(store => {
  return {
    personal: store.users.user,
    login: store.users.login
  };
})(compose(graphql(blockUserMutation, { name: 'blockUserMutation' }))(HomeScreen));
