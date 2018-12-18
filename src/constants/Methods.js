import { StyleSheet, Dimensions, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-root-toast';
import * as Colors from './Colors';

const divice = Dimensions.get('window');

//navigation.dispatch(navigationAction)
// 路由名称，参数，导航动作，key唯一可以防止重复调整
function navigationAction({ routeName, params = null, action = null, key = params ? Math.random().toString() : routeName }) {
	return NavigationActions.navigate({
		routeName,
		params,
		action,
		key
	});
}

// 导航操作
function navigationDispatch(navigation, route) {
	navigation.dispatch(navigationAction(route));
}

//需要登录验证的操作
function userOperationMiddleware({ login, action, navigation }) {
	if (login) {
		action();
	} else {
		navigation.dispatch(navigationAction({ routeName: '登录注册' }));
	}
}

//查看内容详情页
function goContentScreen(navigation, data) {
	let { type } = data;
	let routeName, params, key;
	switch (type) {
		case 'video':
		case 'videos':
		case 'post':
		case 'posts':
			routeName = '动态详情';
			params = { post: data };
			break;
		case 'article':
		case 'articles':
			routeName = '文章详情';
			params = { article: data };
			break;
		case 'category':
		case 'categories':
			routeName = '专题详情';
			params = { category: data };
			break;
		case 'collection':
		case 'collections':
			routeName = '文集详情';
			params = { collection: data };
			break;
		case 'user':
		case 'users':
			routeName = '用户详情';
			params = { user: data };
			break;
	}
	if (data.id) {
		key = routeName + data.id;
	}
	navigation.dispatch(navigationAction({ routeName, params, key }));
}

// 数字进制格式化
function numberFormat(number) {
	number = parseFloat(number);
	if (number >= 10000) {
		return (number / 10000).toFixed(1) + 'w';
	} else {
		return number;
	}
}

// 时间格式化
function formatTime(second) {
	let h = 0,
		i = 0,
		s = parseInt(second);
	if (s > 60) {
		i = parseInt(s / 60);
		s = parseInt(s % 60);
	}
	// 补零
	let zero = function(v) {
		return v >> 0 < 10 ? '0' + v : v;
	};
	return [zero(h), zero(i), zero(s)].join(':');
}

// response images
function imageSize({ width, height }, maxWidth = divice.width) {
	var scale;
	var size = {};
	if (width > maxWidth || height > maxWidth) {
		if (width >= height) {
			size.width = maxWidth;
			size.height = Math.round((maxWidth * height) / width);
		} else {
			size.height = maxWidth;
			size.width = Math.round((maxWidth * width) / height);
		}
	} else {
		size = { width, height };
	}
	return size;
	// if(Platform.OS=="ios"){
	// 	switch (device.width) {
	// 		//iPhone4/4S and iPhone5/5S
	// 	  		case 320:
	// 			scale = 0.77;
	// 			break;
	// 		//iPhone6/6S
	// 	  		case 375:
	// 			scale = 0.902;
	// 			break;
	// 		//iPhone6plus/6Splus
	// 	  		case 414:
	// 			scale = 1;
	// 			break;
	// 		//iPad
	// 		default:
	// 			scale = 1;
	// 	}
	// }else {
	// 	if (device.width <= 414) {
	// 		//Android smartphones
	// 		scale = device.width / 414;
	// 	} else{
	// 		//Android tablets
	// 		scale = 1;
	// 	}
	// }
}

//postItem images layout size
function imgsLayoutSize(imgCount, space = 4, maxWidth = divice.width) {
	let width,
		height,
		i = 0;
	let imgSize = [];
	switch (true) {
		case imgCount == 1:
			width = maxWidth;
			height = maxWidth / 2;
			imgSize.push({ width, height, marginLeft: space, marginTop: space });
			break;
		case imgCount == 7:
			for (; i < imgCount; i++) {
				if (i == 0) {
					width = maxWidth;
					height = maxWidth / 2;
				} else {
					width = height = (maxWidth - space * 2) / 3;
				}
				imgSize.push({ width, height, marginLeft: space, marginTop: space });
			}
			break;
		case imgCount == 5:
		case imgCount == 8:
			for (; i < imgCount; i++) {
				if (i == 0 || i == 1) {
					width = height = (maxWidth - space) / 2;
				} else {
					width = height = (maxWidth - space * 2) / 3;
				}
				imgSize.push({ width, height, marginLeft: space, marginTop: space });
			}
			break;

		case imgCount == 2:
		case imgCount == 4:
			width = height = (maxWidth - space) / 2;
			for (; i < imgCount; i++) {
				imgSize.push({ width, height, marginLeft: space, marginTop: space });
			}
			break;
		case imgCount == 3:
		case imgCount == 6:
		case imgCount == 9:
			width = height = (maxWidth - space * 2) / 3;
			for (; i < imgCount; i++) {
				imgSize.push({ width, height, marginLeft: space, marginTop: space });
			}
			break;
	}
	return imgSize;
}

function toast(message, timeout = 2000) {
	let toast = Toast.show(message, {
		duration: Toast.durations.LONG,
		position: divice.height / 2,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 100,
		backgroundColor: 'rgba(0,0,0,0.9)'
	});
	setTimeout(function() {
		Toast.hide(toast);
	}, timeout);
}

export { navigationAction, navigationDispatch, userOperationMiddleware, goContentScreen, numberFormat, formatTime, imageSize, imgsLayoutSize, toast };
