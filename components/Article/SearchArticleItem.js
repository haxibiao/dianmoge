import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Highlighter from "react-native-highlight-words";
import { withNavigation } from "react-navigation";

import { navigationAction } from "../../constants/Methods";
import Colors from "../../constants/Colors";

class SearchArticleItem extends Component {
  render() {
    let { navigation, keywords, post } = this.props;
    return (
      <TouchableOpacity style={styles.articleItem} onPress={this.skipScreen}>
        <Text style={styles.articleTitle}>
          <Highlighter highlightStyle={{ color: Colors.themeColor }} searchWords={[keywords]} textToHighlight={post.title} />
        </Text>
        <Text style={styles.articleText} numberOfLines={3}>
          <Highlighter highlightStyle={{ color: Colors.themeColor }} searchWords={[keywords]} textToHighlight={post.description} />
        </Text>
        <Text style={[styles.articleText, { marginTop: 10 }]}>{post.user.name + " 著"}</Text>
      </TouchableOpacity>
    );
  }

  skipScreen = () => {
    const { post, navigation } = this.props;
    let { type } = post;
    let routeName = type == "article" ? "文章详情" : "视频详情";
    let params = type == "article" ? { article: post } : { video: post };
    navigation.dispatch(navigationAction({ routeName, params }));
  };

  _matchingText(keywords, content) {
    // BAK 可以替换 但是不能创建React Element
    // var reg = new RegExp(keywords,"g");
    // if(reg.test(content)&&keywords) {
    //  // var highlightKeywords = React.createElement(Text,{style:{styles.focused}},keywords);
    //  var enhanceContent = content.replace(reg,`<Text style={styles.focused}>${keywords}</Text>`);
    //  return enhanceContent;
    // }else {
    //  return content;
    // }
  }
}

const styles = StyleSheet.create({
  articleItem: {
    marginHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  articleTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: Colors.primaryFontColor,
    paddingVertical: 16
  },
  articleText: {
    fontSize: 13,
    lineHeight: 17,
    color: Colors.tintFontColor
  }
});

export default withNavigation(SearchArticleItem);
