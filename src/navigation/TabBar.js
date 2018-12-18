/*
* @flow
* created by wyk made in 2018-12-06 20:16:58
*/
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomTabBar } from 'react-navigation';
import { connect } from 'react-redux';
import { Theme, PxFit, Colors } from '../constants';
import { Iconfont } from '../utils/fonts';

class TabBar extends React.Component {
	renderItem = (route, index) => {
		const { navigation, onTabPress, renderIcon, login } = this.props;
		const focused = index === navigation.state.index;
		const scene = {
			index,
			focused,
			route
		};
		return (
			<TouchableWithoutFeedback key={route.key} onPress={() => onTabPress({ route })}>
				<View style={styles.tabItem}>{renderIcon(scene)}</View>
			</TouchableWithoutFeedback>
		);
	};

	renderCreate() {
		const { navigation, login } = this.props;
		return (
			<TouchableOpacity
				key={'creation'}
				onPress={() => navigation.navigate(login ? '发布动态' : '登录注册')}
				onLongPress={() => navigation.navigate(login ? '创作' : '登录注册')}
			>
				<View>
					<Iconfont name={'fill-add'} size={38} color={Colors.themeColor} />
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		const { navigation } = this.props;
		const { routes } = navigation.state;
		const createItem = this.renderCreate();
		let routerItem = routes && routes.map((route, index) => this.renderItem(route, index));
		routerItem.splice(2, 0, createItem);
		return <View style={styles.tabBar}>{routerItem}</View>;
	}
}

const styles = {
	tabBar: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		borderTopWidth: PxFit(0.5),
		borderTopColor: Theme.defaultBorderColor,
		backgroundColor: '#fff',
		marginBottom: PxFit(Theme.HOME_INDICATOR_HEIGHT)
	},
	tabItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		position: 'relative'
	}
};

export default TabBar;
