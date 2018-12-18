import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isIos = Platform.OS == 'ios';
let { width, height } = Dimensions.get('window');
let STATUSBAR_HEIGHT = isIos ? 20 : StatusBar.currentHeight;
let HAS_HOME_INDICATOR = false;

if (DeviceInfo.hasNotch()) {
	STATUSBAR_HEIGHT = 35;
}
//适配iPhone X
if (isIos && DeviceInfo.hasNotch()) {
	HAS_HOME_INDICATOR = true;
}

const wp = widthPercent => {
	const elemWidth = parseFloat(widthPercent);
	return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const hp = heightPercent => {
	const elemHeight = parseFloat(heightPercent);
	return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const listenOrientationChange = that => {
	Dimensions.addEventListener('change', newDimensions => {
		width = newDimensions.window.width;
		height = newDimensions.window.height;
		console.log('thatthatthat', that);
		that.setState({
			orientation: width < height ? 'portrait' : 'landscape'
		});
	});
};

const removeOrientationListener = () => {
	Dimensions.removeEventListener('change', () => null);
};

export default {
	isIos,
	width,
	height,
	STATUSBAR_HEIGHT,
	HAS_HOME_INDICATOR,
	HEADER_HEIGHT: 40 + STATUSBAR_HEIGHT,
	BOTTOM_BAR_HEIGHT: 50,
	wp,
	hp,
	listenOrientationChange,
	removeOrientationListener
};
