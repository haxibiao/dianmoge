import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Avatar from "../Pure/Avatar";
import FollowButton from "../Button/Follow";
import Colors from "../../constants/Colors";

class CategoryGroup extends Component {
  render() {
    const { category = {}, customStyle = {}, plain = false, hideButton = false, showCreator = false, navigation } = this.props;
    let { logo = 36, nameSize = 16, mateSize = 14 } = customStyle;
    return (
      <View style={styles.groupWrap}>
        <View style={styles.groupLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("专题详情", { category })}>
            <Avatar type="category" size={logo} uri={category.logo} />
          </TouchableOpacity>
          <View style={[styles.categoryInfo, { height: logo, minHeight: 40 }]}>
            <Text numberOfLines={1} style={{ color: Colors.primaryFontColor, fontSize: nameSize }}>
              {category.name || ""}
            </Text>
            {showCreator ? (
              <Text numberOfLines={1} style={{ color: Colors.tintFontColor, fontSize: mateSize }}>
                {`${category.user.name} · ${category.count_articles}篇文章 · ${category.count_follows}人关注`}
              </Text>
            ) : (
              <Text numberOfLines={1} style={{ color: Colors.tintFontColor, fontSize: mateSize }}>
                {category.count_articles + "篇文章  " + category.count_follows + "人关注" || ""}
              </Text>
            )}
          </View>
        </View>
        {!hideButton && (
          <FollowButton
            plain={plain}
            type={"category"}
            id={category.id}
            status={category.followed}
            customStyle={plain ? { height: 28, width: 72 } : null}
            fontSize={plain ? 14 : 15}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  categoryInfo: {
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 10
  },
  groupLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 20
  }
});

export default withNavigation(CategoryGroup);
