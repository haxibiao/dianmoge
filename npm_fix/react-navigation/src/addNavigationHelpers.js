/*
* created by wyk made in 2018-12-07 14:23:16
*/
/* Helpers for navigation */
import NavigationActions from './NavigationActions';
import invariant from './utils/invariant';

export default function(navigation) {
	// 添加点击判断
	let debounce = true;
	return {
		...navigation,
		goBack: key => {
			let actualizedKey = key;
			if (key === undefined && navigation.state.key) {
				invariant(typeof navigation.state.key === 'string', 'key should be a string');
				actualizedKey = navigation.state.key;
			}
			return navigation.dispatch(NavigationActions.back({ key: actualizedKey }));
		},
		// 修复快速点击造成的重复跳转
		navigate: (routeName, params, action) => {
			if (debounce) {
				debounce = false;
				navigation.dispatch(
					NavigationActions.navigate({
						routeName,
						params,
						action
					})
				);
				setTimeout(() => {
					debounce = true;
				}, 500);
				return true;
			}
			return false;
		},
		pop: (n, params) => navigation.dispatch(NavigationActions.pop({ n, immediate: params && params.immediate })),
		popToTop: params => navigation.dispatch(NavigationActions.popToTop({ immediate: params && params.immediate })),
		/**
		 * For updating current route params. For example the nav bar title and
		 * buttons are based on the route params.
		 * This means `setParams` can be used to update nav bar for example.
		 */
		setParams: params => {
			invariant(navigation.state.key && typeof navigation.state.key === 'string', 'setParams cannot be called by root navigator');
			const key = navigation.state.key;
			return navigation.dispatch(NavigationActions.setParams({ params, key }));
		},

		getParam: (paramName, defaultValue) => {
			const params = navigation.state.params;

			if (params && paramName in params) {
				return params[paramName];
			}

			return defaultValue;
		},

		push: (routeName, params, action) => navigation.dispatch(NavigationActions.push({ routeName, params, action })),

		replace: (routeName, params, action) =>
			navigation.dispatch(
				NavigationActions.replace({
					routeName,
					params,
					action,
					key: navigation.state.key
				})
			)
	};
}
