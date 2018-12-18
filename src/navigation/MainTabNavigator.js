import React from 'react';
import { Platform } from 'react-native';
import { Iconfont } from '../utils/Fonts';
import { TabNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/home/HomeScreen';
import FindScreen from '../screens/find/FindScreen';
import NotificationScreen from '../screens/notification/HomeScreen';
import MyHomeScreen from '../screens/my/HomeScreen';

import MainTab from './MainTab';

let routerConfig = {
  主页: {
    screen: HomeScreen
  },
  发现: {
    screen: FindScreen
  },
  通知: {
    screen: NotificationScreen
  },
  个人: {
    screen: MyHomeScreen
  }
};

export default TabNavigator(routerConfig, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case '主页':
          iconName = `home${focused ? '-fill' : ''}`;
          break;
        case '发现':
          iconName = `discover${focused ? '-fill' : ''}`;
          break;
        case '通知':
          iconName = `notification${focused ? '-fill' : ''}`;
          break;
        case '个人':
          iconName = `person${focused ? '-fill' : ''}`;
      }
      return <Iconfont name={iconName} size={26} style={{ marginBottom: -1 }} color={focused ? '#616161' : '#969696'} />;
    }
  }),
  tabBarComponent: props => <CustomMainTab {...props} />,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  lazy: false,
  swipeEnabled: Platform.OS === 'ios' ? true : false,
  tabBarOptions: {
    activeTintColor: '#616161',
    inactiveTintColor: '#969696'
  }
});
