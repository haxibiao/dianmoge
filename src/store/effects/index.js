import types from '../types';
import { rememberUser, forgetUser, addWatermark } from './StorageAsync';

function genericErrorHandler({ action, dispatch, error }) {
	console.log({ error, action });
}

export default [
	{
		action: types.ADD_WATER_MARKE,
		effect: addWatermark,
		error: genericErrorHandler
	},
	{
		action: types.SIGN_IN,
		effect: rememberUser,
		error: genericErrorHandler
	},
	{
		action: types.QRCODE_TO_USER,
		effect: rememberUser,
		error: genericErrorHandler
	},

	{
		action: types.UPDATE_AVATAR,
		effect: rememberUser,
		error: genericErrorHandler
	},

	{
		action: types.UPDATE_NAME,
		effect: rememberUser,
		error: genericErrorHandler
	},

	{
		action: types.UPDATE_INTRODUCTION,
		effect: rememberUser,
		error: genericErrorHandler
	},
	{
		action: types.UPDATA_PASSWORD,
		effect: rememberUser,
		error: genericErrorHandler
	},
	{
		action: types.SIGN_OUT,
		effect: forgetUser,
		error: genericErrorHandler
	}
];
