import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList, Text, Image, TextInput, Switch, Platform, Dimensions } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import KeyboardSpacer from "react-native-keyboard-spacer";

import { Iconfont } from "../../../utils/Fonts";
import { Header } from "../../../components/Header";
import Colors from "../../../constants/Colors";
import Config from "../../../constants/Config";
import { SlideInUpModal } from "../../../components/Modal";
import Screen from "../../Screen";

import { Query, Mutation, compose, graphql } from "react-apollo";
import { userCategoriesQuery } from "../../../graphql/user.graphql";
import { createCategoryMutation, editCategoryMutation, editCategoryAdminsMutation } from "../../../graphql/category.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

const { width, height } = Dimensions.get("window");

class CreateScreen extends Component {
	constructor(props) {
		super(props);
		//清空category admin_uids
		props.dispatch(actions.editCategoryAdmins([]));
		let category = props.navigation.getParam("category", null);
		this.toggleVisible = this.toggleVisible.bind(this);
		this.state = {
			id: category ? category.id : null,
			logo: category ? category.logo : null,
			name: category ? category.name : "",
			description: category ? category.description : "",
			allow_submit: category ? category.allow_submit : true,
			need_approve: category ? category.need_approve : true,
			modalVisible: false
		};
	}

	render() {
		let { createCategoryMutation, editCategoryMutation, navigation, user, admin_uids } = this.props;
		let { id, logo, name, description, allow_submit, need_approve, modalVisible } = this.state;
		return (
			<Screen>
				<Header
					navigation={navigation}
					routeName={id ? "编辑专题" : "新建专题"}
					rightComponent={
						<TouchableOpacity
							onPress={() => {
								if (id) {
									editCategoryMutation({
										variables: {
											id,
											name,
											description,
											logo,
											allow_submit,
											need_approve
										}
									});
								} else {
									createCategoryMutation({
										variables: {
											name,
											description,
											logo,
											allow_submit,
											need_approve,
											//只接受string类型 id
											admin_uids: admin_uids.toString()
										},
										refetchQueries: result => [
											{
												query: userCategoriesQuery,
												variables: {
													user_id: user.id
												}
											}
										]
									});
								}
								navigation.goBack();
							}}
						>
							<Text
								style={{
									fontSize: 17,
									color: Colors.weixinColor
								}}
							>
								提交
							</Text>
						</TouchableOpacity>
					}
				/>
				<ScrollView style={styles.container} bounces={false}>
					<View style={styles.uploadWrap}>
						<TouchableOpacity style={styles.uploadLogo} onPress={this._uploadLogo.bind(this)}>
							{logo ? (
								<Image source={{ uri: logo }} style={styles.categoryLogo} />
							) : (
								<Iconfont name={"camera"} size={25} color={"#fff"} />
							)}
						</TouchableOpacity>
						<Text
							style={{
								fontSize: 14,
								color: Colors.tintFontColor,
								marginTop: 15
							}}
						>
							{logo ? "点击更换专题图片" : "为你的专题选择一张封面吧"}
						</Text>
					</View>
					<View style={styles.name}>
						<TextInput
							selectionColor={Colors.themeColor}
							textAlignVertical="center"
							underlineColorAndroid="transparent"
							style={[styles.textInputStyle, { height: 30 }]}
							placeholder={"给专题命名(不超过50字)"}
							placeholderTextColor={Colors.tintFontColor}
							onChangeText={name => this.setState({ name })}
							value={name + ""}
						/>
					</View>
					<View style={[styles.describe, { height: height - 376 }]}>
						<TextInput
							selectionColor={Colors.themeColor}
							textAlignVertical="top"
							underlineColorAndroid="transparent"
							multiline={true}
							style={[styles.textInputStyle, { flex: 1 }]}
							placeholder={"为专题添加适当的描述"}
							placeholderTextColor={Colors.tintFontColor}
							onChangeText={description => this.setState({ description })}
							value={description ? description + "" : ""}
						/>
					</View>
					<KeyboardSpacer />
					<View style={styles.settings}>
						<TouchableOpacity style={[styles.settingItem, { marginRight: 7 }]} onPress={this.toggleVisible}>
							<Iconfont name={"fill-setting"} size={14} color={Colors.tintFontColor} style={{ marginRight: 6 }} />
							<Text style={styles.settingText}>投稿需要审核</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("编辑列表", { category: { ...this.state } })}>
							<Text style={[styles.settingText, { marginLeft: 7 }]}>添加管理员</Text>
							<Iconfont name={"right"} size={14} color={Colors.tintFontColor} style={{ marginLeft: 6 }} />
						</TouchableOpacity>
					</View>
					<SlideInUpModal visible={modalVisible} toggleVisible={this.toggleVisible}>
						<View style={styles.settingMenu}>
							<View style={styles.settingMenuItem}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.primaryFontColor
									}}
								>
									专题接受投稿
								</Text>
								<Switch
									value={allow_submit}
									onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
									tintColor={"#ccc"}
									thumbTintColor={allow_submit ? Colors.themeColor : Colors.tintGray}
									onValueChange={value => {
										if (value) {
											this.setState({
												allow_submit: value
											});
										} else {
											this.setState({
												allow_submit: false,
												need_approve: false
											});
										}
									}}
								/>
							</View>
							<View style={styles.settingMenuItem}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.primaryFontColor
									}}
								>
									投稿需要管理审核
								</Text>
								<Switch
									value={need_approve}
									onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
									tintColor={"#ccc"}
									thumbTintColor={need_approve ? Colors.themeColor : Colors.tintGray}
									onValueChange={value => {
										this.setState({
											need_approve: value
										});
									}}
								/>
							</View>
							<TouchableOpacity style={styles.close} onPress={this.toggleVisible}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.themeColor
									}}
								>
									取消
								</Text>
							</TouchableOpacity>
						</View>
					</SlideInUpModal>
				</ScrollView>
			</Screen>
		);
	}

	_uploadLogo() {
		ImagePicker.openPicker({
			width: 400,
			height: 400,
			cropping: true
		})
			.then(image => {
				//optimistic ui update
				this.setState({
					logo: image.path
				});

				const { token } = this.props.user;
				var data = new FormData();
				data.append("logo", {
					uri: image.path,
					name: "logo.jpg",
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
				fetch(Config.ServerRoot + "/api/category/new-logo?api_token=" + token, config)
					.then(response => response.text())
					.then(logo => {
						// real ui update
						_this.setState({
							logo
						});
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(error => {
				console.log(err);
			});
	}

	toggleVisible() {
		this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		paddingBottom: 80
	},
	uploadWrap: {
		alignItems: "center",
		paddingVertical: 40
	},
	uploadLogo: {
		width: 80,
		height: 80,
		borderRadius: 4,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center"
	},
	categoryLogo: {
		width: 80,
		height: 80,
		borderRadius: 4,
		resizeMode: "cover"
	},
	textInputStyle: {
		fontSize: 17,
		color: Colors.primaryFontColor,
		lineHeight: 23,
		padding: 0
	},
	name: {
		padding: 15,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor
	},
	describe: {
		paddingVertical: 20,
		paddingHorizontal: 15
	},
	settings: {
		height: 50,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15
	},
	settingItem: {
		height: 30,
		flex: 1,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		borderRadius: 3,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	settingText: {
		fontSize: 14,
		color: Colors.tintFontColor
	},
	settingMenu: {
		paddingHorizontal: 15
	},
	settingMenuItem: {
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	close: {
		justifyContent: "center",
		alignItems: "center",
		height: 50
	}
});

export default connect(store => ({ user: store.users.user, admin_uids: store.categories.admin_uids }))(
	compose(graphql(createCategoryMutation, { name: "createCategoryMutation" }), graphql(editCategoryMutation, { name: "editCategoryMutation" }))(
		CreateScreen
	)
);
