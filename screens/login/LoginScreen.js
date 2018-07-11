import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";

import Screen from "../Screen";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { graphql, compose } from "react-apollo";
import { signUpMutation, signInMutation } from "../../graphql/user.graphql";
import { NavigationActions } from "react-navigation";

import Colors from "../../constants/Colors";
import { connect } from "react-redux";
import actions from "../../store/actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    let login = props.navigation.getParam("login", false);
    this.state = {
      login
    };
  }

  handleSkip() {
    this.setState(prevState => ({ login: !prevState.login }));
  }

  render() {
    let { login } = this.state;
    return (
      <Screen>
        <View style={styles.container}>
          {!login ? (
            <SignUp handleSubmit={this.handleSubmit} handleSkip={this.handleSkip} navigation={this.props.navigation} />
          ) : (
            <SignIn handleSubmit={this.handleSubmit} handleSkip={this.handleSkip} navigation={this.props.navigation} />
          )}
        </View>
      </Screen>
    );
  }

  handleSubmit = async childState => {
    const { name, email, password } = childState;
    if (this.state.login) {
      let result = {};
      try {
        result = await this.props.signInMutation({
          variables: {
            email,
            password
          }
        });
      } catch (ex) {
        result.errors = ex;
      }
      if (result && result.errors) {
        this.toast("登录失败，请检查邮箱和密码是否正确");
      } else {
        const user = result.data.signIn;
        this._saveUserData(user);
      }
    } else {
      let result = {};
      try {
        result = await this.props.signUpMutation({
          variables: {
            name,
            email,
            password
          }
        });
      } catch (ex) {
        result.errors = ex;
      }
      if (result && result.errors) {
        this.toast("注册失败，请检查邮箱地址是否已注册");
      } else {
        const user = result.data.signUp;
        this._saveUserData(user);
      }
    }
  };

  _saveUserData = user => {
    this.props.dispatch(actions.signIn(user));
    // 登录成功 navigateAction
    let navigateAction = NavigationActions.replace({
      key: this.props.navigation.state.key,
      routeName: "主页",
      params: {},
      action: NavigationActions.navigate({ routeName: "个人" })
    });

    this.props.navigation.dispatch(navigateAction);
  };

  toast(message) {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: 70,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 100,
      backgroundColor: Colors.nightColor
    });
    setTimeout(function() {
      Toast.hide(toast);
    }, 2000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default connect(store => {
  return { ...store };
})(
  compose(
    graphql(signUpMutation, { name: "signUpMutation" }),
    graphql(signInMutation, { name: "signInMutation" })
  )(LoginScreen)
);
