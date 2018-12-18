// import { Notifications } from 'expo';
import React from 'react';
import { Image, View, Text, Platform, Animated, Easing, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Iconfont } from '../utils/Fonts';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import router from './Router';
import Colors from '../constants/Colors';
import HeaderLeft from '../components/Header/HeaderLeft';

const RootStackNavigator = createAppContainer(
  createStackNavigator(router, {
    navigationOptions: ({ navigation }) => {
      // Colors.resetStatusBar();
      return {
        header: null
        // headerStyle: {
        //   paddingHorizontal: 15,
        //   backgroundColor: Colors.skinColor,
        //   borderBottomWidth: 1,
        //   borderBottomColor: Colors.lightBorderColor,
        //   height: 45,
        //   elevation: 0,
        //   shadowOpacity: 0
        // },
        // headerLeft: <HeaderLeft navigation={navigation} />
      };
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateX }] };
      }
    })
  })
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator ref="rootStackNavigator" screenProps={{ divice: this.props.divice }} />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    // console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
