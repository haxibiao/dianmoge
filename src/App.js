import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, YellowBox, Dimensions, Image } from 'react-native';
import codePush from 'react-native-code-push';
import Spinner from 'react-native-spinkit';
import Orientation from 'react-native-orientation';

import ApolloApp from './ApolloApp';
import { Config, Colors, Divice } from './constants';

//redux
import { Provider, connect } from 'react-redux';
import store from './store';
import actions from './store/actions';
import { Storage, ItemKeys } from './store/localStorage';

//menu
import { MenuProvider } from 'react-native-popup-menu';

const { width, height } = Dimensions.get('window');

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
    YellowBox.ignoreWarnings(['Task orphaned']);
    Orientation.lockToPortrait();
    await this._loadResourcesAsync();
  }

  render() {
    let { isLoadingComplete, width, height } = this.state;
    return (
      <View style={styles.container}>
        <MenuProvider backHandler={this.customBackHandler}>
          <Provider store={store}>
            <ApolloApp onReady={this._handleFinishLoading} />
          </Provider>
        </MenuProvider>
        {!isLoadingComplete && (
          <View style={styles.appLaunch}>
            <View style={styles.column}>
              <Spinner size={50} type="9CubeGrid" color={Colors.themeColor} />
            </View>
            <View style={styles.column}>
              <View style={styles.appName}>
                <Text style={styles.name}>{Config.AppDisplayName}</Text>
              </View>
              <View style={styles.appSlogan}>
                <Text style={styles.slogan}>{Config.AppSlogan}</Text>
              </View>
              <View style={styles.appVersion}>
                <Text style={styles.version}>{Config.AppVersion}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    let user = await Storage.getItem(ItemKeys.user);
    let isOpen = await Storage.getItem(ItemKeys.addWatermark);
    // console.log('isOpen', isOpen);
    if (isOpen) {
      store.dispatch(actions.addWatermark(true));
    } else {
      store.dispatch(actions.addWatermark(false));
    }
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

  // layoutChange = event => {
  //   let { width, height } = event.nativeEvent.layout;
  //   this.setState({ width, height });
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appLaunch: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  appName: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeColor
  },
  name: {
    fontSize: 22,
    color: Colors.themeColor,
    fontWeight: '300'
  },
  appSlogan: {
    marginTop: 10
  },
  slogan: { fontSize: 15, lineHeight: 20, color: Colors.tintFontColor },
  appVersion: {
    marginTop: 10
  },
  version: { fontSize: 10, lineHeight: 20, color: Colors.lightFontColor }
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};
export default codePush(codePushOptions)(App);
// export default App;
