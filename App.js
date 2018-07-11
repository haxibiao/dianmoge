import React from "react";
import { Platform, StatusBar, StyleSheet, View, Text, YellowBox, Dimensions, Image } from "react-native";
import codePush from "react-native-code-push";
import ApolloApp from "./ApolloApp";
import Colors from "./constants/Colors";
import Config from "./constants/Config";
import { SpinnerLoading } from "./components/Pure";

//redux
import { Provider, connect } from "react-redux";
import store from "./store";
import actions from "./store/actions";
import { Storage, ItemKeys } from "./store/localStorage";

//menu
import { MenuProvider } from "react-native-popup-menu";

const { width, height } = Dimensions.get("window");

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  customBackHandler = instance => {
    if (instance.isMenuOpen()) {
      instance.closeMenu();
      return true;
    } else {
      return false;
    }
  };

  async componentWillMount() {
    YellowBox.ignoreWarnings(["Task orphaned"]);
    await this._loadResourcesAsync();
  }

  render() {
    let { isLoadingComplete } = this.state;
    return (
      <View style={styles.container}>
        <MenuProvider backHandler={this.customBackHandler}>
          <Provider store={store}>
            <ApolloApp onReady={this._handleFinishLoading} />
          </Provider>
        </MenuProvider>
        {!isLoadingComplete && (
          <View style={styles.appLaunch}>
            {Platform.OS === "ios" && <Image source={require("./assets/images/flight.gif")} style={styles.flight} />}
            {Platform.OS === "android" && <SpinnerLoading type="9CubeGrid" />}
            <View style={styles.appInfo}>
              <View style={styles.appLogoWrap}>
                {/**<Image source={require("./assets/images/appLogo.png")} style={styles.appLogo} />*/}
                <Text style={styles.appName}>{Config.AppName}</Text>
              </View>
              <Text style={{ fontSize: 16, color: Colors.tintFontColor }}>{Config.AppSlogan}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    let user = await Storage.getItem(ItemKeys.user);
    if (user) {
      store.dispatch(actions.signIn(user));
    }
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  appLaunch: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  flight: {
    width,
    height: width * 0.68,
    resizeMode: "cover"
  },
  appInfo: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  appLogoWrap: {
    // padding: 4,
    // borderWidth: 0.5,
    // borderColor: Colors.lightBorderColor,
    // borderRadius: 5,
    marginRight: 15
  },
  appName: {
    fontSize: 22,
    color: Colors.themeColor,
    fontWeight: "300"
  },
  appLogo: {
    width: 50,
    height: 50,
    resizeMode: "cover"
  }
});

export default codePush(App);
