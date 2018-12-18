import Config from '../../constants/Config';
import { CameraRoll, Platform, PermissionsAndroid } from 'react-native';
import QRCodeImage from '../../native/QRCodeImage';

export default async function detectVideos() {
	let r = await CameraRoll.getPhotos({
		first: 1,
		assetType: 'Videos'
	});

	let videos = r.edges;
	console.log('相册视频top1:', { videos });

	for (var i = 0; i < videos.length; i++) {
		let video = videos[i];
		console.log(video);
		let videoPath = video.node.image.uri;

		//promise...
		let decodePromise = new Promise((resolve, reject) => {
			QRCodeImage.decodeVideo(videoPath, (error, result) => {
				console.log('QRCode video error:', error);
				console.log('QRCode video result:', result);
				if (result) {
					if (result.indexOf('/video/') !== -1 || result.indexOf('/post/') !== -1) {
						let video_id = result
							.replace(Config.ServerRoot, '')
							.replace('/video/', '')
							.replace('/post/', '');
						console.log('视频id:', video_id);
						if (!isNaN(video_id)) {
							let info = {
								type: 'video',
								id: video_id
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
