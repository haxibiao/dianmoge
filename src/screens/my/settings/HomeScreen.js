import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions, Switch } from 'react-native';
import codePush from 'react-native-code-push';

import Screen from '../../Screen';
import Config from '../../../constants/Config';
import { Colors } from '../../../constants';
import { Iconfont } from '../../../utils/Fonts';

import { Header } from '../../../components/Header';
import { Avatar } from '../../../components/Pure';
import { BasicModal, DialogModal } from '../../../components/Modal';
import SettingItem from '../../../components/Setting/SettingItem';

import { connect } from 'react-redux';
import actions from '../../../store/actions';
import { Storage } from '../../../store/localStorage';
import { NavigationActions } from 'react-navigation';
import { withApollo } from 'react-apollo';

import { unreadsQuery } from '../../../graphql/notification.graphql';

const { width, height } = Dimensions.get('window');

// 退出账号 navigateAction
const navigateAction = NavigationActions.navigate({
	routeName: '主页',
	params: { resetStore: () => this.props.client.resetStore() },
	action: NavigationActions.navigate({ routeName: '个人' })
});

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.handlePromotModalVisible = this.handlePromotModalVisible.bind(this);
		this.handleFontModalVisible = this.handleFontModalVisible.bind(this);
		this.state = {
			promotModalVisible: false,
			fontModalVisible: false,
			wordSize: ['小号字', '中号字(默认)', '大号字'],
			checkedWordSize: 1,
			dialog: '',
			storageSize: '当前缓存1.2Mb',
			addWatermark: props.addWatermark
		};
	}

	render() {
		let { promotModalVisible, fontModalVisible, dialog, storageSize, wordSize, checkedWordSize } = this.state;
		const { navigation, users, addWatermark, client, dispatch } = this.props;
		const { login } = users;
		return (
			<Screen>
				<View style={styles.container}>
					<ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
						{
							// <TouchableOpacity onPress={() => this.navigateMiddlewear("赞赏设置")}>
							// 	<SettingItem itemName="赞赏设置" />
							// </TouchableOpacity>
							// <TouchableOpacity onPress={this.handleFontModalVisible}>
							// 	<SettingItem itemName="字号设置" />
							// </TouchableOpacity>
						}
						<SettingItem
							itemName="分享推广"
							rightComponent={
								<View style={{ marginLeft: 10 }}>
									<Switch
										value={addWatermark}
										onTintColor={'rgba(104, 175, 255, 0.3)'}
										tintColor={'#ccc'}
										thumbTintColor={addWatermark ? '#68afff' : Colors.shade4}
										onValueChange={value => {
											dispatch(actions.addWatermark(value));
										}}
									/>
								</View>
							}
						/>
						<TouchableOpacity onPress={() => navigation.navigate('推送通知')}>
							<SettingItem itemName="推送通知" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.navigateMiddlewear('黑名单')}>
							<SettingItem itemName="黑名单" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.navigateMiddlewear('回收站')}>
							<SettingItem itemName="回收站" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('用户协议')}>
							<SettingItem itemName="用户协议" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('隐私政策')}>
							<SettingItem itemName="隐私政策" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (storageSize.length > 0) {
									this.setState({ dialog: '确认清除缓存内容吗？' });
									this.handlePromotModalVisible();
								}
							}}
						>
							<SettingItem rightSize={15} itemName="清除缓存" rightContent={storageSize} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								codePush.sync({
									updateDialog: true,
									installMode: codePush.InstallMode.IMMEDIATE
								});
							}}
						>
							<SettingItem itemName="版本更新" explain={'当前版本: ' + Config.AppVersion} />
						</TouchableOpacity>

						{login && (
							<View
								style={{
									marginVertical: 25,
									alignItems: 'center'
								}}
							>
								<TouchableOpacity
									onPress={() => {
										this.setState({ dialog: '确定退出当前账号？' });
										this.handlePromotModalVisible();
									}}
									style={styles.loginOut}
								>
									<Text
										style={{
											fontSize: 17,
											color: Colors.themeColor
										}}
									>
										退出当前账号
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>
				</View>
				<DialogModal
					dialog={dialog}
					visible={promotModalVisible}
					handleVisible={this.handlePromotModalVisible}
					confirm={() => {
						if (dialog == '确定退出当前账号？') {
							dispatch(actions.signOut());
							dispatch(actions.updateUnreads(0));
							navigation.dispatch(navigateAction);
							this.handlePromotModalVisible();
						} else if (dialog == '确认清除缓存内容吗？') {
							this.clearCache();
						}
					}}
				/>
				<BasicModal
					customStyle={{ width: width - 60, paddingBottom: 0 }}
					visible={fontModalVisible}
					handleVisible={this.handleFontModalVisible}
					header={<Text style={{ fontSize: 14, color: Colors.themeColor }}>显示设置</Text>}
				>
					<View>
						<View>
							{wordSize.map((elem, index) => {
								return (
									<TouchableOpacity
										key={index}
										style={styles.fontSetting}
										onPress={() => this.setState({ checkedWordSize: index })}
									>
										<Text style={styles.wordSize}>{elem}</Text>
										{checkedWordSize == index ? (
											<Iconfont name="radio-check" size={22} color={Colors.themeColor} />
										) : (
											<Iconfont name="radio-uncheck" size={22} color={Colors.themeColor} />
										)}
									</TouchableOpacity>
								);
							})}
						</View>
						<View style={styles.wordSizeModalFooter}>
							<TouchableOpacity
								style={styles.fontOperation}
								onPress={() => {
									this.handleFontModalVisible();
									this.setState({ checkedWordSize: 1 });
								}}
							>
								<Text style={{ fontSize: 15, color: Colors.primaryFontColor }}>取消</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.fontOperation} onPress={this.handleFontModalVisible}>
								<Text style={{ fontSize: 15, color: Colors.themeColor }}>确定</Text>
							</TouchableOpacity>
						</View>
					</View>
				</BasicModal>
			</Screen>
		);
	}

	handlePromotModalVisible() {
		this.setState(prevState => ({
			promotModalVisible: !prevState.promotModalVisible
		}));
	}

	handleFontModalVisible() {
		this.setState(prevState => ({
			fontModalVisible: !prevState.fontModalVisible
		}));
	}

	navigateMiddlewear(routeName) {
		let { navigation, users } = this.props;
		if (users.login) {
			navigation.navigate(routeName);
		} else {
			navigation.navigate('登录注册', { login: true });
		}
	}

	clearCache = () => {
		this.setState({ dialog: '', storageSize: '' });
		this.handlePromotModalVisible();
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	settingItemContent: {
		fontSize: 17,
		color: Colors.tintFontColor
	},
	settingItemName: {
		fontSize: 17,
		color: Colors.primaryFontColor,
		paddingRight: 10,
		paddingBottom: 5
	},
	loginOut: {
		borderWidth: 1,
		borderColor: Colors.themeColor,
		borderRadius: 4,
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	fontSetting: {
		paddingVertical: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	wordSize: {
		fontSize: 17,
		color: Colors.primaryFontColor
	},
	wordSizeModalFooter: {
		marginTop: 20,
		marginHorizontal: -20,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	fontOperation: {
		paddingVertical: 15,
		paddingHorizontal: 20
	}
});

export default connect(store => {
	return { users: store.users, addWatermark: store.users.addWatermark };
})(withApollo(HomeScreen));
