import actions from '../actions';
import types from '../types';
import { Storage, ItemKeys } from '../localStorage';

export async function rememberUser({ action, getState, dispatch }) {
	let store = getState();
	console.log('member user:', store.users.user);
	await Storage.setItem(ItemKeys.user, store.users.user);
}

export async function forgetUser({ action, getState, dispatch }) {
	await Storage.removeItem(ItemKeys.user);
}

export async function addWatermark({ action, getState, dispatch }) {
	await Storage.setItem(ItemKeys.addWatermark, action.status);
}
