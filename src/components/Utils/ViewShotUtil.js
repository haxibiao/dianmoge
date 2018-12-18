import { CameraRoll, Platform, PermissionsAndroid } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { Divice, Methods } from '../../constants';

let savePicture = (function() {
	if (Divice.isIos) {
		return function(uri) {
			CameraRoll.saveToCameraRoll(uri, 'photo');
			Methods.toast('保存成功');
		};
	} else {
		return async function(uri) {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
					title: '需要访问您的相册',
					message: '保存图片需要您开启该权限'
				});
				CameraRoll.saveToCameraRoll(uri, 'photo');
				Methods.toast('保存成功');
				return granted;
			} catch (err) {
				console.error('Failed to request permission ', err);
				Methods.toast('保存失败');
				return null;
			}
		};
	}
})();

class ViewShotUtil {
	static capture = viewRef => {
		return new Promise((resolve, reject) => {
			captureRef(viewRef).then(
				uri => {
					console.log('capture Image saved to', uri);
					resolve(uri);
				},
				error => console.error('Oops, snapshot failed', error)
			);
		});
	};

	static saveImage = savePicture;
}

export default ViewShotUtil;
