import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import Colors from "../../constants/Colors";

class OfficialColumn extends Component {
  render() {
    let { data } = this.props;
    return (
      <View style={styles.special_column}>
        <View style={{ marginBottom: 12 }}>
          <Image style={styles.column_image} source={{ uri: data.avatar }} />
        </View>
        <View>
          <Text style={styles.column_name}>{data.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  special_column: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  column_image: {
    width: 42,
    height: 42,
    resizeMode: "contain"
  },
  column_name: {
    fontSize: 12,
    color: Colors.primaryFontColor
  }
});

export default OfficialColumn;
