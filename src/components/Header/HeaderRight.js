import React, { Component } from "react";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import CustomPopoverMenu from "../Modal/CustomPopoverMenu";
import { StyleSheet, View } from "react-native";

class HeaderRight extends Component {
  render() {
    let { options = [], width = 140, color = Colors.darkBorderColor, selectHandler = () => null } = this.props;
    return (
      <View>
        <CustomPopoverMenu
          width={width}
          options={options}
          selectHandler={selectHandler}
          triggerComponent={
            <View>
              <Iconfont name={"more-vertical"} size={23} color={color} />
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default HeaderRight;
