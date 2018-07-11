import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import { articleQuery } from "../../graphql/article.graphql";
import { likeArticleMutation } from "../../graphql/user.graphql";
import { Query, Mutation } from "react-apollo";

class MetaBottom extends Component {
  render() {
    const { article, handleSlideShareMenu, login, navigation } = this.props;
    let { liked, count_likes } = article;
    return (
      <Mutation mutation={likeArticleMutation}>
        {likeArticle => {
          return (
            <View style={styles.metaBottom}>
              <View style={styles.likeArticle}>
                <TouchableOpacity
                  onPress={() => {
                    if (login) {
                      likeArticle({
                        variables: {
                          article_id: article.id,
                          undo: liked
                        },
                        optimisticResponse: {
                          __typename: "Mutation",
                          likeArticle: {
                            __typename: "Article",
                            id: article.id,
                            liked: !liked,
                            count_likes: liked ? --count_likes : ++count_likes
                          }
                        },
                        update: (cache, { data: { likeArticle } }) => {
                          cache.writeQuery({
                            query: articleQuery,
                            variables: { id: article.id },
                            data: {
                              article: {
                                ...article,
                                count_likes: likeArticle.count_likes,
                                liked: likeArticle.liked
                              }
                            }
                          });
                        }
                      });
                    } else {
                      navigation.navigate("登录注册");
                    }
                  }}
                >
                  <Iconfont name={liked ? "like" : "like-outline"} size={25} color={liked ? Colors.themeColor : Colors.tintFontColor} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 4, fontSize: 14, color: Colors.tintFontColor }}>{count_likes}</Text>
              </View>
              <View style={styles.shareArticle}>
                <TouchableOpacity onPress={() => null}>
                  <Iconfont name={"weixin"} size={27} color={Colors.weixinColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                  <Image style={{ width: 25, height: 25, marginHorizontal: 20 }} source={require("../../assets/images/pengyouquan.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSlideShareMenu}>
                  <Iconfont name={"more"} size={22} color={Colors.tintFontColor} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  metaBottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.tintBorderColor,
    justifyContent: "space-between"
  },
  likeArticle: {
    flexDirection: "row",
    alignItems: "center"
  },
  shareArticle: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default MetaBottom;
