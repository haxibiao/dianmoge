export default defineActionConstants([
	//首页
	'UPDATE_UNREADS',

	//登录
	'SIGN_IN',
	'SIGN_OUT',

	//用户
	'UPDATE_AVATAR',
	'UPDATE_NAME',
	'UPDATE_INTRODUCTION',
	'UPDATE_RESOURCE_COUNT',
	'UPDATA_PASSWORD',

	//二维码分享
	'QRCODE_TO_USER',

	//专题
	'EDIT_CATEGORY_ADMINS',

	// 本地缓存
	'CLEAR_ALL',

	// screen status
	'ADD_WATER_MARKE',
	'SHOW_LOADING_SPINNER',
	'HIDDEN_LOADING_SPINNER'
]);

function defineActionConstants(names) {
	return names.reduce((result, name) => {
		result[name] = name;
		return result;
	}, {});
}
