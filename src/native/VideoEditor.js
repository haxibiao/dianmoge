'use strict';

import { NativeModules, DeviceEventEmitter, NativeEventEmitter, Platform } from 'react-native';

export type EditEvent = 'progress' | 'completed';

export type StartArgs = {
	url: string,
	fileName: string,
	picTop: string,
	picBottom: string,
	taskId?: number
};

let module = NativeModules.VideoEditor;
let eventPrefix = 'VideoEditor-';
let deviceEmitter = Platform.OS == 'android' ? DeviceEventEmitter : new NativeEventEmitter(module);

//addWatermark
const addWatermark = (videoPath: String, watermark1: String, watermark2: String) => module.addWatermark(videoPath, watermark1, watermark2);

//addListner
const addListener = (eventType: EditEvent, callback: Function) => {
	return deviceEmitter.addListener(eventPrefix + eventType, data => {
		// console.log('eventType:', eventType);
		// console.log(data);
		if (data) {
			callback(data);
		}
	});
};

export default { addListener, addWatermark };
