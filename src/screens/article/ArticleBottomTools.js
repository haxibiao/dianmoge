import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import * as Animatable from "react-native-animatable";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import CommentsInput from "./CommentsInput";

import { articleQuery } from "../../graphql/article.graphql";
import { likeArticleMutation } from "../../graphql/user.graphql";
import { Query, Mutation } from "react-apollo";

const { width, height } = Dimensions.get("window");

class ArticleBottomTools extends Component {
  render() {
    const {
      rewards,
      comments,
      article,
      showWrite,
      toggleCommentModal,
      handleRewardVisible,
      handleSlideShareMenu,
      commentHandler,
      login,
      navigation
    } = this.props;
    let { liked, count_likes } = article;
    return (
      <Mutation mutation={likeArticleMutation}>
        {likeArticle => {
          return (
            <View style={styles.BottomTools}>
              <View>
                <CommentsInput showWrite={showWrite} toggleCommentModal={toggleCommentModal} />
              </View>
              <View style={styles.articleTools}>
                {
                  // 隐藏功能
                  // <TouchableOpacity onPress={handleRewardVisible} style={{ flex: 1 }}>
                  //   <View style={styles.articleToolItem}>
                  //     <Iconfont name={"reward"} size={19} color={Colors.tintFontColor} style={{ marginBottom: -1 }} />
                  //     <Text style={styles.articleToolItemText}>赞赏 {rewards}</Text>
                  //   </View>
                  // </TouchableOpacity>
                }
                <TouchableOpacity onPress={commentHandler} style={{ flex: 1 }}>
                  <View style={styles.articleToolItem}>
                    <Iconfont name={"comment-hollow"} size={17} color={Colors.tintFontColor} />
                    <Text style={styles.articleToolItemText}>评论 {comments || 0}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (login) {
                      likeArticle({
                        variables: {
                          article_id: article.id,
                          undo: liked
                        }
                      });
                    } else {
                      navigation.navigate("登录注册");
                    }
                  }}
                >
                  <View style={styles.articleToolItem}>
                    <Iconfont name={liked ? "like-fill" : "like"} size={17} color={liked ? Colors.themeColor : Colors.tintFontColor} />
                    <Text style={styles.articleToolItemText}>喜欢 {count_likes}</Text>
                  </View>
                </TouchableOpacity>
                {
                  // 隐藏第三方social
                  // <TouchableOpacity onPress={handleSlideShareMenu} style={{ flex: 1 }}>
                  //   <View style={styles.articleToolItem}>
                  //     <Iconfont name={"share-fill"} size={16} color={Colors.tintFontColor} />
                  //     <Text style={styles.articleToolItemText}>分享</Text>
                  //   </View>
                  // </TouchableOpacity>
                }
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  BottomTools: {
    width,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorderColor,
    backgroundColor: Colors.skinColor
  },
  textInput: {
    backgroundColor: Colors.darkGray,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  articleTools: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  articleToolItem: {
    alignItems: "center"
  },
  articleToolItemText: {
    marginTop: 4,
    fontSize: 11,
    color: Colors.tintFontColor
  }
});

export default ArticleBottomTools;
