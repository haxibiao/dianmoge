import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Toast from "react-native-root-toast";

import Screen from "../../Screen";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import Config from "../../../constants/Config";

import { Header } from "../../../components/Header";
import { DivisionLine, Avatar } from "../../../components/Pure";
import { WriteModal } from "../../../components/Modal";
import SettingType from "../../../components/Setting/SettingType";
import SettingItem from "../../../components/Setting/SettingItem";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { updateUserNameMutation } from "../../../graphql/user.graphql";
import { Mutation } from "react-apollo";

class EditProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		this.nickname = "";
		this.state = {
			modalVisible: false
		};
	}

	_changeAvatar() {
		let _this = this;
		ImagePicker.openPicker({
			width: 400,
			height: 400,
			cropping: true
		})
			.then(image => {
				_this.saveAvatar(image.path);
			})
			.catch(error => {});
	}

	saveAvatar = imagePath => {
		const { token } = this.props.users.user;
		var data = new FormData();
		data.append("avatar", {
			uri: imagePath,
			name: "avatar.jpg",
			type: "image/jpg"
		});

		const config = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data"
			},
			body: data
		};

		let _this = this;
		fetch(Config.ServerRoot + "/api/user/save-avatar?api_token=" + token, config)
			.then(response => response.text())
			.then(avatar => {
				_this.props.dispatch(actions.updateAvatar(avatar, Date.now()));
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		let { navigation } = this.props;
		let { user } = this.props.users;
		let { modalVisible } = this.state;
		return (
			<Screen>
				<View style={styles.container}>
					<ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
						<SettingType typeName={"常规设置"} customStyle={{ borderTopColor: "transparent" }} />
						<TouchableOpacity onPress={this._changeAvatar.bind(this)}>
							<SettingItem itemName="更改头像" rightComponent={<Avatar uri={user.avatar} size={34} />} />
						</TouchableOpacity>
						<TouchableOpacity onPress={this.toggleModalVisible}>
							<View style={styles.settingItem}>
								<SettingItem itemName="修改昵称" rightContent={user.name} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate("简介编辑", { introduction: user.introduction })}>
							<SettingItem itemName="编辑个人简介" rightContent={user.introduction} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate("重置密码")}>
							<SettingItem itemName="重置密码" />
						</TouchableOpacity>
						{
							// 隐藏功能
							// <SettingType typeName={`绑定账号登录${Config.AppDisplayName}`} explain={"出于安全因素，你至少需要保留一种登录方式"} />
							// <TouchableOpacity onPress={() => null}>
							// 	<SettingItem
							// 		horizontal
							// 		leftComponent={
							// 			<View style={{ marginRight: 15 }}>
							// 				<Iconfont name={"email-fill"} size={21} color={user.email ? Colors.linkColor : Colors.tintFontColor} />
							// 			</View>
							// 		}
							// 		rightComponent={
							// 			<View>
							// 				<Text style={styles.settingItemContent}>{user.email ? user.email : "未绑定"}</Text>
							// 			</View>
							// 		}
							// 	/>
							// </TouchableOpacity>
							// <TouchableOpacity onPress={() => null}>
							// 	<SettingItem
							// 		horizontal
							// 		leftComponent={
							// 			<View style={{ marginRight: 15 }}>
							// 				<Iconfont name={"weibo"} size={22} color={user.weibo ? Colors.weiboColor : Colors.tintFontColor} />
							// 			</View>
							// 		}
							// 		rightComponent={
							// 			<View>
							// 				<Text style={styles.settingItemContent}>{user.weibo ? user.weibo.name : "未绑定"}</Text>
							// 			</View>
							// 		}
							// 	/>
							// </TouchableOpacity>
							// <TouchableOpacity onPress={() => null}>
							// 	<SettingItem
							// 		horizontal
							// 		leftComponent={
							// 			<View style={{ marginRight: 15 }}>
							// 				<Iconfont name={"weixin"} size={23} color={user.weixin ? Colors.weixinColor : Colors.tintFontColor} />
							// 			</View>
							// 		}
							// 		rightComponent={
							// 			<View>
							// 				<Text style={styles.settingItemContent}>{user.weixin ? user.weixin.name : "未绑定"}</Text>
							// 			</View>
							// 		}
							// 	/>
							// </TouchableOpacity>
							// <TouchableOpacity onPress={() => null}>
							// 	<SettingItem
							// 		horizontal
							// 		leftComponent={
							// 			<View style={{ marginRight: 15 }}>
							// 				<Iconfont name={"qq"} size={22} color={user.qq ? Colors.qqColor : Colors.tintFontColor} />
							// 			</View>
							// 		}
							// 		rightComponent={
							// 			<View>
							// 				<Text style={styles.settingItemContent}>{user.qq ? user.qq.name : "未绑定"}</Text>
							// 			</View>
							// 		}
							// 	/>
							// </TouchableOpacity>
						}
					</ScrollView>
				</View>
				<Mutation mutation={updateUserNameMutation}>
					{updateUserName => {
						return (
							<WriteModal
								modalName="修改昵称"
								placeholder={user.name}
								visible={modalVisible}
								value={this.nickname}
								handleVisible={this.toggleModalVisible}
								changeVaule={val => {
									this.nickname = val;
								}}
								submit={() => {
									if (this.nickname.length < 1) {
										this.toggleModalVisible();
										return;
									}
									this.toggleModalVisible();
									updateUserName({
										variables: {
											name: this.nickname
										}
									});
									this.props.dispatch(actions.updateName(this.nickname));
								}}
							/>
						);
					}}
				</Mutation>
			</Screen>
		);
	}

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}

	toast(tip) {
		let toast = Toast.show(tip, {
			duration: Toast.durations.LONG,
			position: 70,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 100,
			backgroundColor: Colors.nightColor
		});
		setTimeout(function() {
			Toast.hide(toast);
		}, 2000);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	settingItemContent: {
		fontSize: 17,
		color: Colors.tintFontColor
	}
});

export default connect(store => ({ users: store.users }))(EditProfileScreen);
