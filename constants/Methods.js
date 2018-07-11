import { NavigationActions } from "react-navigation";

//navigation.dispatch(navigationAction)
function navigationAction({ routeName, params = null, action = null, key = routeName + Math.random().toString() }) {
	return NavigationActions.navigate({
		routeName,
		params,
		action,
		key
	});
}

//需要登录验证的操作
function userOperationMiddleware({ login, action, navigation }) {
	if (login) {
		action();
	} else {
		navigation.dispatch(navigationAction({ routeName: "登录注册" }));
	}
}

export { navigationAction, userOperationMiddleware };
