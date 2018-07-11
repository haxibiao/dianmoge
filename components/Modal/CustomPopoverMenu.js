import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

class CustomPopoverMenu extends Component {
  render() {
    //selectHandler 根据value处理不同的逻辑
    let { selectHandler = value => null, triggerComponent, options = [], width, children } = this.props;
    // menu options样式
    const optionsStyle = {
      optionsWrapper: {
        width: width ? width : "auto"
      },
      optionsContainer: {
        width: width ? width : "auto",
        alignItems: "center",
        justifyContent: "center"
      }
    };
    return (
      <Menu onSelect={selectHandler}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>{triggerComponent}</MenuTrigger>
        <MenuOptions customStyles={optionsStyle}>{children ? children : this._renderOptions()}</MenuOptions>
      </Menu>
    );
  }

  _renderOptions = () => {
    let { options = [], customOptionStyle = {} } = this.props;
    // menu option样式
    const optionItemStyle = {
      optionWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 0,
        alignItems: "center",
        ...customOptionStyle.optionWrapper
      },
      optionText: {
        flex: 1,
        fontSize: 16,
        color: "#717171",
        ...customOptionStyle.optionText
      }
    };
    return options.map((elem, index) => {
      return <MenuOption key={index.toString()} value={index} text={elem} customStyles={optionItemStyle} />;
    });
  };
}

const styles = StyleSheet.create({});

export default CustomPopoverMenu;
