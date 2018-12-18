import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";

import Avatar from "../Pure/Avatar";
import FollowButton from "../Button/Follow";
import { Colors } from "../../constants";

class CategoryGroup extends Component {
  render() {
    const { category = {}, customStyle = {}, plain = false, hideButton = false, navigation, onPress } = this.props;
    let { logo = 48, nameSize = 15, mateSize = 13 } = customStyle;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onPress && onPress();
          navigation.navigate("专题详情", { category });
        }}
      >
        <View style={styles.groupWrap}>
          <Avatar type="category" size={logo} uri={category.logo} />
          <View style={styles.categoryInfo}>
            <Text numberOfLines={1} style={{ color: Colors.primaryFontColor, fontSize: nameSize, marginBottom: 6 }}>
              {category.name || ""}
            </Text>
            <Text numberOfLines={1} style={{ color: Colors.tintFontColor, fontSize: mateSize }}>
              {category.count_articles || 0}
              {"个内容  "}
              {category.count_follows || 0}
              {"人关注 "}
            </Text>
          </View>
          {!hideButton && <FollowButton type={"category"} id={category.id} status={category.followed} />}
        </View>
      </TouchableWithoutFeedback>
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
    marginLeft: 10,
    marginRight: 20
  },
  groupLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 20
  }
});

export default withNavigation(CategoryGroup);
