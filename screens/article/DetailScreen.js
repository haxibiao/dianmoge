import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, Dimensions, FlatList, Modal, StatusBar } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import HTML from "react-native-render-html";

import Screen from "../Screen";
import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import ArticleDetailHeader from "./ArticleDetailHeader";
import BeSelectedCategory from "./BeSelectedCategory";
import MetaBottom from "./MetaBottom";
import RewardPanel from "./RewardPanel";
import ArticleBottomTools from "./ArticleBottomTools";
import Comments from "./comment/Comments";
import { UserGroup } from "../../components/MediaGroup";
import AuthorCard from "../../components/Card/AuthorCard";
import { RewardModal, AddCommentModal, ReplyCommentModal, ShareModal } from "../../components/Modal";
import { LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation } from "react-apollo";
import { articleQuery } from "../../graphql/article.graphql";
import { commentsQuery, addCommentMutation } from "../../graphql/comment.graphql";

const { width, height } = Dimensions.get("window");

let css_fix = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    </head>
    <body>
    <style>
    article {
      word-break: break-all!important;
      font-size: 20px;
      line-height: 30px;
    }
    article img {
      max-width: 100%;
      height: auto;
    }
    </style>`;

//必须用onload, 不然计算图片高度不准确
let js_fix = `
  <script>
      window.onload = function() {
        document.title = document.body.offsetHeight;
        window.location.hash = 1;
      }
  </script>
  </body>
  </html>
