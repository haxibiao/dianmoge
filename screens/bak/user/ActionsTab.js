import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, FlatList } from "react-native";
import { connect } from "react-redux";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";

import { userActionsQuery } from "../../graphql/user.graphql";
import { Query, Mutation } from "react-apollo";

class ActionsTab extends Component {
  state = {
    fetchingMore: true
  };

  render() {
    let { scrollEnabled, onScroll, user } = this.props;
    return (
      <View style={styles.container}>
        <Query query={userActionsQuery} variables={{ user_id: user.id }}>
          {({ loading, error, data, refetch, fetchMore }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (!(data && data.actions)) return <SpinnerLoading />;
            if (data.actions.length < 1) return <BlankContent />;
            return (
              <View style={styles.dynamicWrap}>
                <View style={styles.dynamicLeftLine} />
                <FlatList
                  style={styles.dynamicList}
                  data={data.actions}
                  refreshing={loading}
                  onRefresh={() => {
                    fetch();
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={onScroll}
                  scrollEnabled={scrollEnabled}
                  renderItem={this._renderItem}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    if (data.actions) {
                      fetchMore({
                        variables: {
                          offset: data.actions.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!(fetchMoreResult && fetchMoreResult.actions && fetchMoreResult.actions.length > 0)) {
                            this.setState({
                              fetchingMore: false
                            });
                            return prev;
                          }
                          return Object.assign({}, prev, {
                            actions: [...prev.actions, ...fetchMoreResult.actions]
                          });
                        }
                      });
                    } else {
                      this.setState({
                        fetchingMore: false
                      });
                    }
                  }}
                  ListFooterComponent={() => {
                    return (
                      <View style={{ paddingBottom: 25, backgroundColor: "#fff" }}>{this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />}</View>
                    );
                  }}
                />
              </View>
            );
          }}
        </Query>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    let { user, calcActionHeight } = this.props;
    let action = item;
    return (
      <View
        style={[styles.dynamicItem, action.signUp && { backgroundColor: "#fff" }]}
        onLayout={event => {
          let { height } = event.nativeEvent.layout;
          calcActionHeight(height);
        }}
      >
        <View style={styles.dynamicItemLeft}>
          <Avatar uri={user.avatar} size={42} />
          <View style={[styles.dynamicIcon, { backgroundColor: this._iconColor(action) }]}>
            <Iconfont name={this._iconName(action)} size={11} color={"#fff"} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View>{this._actionType(action)}</View>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.time}>{action.time_ago}</Text>
          </View>
        </View>
      </View>
    );
  };

  _iconName = action => {
    switch (action.type) {
      case "follows":
        return "add-person";
        break;
      case "comments":
        return "comment";
        break;
      case "tips":
        return "RMB";
        break;
      case "likes":
        return "like";
        break;
      case "articles":
        return "collection";
        break;
      default:
        return "category-rotate";
        break;
    }
  };

  _iconColor = action => {
    switch (action.type) {
      case "follows":
      case "subscription":
      case "join":
        return Colors.weixinColor;
        break;
      case "comments":
      case "likes":
      case "tips":
        return Colors.themeColor;
        break;
      default:
        return Colors.darkBorderColor;
        break;
    }
  };

  _actionType = action => {
    let { user, navigation } = this.props;
    switch (action.type) {
      case "users":
        return (
          <View>
            <Text style={styles.dynamicText}>
              {user.name}
              {" 注册新用户"}
            </Text>
          </View>
        );
        break;
      case "comments":
        return (
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.dynamicText}>
                {user.name + " 评论了文章 "}
                <Text
                  style={{ color: Colors.linkColor }}
                  onPress={() =>
                    navigation.navigate("文章详情", {
                      article: action.postedComment.article
                    })}
                >
                  {action.postedComment.article.title}
                </Text>
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("评论详情", {
                  comment: action.postedComment
                })}
            >
              <View style={styles.commentBox}>
                <Text numberOfLines={3} style={styles.commentText}>
                  {action.postedComment.atUser && (
                    <Text
                      style={{ color: Colors.linkColor, lineHeight: 20 }}
                      onPress={() =>
                        navigation.navigate("用户详情", {
                          user: action.postedComment.atUser
                        })}
                    >
                      @{action.postedComment.atUser.name + " "}
                    </Text>
                  )}
                  {action.postedComment.body}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
        break;
      case "tips":
        return (
          <View>
            <Text style={styles.dynamicText}>
              {user.name + " 赞赏了文章 "}
              <Text
                style={{ color: Colors.linkColor }}
                onPress={() =>
                  navigation.navigate("文章详情", {
                    article: action.tiped.article
                  })}
              >
                {action.tiped.article.title}
              </Text>
            </Text>
          </View>
        );
        break;
      case "likes":
        return (
          <View>
            {action.liked.article && (
              <View>
                <Text style={styles.dynamicText}>
                  {user.name + " 喜欢了文章 "}
                  <Text
                    style={{ color: Colors.linkColor }}
                    onPress={() =>
                      navigation.navigate("文章详情", {
                        articleId: action.liked.article.id
                      })}
                  >
                    {action.liked.article.title}
                  </Text>
                </Text>
              </View>
            )}
            {action.liked.comment && (
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={styles.dynamicText}>
                    {user.name + " 赞了 "}
                    <Text
                      style={{ color: Colors.linkColor }}
                      onPress={() =>
                        navigation.navigate("用户详情", {
                          user: action.liked.comment.user
                        })}
                    >
                      {action.liked.comment.user.name}
                    </Text>
                    {" 在文章 "}
                    <Text
                      style={{ color: Colors.linkColor }}
                      onPress={() =>
                        navigation.navigate("文章详情", {
                          article: action.liked.comment.article
                        })}
                    >
                      {action.liked.comment.article.title}
                    </Text>
                    {" 的评论"}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("评论详情", {
                      comment: action.liked.comment
                    })}
                >
                  <View style={styles.commentBox}>
                    <Text numberOfLines={3} style={styles.commentText}>
                      {action.liked.comment.body}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        );
        break;
      case "articles":
        return (
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.dynamicText}>
                {user.name + " 发表了文章 "}
                <Text
                  style={{ color: Colors.linkColor }}
                  onPress={() =>
                    navigation.navigate("文章详情", {
                      article: action.postedArticle
                    })}
                >
                  {action.postedArticle.title}
                </Text>
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("文章详情", {
                  article: action.postedArticle
                })}
            >
              <View style={styles.commentBox}>
                <Text numberOfLines={6} style={styles.commentText}>
                  {action.postedArticle.description}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
        break;
      case "follows":
        if (!action.followed) return null;

        let routeName = "专题详情";
        let params = { category: action.followed.category };
        if (action.followed.collection) {
          routeName = "文集详情";
          params = { collection: action.followed.collection };
        }
        if (action.followed.user) {
          routeName = "用户详情";
          params = { user: action.followed.user };
        }
        return (
          <View>
            <Text style={styles.dynamicText}>
              {user.name + " 关注了 "}
              {action.followed.category && "专题 "}
              {action.followed.collection && "文集 "}
              {action.followed.user && "作者 "}
              <Text style={{ color: Colors.linkColor }} onPress={() => navigation.navigate(routeName, params)}>
                {action.followed.category && action.followed.category.name}
                {action.followed.collection && action.followed.collection.name}
                {action.followed.user && action.followed.user.name}
              </Text>
            </Text>
          </View>
        );
        break;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dynamicWrap: {
    flexDirection: "row",
    paddingLeft: 20
  },
  dynamicLeftLine: {
    width: 1,
    backgroundColor: "#ccc",
    marginRight: -22,
    marginLeft: 21
  },
  dynamicList: {
    marginTop: 20,
    paddingRight: 20
  },
  dynamicItem: {
    flexDirection: "row",
    paddingBottom: 40
  },
  dynamicItemLeft: {
    marginRight: 10,
    height: 42
  },
  dynamicIcon: {
    position: "absolute",
    right: 0,
    bottom: -5,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  dynamicText: {
    fontSize: 17,
    lineHeight: 23,
    color: "#666"
  },
  commentBox: {
    flex: 1,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 4,
    backgroundColor: Colors.lightGray
  },
  commentText: {
    fontSize: 14,
    color: Colors.tintFontColor,
    lineHeight: 20
  },
  time: {
    fontSize: 13,
    color: Colors.tintFontColor
  }
});

export default ActionsTab;
