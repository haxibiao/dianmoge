import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import HTML from 'react-native-render-html';

import Screen from '../Screen';
import { Colors, Divice } from '../../constants';
import { Iconfont } from '../../utils/Fonts';
import PostHeader from '../post/PostHeader';
import BeSelectedCategory from './BeSelectedCategory';
import RewardPanel from '../post/RewardPanel';
import ArticleBottomTools from './ArticleBottomTools';
import Comments from './comment/Comments';
import AuthorCard from '../../components/Card/AuthorCard';
import { RewardModal, ShareModal, ImageView } from '../../components/Modal';
import { LoadingError, SpinnerLoading, BlankContent } from '../../components/Pure';

import { connect } from 'react-redux';
import actions from '../../store/actions';
import { Query, Mutation } from 'react-apollo';
import { articleQuery } from '../../graphql/article.graphql';

const IMG_WIDTH = Divice.width - 30;

class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.handleRewardVisible = this.handleRewardVisible.bind(this);
    this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
    this.toggleAddCommentVisible = this.toggleAddCommentVisible.bind(this);
    this.footOffsetY = Divice.height;
    this.commentsOffsetY = 0;
    this.commentsHeight = 0;
    this.initImage = 0; //图片预览模式下首先打开的图片索引
    this.state = {
      showWrite: false,
      addCommentVisible: false,
      rewardVisible: false,
      shareModalVisible: false,
      imageViewerVisible: false
    };
  }

  render() {
    let { showWrite, rewardVisible, addCommentVisible, shareModalVisible, imageViewerVisible } = this.state;
    let { navigation, login } = this.props;
    const article = navigation.getParam('article', {});
    return (
      <Screen header>
        <Query query={articleQuery} variables={{ id: article.id }}>
          {({ loading, error, data, refetch }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (loading) return <SpinnerLoading />;
            if (!(data && data.article)) return <BlankContent />;
            let article = data.article;
            this.pictures = []; //初始化pictures，同时也是防止重复render所以在此清空
            this.imgKey = 0; //初始化imgkey，同时也是防止重复render所以在此清空
            return (
              <View style={styles.container}>
                <PostHeader navigation={navigation} post={article} share={this.handleSlideShareMenu} login={login} type="article" />
                <ScrollView
                  style={styles.container}
                  onScroll={this._onScroll.bind(this)}
                  ref={ref => (this.scrollRef = ref)}
                  removeClippedSubviews={true}
                  keyboardShouldPersistTaps={'handled'}
                  scrollEventThrottle={16}
                >
                  <View style={{ padding: 20 }}>
                    <View>
                      <Text style={styles.title} NumberOfLines={2}>
                        {article.title}
                      </Text>
                    </View>
                    <View style={styles.articleInfo}>
                      <Text style={styles.articleInfoText}>
                        {article.time_ago + ' · 字数' + article.count_words + ' · 阅读' + article.hits + '  '}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 15 }}>
                    <HTML
                      html={article.body}
                      imagesMaxWidth={Divice.width}
                      baseFontStyle={{
                        fontSize: 15,
                        color: Colors.primaryFontColor
                      }}
                      tagsStyles={tagsStyles}
                      renderers={{
                        img: (htmlAttribs, children, passProps) => {
                          //往picture填充图片
                          this.pictures.push({
                            url: htmlAttribs.src
                          });
                          // 获取当前index
                          let index = this.imgKey;
                          this.imgKey++;
                          let width = htmlAttribs.width ? parseInt(htmlAttribs.width) : IMG_WIDTH;
                          let height = htmlAttribs.height ? parseInt(htmlAttribs.height) : IMG_WIDTH;
                          let size = imageSize({ width, height });
                          return (
                            <TouchableOpacity
                              activeOpacity={1}
                              key={index}
                              onPress={() => {
                                this.initImage = index;
                                this.setState({
                                  imageViewerVisible: true
                                });
                              }}
                              style={{ alignItems: 'center' }}
                            >
                              <Image
                                source={{ uri: htmlAttribs.src }}
                                style={{
                                  width: size.width, //TODO: will use htmlAttribs.width
                                  height: size.height, //TODO:图片的宽高比例可以由后台api计算好返回，这里先固定, will use htmlAttribs.height
                                  resizeMode: 'cover'
                                }}
                                {...passProps}
                              />
                            </TouchableOpacity>
                          );
                        },
                        hr: () => <View style={styles.hr} />
                      }}
                      alterNode={node => {
                        const { name, parent, children, data } = node;
                        node.attribs = { ...(node.attribs || {}), style: `marginLeft:${0};padding:${0};` };
                        return node;
                      }}
                    />
                  </View>
                  {
                    //内容底部
                    //被以下专题收入
                    //喜欢、分享
                    //赞赏面板
                    //作者卡片
                  }
                  <View style={styles.showFoot} onLayout={this._footOnLayout.bind(this)}>
                    <BeSelectedCategory categories={article.categories} navigation={navigation} />
                    <View style={{ marginHorizontal: -20, marginVertical: 15 }}>
                      <RewardPanel
                        navigation={navigation}
                        rewardUsers={article.tipedUsers}
                        rewardDescrib={article.user.tip_words}
                        handleRewardVisible={this.handleRewardVisible}
                      />
                    </View>
                    <AuthorCard user={article.user} navigation={navigation} />
                  </View>
                  <Comments
                    addCommentVisible={addCommentVisible}
                    article={article}
                    navigation={navigation}
                    onLayout={this._commentsOnLayout.bind(this)}
                    toggleCommentModal={this.toggleAddCommentVisible}
                  />
                </ScrollView>
                {/*文章底部工具**/}
                <ArticleBottomTools
                  rewards={article.count_tips}
                  comments={article.count_replies}
                  article={article}
                  showWrite={showWrite}
                  toggleCommentModal={this.toggleAddCommentVisible}
                  handleRewardVisible={this.handleRewardVisible}
                  handleSlideShareMenu={this.handleSlideShareMenu}
                  commentHandler={this._scrollToComments.bind(this)}
                  navigation={navigation}
                  login={login}
                />
                {/*赞赏模态框**/}
                <RewardModal visible={rewardVisible} handleVisible={this.handleRewardVisible} article={article} />
              </View>
            );
          }}
        </Query>
        {/*点击图片预览**/}
        <ImageView
          visible={imageViewerVisible}
          handleVisible={() => this.setState({ imageViewerVisible: false })}
          imageUrls={this.pictures}
          initImage={this.initImage}
        />
        <ShareModal visible={shareModalVisible} toggleVisible={this.handleSlideShareMenu} />
      </Screen>
    );
  }

  //赞赏模态框开关
  handleRewardVisible() {
    let { login, navigation } = this.props;
    if (login) {
      this.setState(prevState => ({ rewardVisible: !prevState.rewardVisible }));
    } else {
      navigation.navigate('登录注册');
    }
  }

  //评论模态框开关
  toggleAddCommentVisible() {
    let { login, navigation } = this.props;
    if (login) {
      this.setState(prevState => ({
        addCommentVisible: !prevState.addCommentVisible
      }));
    } else {
      navigation.navigate('登录注册');
    }
  }

  //获取文章底部到页面顶部的高度 控制底部输入框显示隐藏的临界点
  _footOnLayout(event) {
    let { x, y, width, height } = event.nativeEvent.layout;
    this.footOffsetY = y;
  }

  //获取评论区域到顶部的高度
  _commentsOnLayout(event) {
    let { y, height } = event.nativeEvent.layout;
    this.commentsOffsetY = y;
    this.commentsHeight = height;
  }

  //scrollView 滚动事件
  _onScroll(event) {
    let { y } = event.nativeEvent.contentOffset;
    if (y >= this.footOffsetY - Divice.height) {
      if (!this.state.showWrite) this.setState({ showWrite: true });
    } else {
      if (this.state.showWrite) this.setState({ showWrite: false });
    }
  }

  //滚动到评论顶部
  _scrollToComments = () => {
    if (this.commentsHeight >= Divice.height) {
      this.scrollRef.scrollTo({
        x: 0,
        y: this.commentsOffsetY,
        animated: true
      });
    } else {
      this.scrollRef.scrollToEnd({ animated: true });
    }
  };

  //分享slide
  handleSlideShareMenu() {
    this.setState(prevState => ({
      shareModalVisible: !prevState.shareModalVisible
    }));
  }
}

function imageSize({ width, height }) {
  var size = {};
  if (width > Divice.width) {
    size.width = Divice.width;
    size.height = Math.round((Divice.width * height) / width);
  } else {
    size = { width, height };
  }
  return size;
}

//html targets style
let tagsStyles = {
  a: { color: Colors.themeColor },
  p: {
    lineHeight: 21,
    marginBottom: 10
  },
  h1: {
    fontSize: 20,
    marginTop: 0,
    marginBottom: 10
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: Colors.darkFontColor
  },
  articleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  articleInfoText: {
    fontSize: 12,
    color: Colors.tintFontColor
  },
  showFoot: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  hr: { height: 1, backgroundColor: Colors.primaryBorderColor, marginTop: 10, marginBottom: 20 }
});

export default connect(store => {
  return {
    login: store.users.login
  };
})(DetailScreen);
