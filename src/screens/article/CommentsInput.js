import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import * as Animatable from "react-native-animatable";

const slideInUp = {
  from: {
    opacity: 0,
    marginBottom: -50
  },
  to: {
    opacity: 1,
    marginBottom: 0
  }
};

const slideOutDown = {
  from: {
    opacity: 1,
    marginBottom: 0
  },
  to: {
    opacity: 0,
    marginBottom: -50
  }
};

class CommentsInput extends Component {
  constructor(props) {
    super(props);
    this.renders = 0;
  }

  componentWillMount() {
    this.renders = 1;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.showWrite !== this.props.showWrite) {
      this.renders++;
    }
  }

  render() {
    if (this.renders < 2) {
      return null;
    }
    let slideType = this.props.showWrite ? slideInUp : slideOutDown;
    let { body = "", toggleCommentModal } = this.props;
    return (
      <Animatable.View animation={slideType}>
        <TouchableWithoutFeedback onPress={toggleCommentModal}>
          <View style={styles.textInput}>
            {body ? null : <Iconfont name={"write"} size={14} color={Colors.tintFontColor} style={{ marginRight: 6 }} />}
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 13, color: Colors.tintFontColor }}>
              {body ? body : "写下你的评论..."}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.tintGray,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default CommentsInput;
