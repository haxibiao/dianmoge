/*
* @flow
* wyk created it in 2018-12-04 15:46:29
* tip: default statusBar is transparent
*/
'use strict';

import { Platform, Dimensions, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Mixes from './Mixes';

const { width, height } = Dimensions.get('window');
const hasNotch = DeviceInfo.hasNotch();
let hasHomeIndicator = false;

if (Platform.OS === 'ios' && hasNotch) {
  hasHomeIndicator = true;
}

const Theme = {
  ...Mixes,
  navBarContentHeight: 44,
  HAS_NOTCH: hasNotch,
  HAS_HOME_INDICATOR: hasHomeIndicator,
  HOME_INDICATOR_HEIGHT: hasHomeIndicator ? 30 : 0,

  get isLandscape() {
    return Dimensions.get('window').width > Dimensions.get('window').height;
  },

  get statusBarHeight() {
    if (Platform.OS === 'ios') {
      return this.isLandscape ? 0 : hasNotch ? 40 : 20;
    } else if (Platform.OS === 'android') {
      let statusBar_height = StatusBar.currentHeight;
      return hasNotch ? statusBar_height + 20 : statusBar_height;
    }
    return this.isLandscape ? 0 : 20;
  }
};

export default Theme;
