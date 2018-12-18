import Config from '../../constants/Config';
import { CameraRoll, Platform, PermissionsAndroid } from 'react-native';
import QRCodeImage from '../../native/QRCodeImage';

export default async function detectPhotos() {
	let r = await CameraRoll.getPhotos({
		first: 1,
		assetType: 'Photos'
	});

	let photos = r.edges;
	console.log('相册图片top1:', { photos });

	for (var i = 0; i < photos.length; i++) {
		let photo = photos[i];
		console.log(photo);
		let path = photo.node.image.uri;

		//promise...
		let decodePromise = new Promise((resolve, reject) => {
			QRCodeImage.decode(path, (error, result) => {
				console.log('QRCode error:', error);
				console.log('QRCode result:', result);
				if (result) {
					if (result.indexOf('/video/') !== -1 || result.indexOf('/post/') !== -1) {
						let post_id = result
							.replace(Config.ServerRoot, '')
							.replace('/video/', '')
							.replace('/post/', '');
						console.log('视频post id:', post_id);
						if (!isNaN(post_id)) {
							let info = {
								type: 'video',
								id: post_id
							};
							return resolve(info);
						}
					}
					if (result.indexOf('/user/') !== -1) {
						let user_id = result.replace(Config.ServerRoot, '').replace('/user/', '');
						console.log('用户id:', user_id);
						if (!isNaN(user_id)) {
							let info = {
								type: 'user',
								id: user_id
							};
							return resolve(info);
						}
					}
				}
				return resolve(false);
			});
		});
		return await decodePromise;
	}
	return null;
}
