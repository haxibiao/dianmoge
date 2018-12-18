import React from 'react';
import { Colors, Divice } from '../../constants';
import { createMaterialTopTabNavigator } from 'react-navigation';

import FollowedScreen from './FollowedScreen';
import CategoriesScreen from './CategoriesScreen';

export default createMaterialTopTabNavigator(
  {
    关注: {
      screen: FollowedScreen
    },
    专题: {
      screen: CategoriesScreen
    }
  },
  {
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: true,
    lazy: false,
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: Colors.darkFontColor,
      inactiveTintColor: Colors.primaryFontColor,
      style: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        elevation: 0,
        shadowColor: 'transparent',
        paddingTop: Divice.STATUSBAR_HEIGHT,
        paddingBottom: 6,
        paddingLeft: Divice.width / 2 - 60
      },
      indicatorStyle: {
        height: 2,
        width: 20,
        marginHorizontal: 20,
        backgroundColor: Colors.themeColor,
        left: Divice.width / 2 - 60,
        bottom: 6
      },
      labelStyle: {
        fontSize: 17,
        margin: 3
      },
      tabStyle: {
        width: 60,
        paddingHorizontal: 0
      }
    }
  }
);
