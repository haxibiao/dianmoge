import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants";

class SettingType extends Component {
  render() {
    let { typeName, explain, customStyle = {} } = this.props;
    let mergeStyle = StyleSheet.flatten([styles.settingHeader, customStyle]);
    return (
      <View style={mergeStyle}>
        <View>
          <Text style={styles.settingType}>{typeName}</Text>
        </View>
        {explain && (
          <View>
            <Text style={{ fontSize: 13, color: Colors.lightFontColor, marginTop: 8 }}>{explain}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingType: {
    fontSize: 13,
    color: Colors.themeColor
  },
  settingHeader: {
    paddingBottom: 8,
    paddingTop: 16,
    paddingLeft: 15,
    backgroundColor: Colors.lightGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lightBorderColor,
    justifyContent: "flex-end"
  }
});

export default SettingType;
