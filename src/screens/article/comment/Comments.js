import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { ContentEnd, Diving } from "../../../components/Pure";
import { CustomPopoverMenu, AddCommentModal } from "../../../components/Modal";

import CommentItem from "./CommentItem";
import CommentsModal from "./CommentsModal";

import { commentsQuery } from "../../../graphql/comment.graphql";
import { Query } from "react-apollo";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.toggleCommentsVisible = this.toggleCommentsVisible.bind(this);
    this.toggleReplyCommentVisible = this.toggleReplyCommentVisible.bind(this);
    this.state = {
      order: "LATEST_FIRST",
      onlyAuthor: false,
      replyCommentVisible: false,
      commentsVisible: false
    };
  }

  render() {
    const { onLayout, navigation, article, addCommentVisible, toggleCommentModal } = this.props;
    const { onlyAuthor, order, replyCommentVisible, commentsVisible } = this.state;
    let filter = onlyAuthor ? "ONLY_AUTHOR" : "ALL";
    return (
      <View onLayout={onLayout}>
        <Query query={commentsQuery} variables={{ article_id: article.id, order, filter }} fetchPolicy="network-only">
          {({ laoding, error, data, refetch }) => {
            if (!(data && data.comments)) return <Diving />;
            let { comments } = data;
            return (
              <View>
                <View style={styles.topTitle}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: Colors.themeColor,
                        marginRight: 8
                      }}
                    >
                      {article.count_replies || 0}
                      条评论
                    </Text>
                    <TouchableOpacity
                      style={[styles.onlyAuthor, onlyAuthor ? styles.onlyAuthored : ""]}
                      onPress={() => {
                        this.setState({ onlyAuthor: !onlyAuthor });
                        refetch();
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: onlyAuthor ? "#fff" : Colors.lightFontColor
                        }}
                      >
                        只看作者
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <CustomPopoverMenu
                    width={110}
                    selectHandler={index => {
                      let { order } = this.state;
                      switch (index) {
                        case 0: {
                          order = "LATEST_FIRST";
                          break;
                        }
                        case 1: {
                          order = "OLD_FIRST";
                          break;
                        }
                        case 2: {
                          order = "LIKED_MOST";
                          break;
                        }
                      }
                      this.setState({ order });
                    }}
                    triggerComponent={
                      <Text style={{ fontSize: 13, color: Colors.tintFontColor }}>
                        {order == "LATEST_FIRST" && "按时间倒序 "}
                        {order == "OLD_FIRST" && "按时间正序 "}
                        {order == "LIKED_MOST" && "按点赞排序 "}
                        <Iconfont name={"downward-arrow"} size={12} />
                      </Text>
                    }
                    options={["按时间倒序", "按时间正序", "按点赞排序"]}
                  />
                </View>
                {comments.length < 1 ? (
                  <Diving
                    customStyle={{
                      paddingVertical: 40,
                      backgroundColor: Colors.skinColor
                    }}
                  >
                    {onlyAuthor ? (
                      <Text style={styles.divingFont}>作者还没有发表评论哦~</Text>
                    ) : (
                      <Text style={styles.divingFont}>
                        智慧如你，不
                        <Text style={{ color: Colors.linkColor }} onPress={() => toggleCommentModal()}>
                          发表一点看法
                        </Text>
                        咩~
                      </Text>
                    )}
                  </Diving>
                ) : (
                  <View>
                    <View style={styles.commentList}>
                      {comments.slice(0, 5).map((comment, i) => {
                        return (
                          <CommentItem
                            key={i}
                            comment={comment}
                            toggleReplyComment={comment => {
                              this.replyingComment = comment;
                              this.toggleReplyCommentVisible();
                            }}
                            navigation={navigation}
                          />
                        );
                      })}
                    </View>
                    {comments.length > 3 ? (
                      <TouchableOpacity style={styles.loadMore} onPress={this.toggleCommentsVisible}>
                        <Text style={{ fontSize: 16, color: Colors.linkColor }}>查看更多评论</Text>
                        <Iconfont name={"right"} size={16} color={Colors.linkColor} />
                      </TouchableOpacity>
                    ) : (
                      <ContentEnd />
                    )}
                  </View>
                )}
              </View>
            );
          }}
        </Query>
        <CommentsModal
          visible={commentsVisible}
          toggleVisible={this.toggleCommentsVisible}
          article={article}
          order={order}
          filter={filter}
          navigation={navigation}
        />
        <AddCommentModal
          visible={replyCommentVisible}
          toggleCommentModal={this.toggleReplyCommentVisible}
          article={article}
          replyingComment={this.replyingComment}
          order={order}
          filter={filter}
          navigation={navigation}
        />
        <AddCommentModal
          visible={addCommentVisible}
          toggleCommentModal={toggleCommentModal}
          article={article}
          order={order}
          filter={filter}
          navigation={navigation}
        />
      </View>
    );
  }

  toggleCommentsVisible() {
    this.setState(prevState => ({
      commentsVisible: !prevState.commentsVisible
    }));
  }

  toggleReplyCommentVisible() {
    this.setState(prevState => ({
      replyCommentVisible: !prevState.replyCommentVisible
    }));
  }
}

const styles = StyleSheet.create({
  topTitle: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "#fbfbfb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  onlyAuthor: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 4
  },
  onlyAuthored: {
    borderColor: Colors.themeColor,
    backgroundColor: Colors.themeColor
  },
  commentList: {},
  divingFont: {
    fontSize: 14,
    color: Colors.lightFontColor,
    marginTop: 12
  },
  loadMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  }
});

export default Comments;
