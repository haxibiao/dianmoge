import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

function download({ url, scan, id, onSuccessed, onFailed }) {
	return new Promise((resolve, reject) => {
		console.log('download and scan? ', scan);
		LoadingProgress.show();

		let dirs = RNFetchBlob.fs.dirs;
		RNFetchBlob.config({
			// DCIMDir is in external storage
			path: dirs.DCIMDir + '/' + id + '.mp4'

			// this is much more performant.
			// useDownloadManager: true,

			// fileCache: true,
			// appendExt: 'mp4'
		})
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
					if (scan) {
						RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'video/mp4' }]);
					}
				}
				// the temp file path
				console.log('The file saved to ', res.path());
				LoadingProgress.hide();
				onSuccessed && onSuccessed();
				resolve(res.path());
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
