import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { FollowButton } from "../Button";
import { Avatar } from "../Pure";
import { Colors } from "../../constants";

class UserGroup extends Component {
  render() {
    const { user = {}, customStyle = {}, navigation, plain = false, rightButton = null } = this.props;
    let { avatar = 36, nameSize = 16 } = customStyle;
    return (
      <View style={styles.groupWrap}>
        <View style={styles.groupLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("用户详情", { user })}>
            <Avatar size={avatar} uri={user.avatar} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                color: Colors.primaryFontColor,
                fontSize: nameSize,
                marginLeft: 10
              }}
            >
              {user.name || ""}
            </Text>
          </View>
        </View>
        {rightButton ? (
          rightButton
        ) : (
          <FollowButton
            id={user.id}
            type={"user"}
            status={user.followed_status}
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
  groupLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 20
  }
});

export default withNavigation(UserGroup);
