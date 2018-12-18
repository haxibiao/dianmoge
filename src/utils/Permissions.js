import { Platform, PermissionsAndroid } from 'react-native';

async function requestAndroidPhotosPermission() {
	try {
		let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			console.log('WRITE_EXTERNAL_STORAGE permission request denied');
		}
		granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			console.log('READ_EXTERNAL_STORAGE permission request denied');
		}
	} catch (err) {
		console.warn('外部存储卡读写权限请求失败:', err);
	}
}

async function check() {
	if (Platform.OS === 'android') {
		await requestAndroidPhotosPermission();
	}
}

export default {
	check
};