`;

class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.handleRewardVisible = this.handleRewardVisible.bind(this);
    this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
    this.state = {
      article: props.navigation.state.params.article,
      footOffsetHeight: height,
      commentsOffsetHeight: height,
      showWrite: false,
      replyCommentVisible: false,
      addCommentVisible: false,
      rewardVisible: false,
      shareModalVisible: false,
      reply: false,
      replyingComment: null, //回复的comment
      imageViewerVisible: false,
      initImage: 0
    };
  }

  render() {
    let {
      replyingComment,
      showWrite,
      rewardVisible,
      replyCommentVisible,
      addCommentVisible,
      shareModalVisible,
      imageViewerVisible,
      initImage
    } = this.state;
    const { article = {} } = this.state;
    let { navigation, login } = this.props;

    return (
      <Screen>
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
                <StatusBar backgroundColor={imageViewerVisible ? "#000" : "#fff"} barStyle={"dark-content"} />
                <ArticleDetailHeader navigation={navigation} article={article} share={this.handleSlideShareMenu} login={login} />
                <ScrollView
                  style={styles.container}
                  onScroll={this._onScroll.bind(this)}
                  ref={ref => (this.scrollRef = ref)}
                  removeClippedSubviews={true}
                >
                  <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <View>
                      <Text style={styles.title} NumberOfLines={2}>
                        {article.title}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                      <UserGroup navigation={navigation} customStyle={{ avatar: 34, nameSize: 15 }} user={article.user} plain />
                    </View>
                    <View style={styles.articleInfo}>
                      <Text style={styles.articleInfoText}>{article.time_ago + " · 字数" + article.count_words + " · 阅读" + article.hits + "  "}</Text>
                      {article.collection && <Iconfont name={"collection-two"} style={styles.articleInfoText} />}
                      <Text style={styles.articleInfoText}>{article.collection && article.collection.name}</Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 15 }}>
                    <HTML
                      html={article.body}
                      imagesMaxWidth={width}
                      renderers={{
                        img: (htmlAttribs, children, passProps) => {
                          //往picture填充图片
                          this.pictures.push({
                            url: htmlAttribs.src
                          });
                          // 获取当前index
                          let index = this.imgKey;
                          this.imgKey++;
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                this.setState({
                                  imageViewerVisible: true,
                                  initImage: index
                                });
                              }}
                            >
                              <Image
                                source={{ uri: htmlAttribs.src }}
                                style={{
                                  marginLeft: -15,
                                  width, //TODO: will use htmlAttribs.width
                                  height: 200, //TODO:图片的宽高比例可以由后台api计算好返回，这里先固定, will use htmlAttribs.height
                                  resizeMode: "cover"
                                }}
                                {...passProps}
                              />
                            </TouchableOpacity>
                          );
                        }
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
                    <MetaBottom login={login} navigation={navigation} article={article} handleSlideShareMenu={this.handleSlideShareMenu} />
                    <RewardPanel
                      navigation={navigation}
                      rewardUsers={article.tipedUsers}
                      rewardDescrib={article.user.tip_words}
                      handleRewardVisible={this.handleRewardVisible}
                    />
                    <AuthorCard user={article.user} navigation={navigation} />
                  </View>
                  <View style={{ height: 8, backgroundColor: Colors.lightGray }} />
                  {/*评论中心**/}
                  <Comments
                    article={article}
                    navigation={navigation}
                    onLayout={this._commentsOnLayout.bind(this)}
                    toggleCommentModal={() => this.toggleAddCommentVisible()}
                    toggleReplyComment={comment => {
                      if (login) {
                        this.setState(prevState => ({
                          replyCommentVisible: !prevState.replyCommentVisible,
                          replyingComment: comment
                        }));
                      } else {
                        navigation.navigate("登录注册");
                      }
                    }}
                  />
                </ScrollView>
                {/*文章底部工具**/}
                <ArticleBottomTools
                  rewards={article.count_tips}
                  comments={article.count_replies}
                  article={article}
                  showWrite={showWrite}
                  toggleCommentModal={() => this.toggleAddCommentVisible()}
                  handleRewardVisible={this.handleRewardVisible}
                  handleSlideShareMenu={this.handleSlideShareMenu}
                  commentHandler={this._scrollToComments.bind(this)}
                  navigation={navigation}
                  login={login}
                />
                {/*赞赏模态框**/}
                <RewardModal visible={rewardVisible} handleVisible={this.handleRewardVisible} article={article} />
                {/*添加评论**/}
                <Mutation mutation={addCommentMutation}>
                  {addComment => {
                    return (
                      <AddCommentModal
                        article={article}
                        visible={addCommentVisible}
                        toggleCommentModal={() => this.toggleAddCommentVisible()}
                        addComment={({ body }) => {
                          if (!body) return null;
                          addComment({
                            variables: {
                              commentable_id: article.id,
                              body
                            },
                            refetchQueries: addComment => [
                              {
                                query: commentsQuery,
                                variables: {
                                  article_id: article.id,
                                  order: "LATEST_FIRST",
                                  filter: "ALL"
                                }
                              }
                            ],
                            update: (cache, { data: { addComment } }) => {
                              let data = cache.readQuery({
                                query: articleQuery,
                                variables: { id: article.id }
                              });
                              let prev_article = data.article;
                              cache.writeQuery({
                                query: articleQuery,
                                variables: { id: article.id },
                                data: {
                                  article: Object.assign({}, prev_article, {
                                    count_replies: prev_article.count_replies + 1
                                  })
                                }
                              });
                            }
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
                {/*回复评论**/}
                <Mutation mutation={addCommentMutation}>
                  {replyComment => {
                    return (
                      <ReplyCommentModal
                        visible={replyCommentVisible}
                        toggleReplyComment={() => {
                          if (login) {
                            this.setState(prevState => ({
                              replyCommentVisible: !prevState.replyCommentVisible
                            }));
                          } else {
                            navigation.navigate("登录注册");
                          }
                        }}
                        replyingComment={this.state.replyingComment}
                        atUser={this.state.replyingComment ? this.state.replyingComment.user : null}
                        replyComment={({ body, replyingComment, atUser }) => {
                          //验证是否为空
                          if (!(body.length > atUser.name.length + 2)) return null;
                          replyComment({
                            variables: {
                              commentable_id: article.id,
                              body,
                              comment_id: replyingComment.id,
                              at_uid: atUser.id
                            },
                            refetchQueries: addComment => [
                              {
                                query: commentsQuery,
                                variables: {
                                  article_id: article.id,
                                  order: "LATEST_FIRST",
                                  filter: "ALL"
                                }
                              }
                            ]
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
              </View>
            );
          }}
        </Query>
        {/*点击图片预览**/}
        <Modal visible={imageViewerVisible} transparent={true} onRequestClose={() => this.setState({ imageViewerVisible: false })}>
          <ImageViewer
            onClick={() => this.setState({ imageViewerVisible: false })}
            onSwipeDown={() => this.setState({ imageViewerVisible: false })}
            imageUrls={this.pictures}
            index={initImage}
          />
        </Modal>
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
      navigation.navigate("登录注册");
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
      navigation.navigate("登录注册");
    }
  }

  //获取文章底部到页面顶部的高度 控制底部输入框显示隐藏的临界点
  _footOnLayout(event) {
    let { x, y, width, height } = event.nativeEvent.layout;
    this.setState({ footOffsetHeight: y });
  }

  //获取评论区域到顶部的高度
  _commentsOnLayout(event) {
    let { x, y, width, height } = event.nativeEvent.layout;
    this.setState({ commentsOffsetHeight: y });
  }

  //scrollView 滚动事件
  _onScroll(event) {
    let { y } = event.nativeEvent.contentOffset;
    if (y >= this.state.footOffsetHeight - height) {
      if (!this.state.showWrite) this.setState({ showWrite: true });
    } else {
      if (this.state.showWrite) this.setState({ showWrite: false });
    }
  }

  //滚动到评论顶部
  _scrollToComments() {
    this.scrollRef.scrollTo({
      x: 0,
      y: this.state.commentsOffsetHeight,
      animated: true
    });
  }

  //分享slide
  handleSlideShareMenu() {
    this.setState(prevState => ({
      shareModalVisible: !prevState.shareModalVisible
    }));
  }
}

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == "img") {
    const { src } = node.attribs;
    return <Image key={index} source={{ uri: src }} style={{ width: width * 3 }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
    color: Colors.darkFontColor
  },
  articleInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  articleInfoText: {
    fontSize: 12,
    color: Colors.tintFontColor
  },
  showFoot: {
    paddingHorizontal: 20,
    paddingVertical: 35
  },
  slideInOption: {
    padding: 5
  },
  text: {
    fontSize: 18
  },
  optionText: {
    fontSize: 16,
    color: "#717171"
  }
});

export default connect(store => {
  return {
    login: store.users.login
  };
})(DetailScreen);
