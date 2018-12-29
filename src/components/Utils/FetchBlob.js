import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

function download({ url, id, onSuccessed, onFailed }) {
	return new Promise((resolve, reject) => {
		LoadingProgress.show();
		let dirs = RNFetchBlob.fs.dirs;
		console.log('dirs', dirs);
		let options = {};
		if (Platform.OS === 'android') {
			options = {
				path: dirs.DCIMDir + '/' + id + '.mp4'
			};
		} else {
			options = {
				path: dirs.DocumentDir + '/' + id + '.mp4'
				// fileCache: true,
				// appendExt: 'mp4'
			};
		}
		RNFetchBlob.config(options)
			.fetch('GET', url, {
				//some headers ..
			})
			// listen to download progress event
			.progress((received, total) => {
				console.log('rn fetch blob progress', received / total);
				LoadingProgress.progress((received / total) * 100);
			})
			.then(res => {
				//不加水印的视频直接在相册了，需要扫描相册
				if (Platform.OS === 'android') {
					RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'video/mp4' }]);
				}
				let filepath = res.path();
				console.log('rn fetch file saved to ', filepath);

				//TODO:: fetch-blob在0.57有bug,需要等待merge...
				let file_exist = RNFetchBlob.fs
					.exists(filepath)
					.then(exist => {
						console.log(`file ${exist ? '' : 'not'} exists`);
					})
					.catch(() => {});

				LoadingProgress.hide();
				onSuccessed && onSuccessed();
				resolve(filepath);
			})
			.catch(error => {
				console.log('error', error);
				LoadingProgress.hide();
				onFailed && onFailed();
				reject(error);
			});
	});
}

export default { download };
