import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, Switch } from "react-native";

import { Colors } from "../../constants";
import { Header } from "../../components/Header";
import SettingType from "../../components/Setting/SettingType";
import SettingItem from "../../components/Setting/SettingItem";
import Screen from "../Screen";

import { Query, Mutation } from "react-apollo";

class SettingScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mute: false,
			voice: true,
			shake: true,
			comment: true,
			message: true,
			request: true,
			like: true,
			follow: true,
			reward: true
		};
	}

	render() {
		let { navigation } = this.props;
		let { mute, voice, shake, comment, message, request, like, follow, reward } = this.state;
		return (
			<Screen>
				<View style={styles.container}>
					<ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
						<SettingItem
							endItem
							itemName="免打扰"
							explain={"开启后在设定时间段收到新的消息将不会震动或响铃"}
							rightComponent={
								<View style={{ marginLeft: 10 }}>
									<Switch
										value={mute}
										onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
										tintColor={"#ccc"}
										thumbTintColor={mute ? Colors.themeColor : Colors.tintGray}
										onValueChange={value => {
											this.setState({
												mute: value
											});
										}}
									/>
								</View>
							}
						/>
						<SettingType typeName={"提醒方式"} />
						<View>
							<SettingItem
								itemName="声音提醒"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && voice}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && voice ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													voice: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								endItem
								itemName="震动提醒"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && shake}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && shake ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													shake: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<SettingType typeName={"推送项目"} />
						<View>
							<SettingItem
								itemName="评论"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && comment}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && comment ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													comment: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								itemName="消息"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && message}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && message ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													message: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								itemName="投稿请求"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && request}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && request ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													request: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								itemName="喜欢和赞"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && like}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && like ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													like: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								itemName="关注"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && follow}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && follow ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													follow: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
						<View>
							<SettingItem
								itemName="赞赏和付费"
								rightComponent={
									<View style={{ marginLeft: 10 }}>
										<Switch
											value={!mute && reward}
											onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
											tintColor={"#ccc"}
											thumbTintColor={!mute && reward ? Colors.themeColor : Colors.tintGray}
											onValueChange={value => {
												this.setState({
													reward: value
												});
											}}
										/>
									</View>
								}
							/>
						</View>
					</ScrollView>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default SettingScreen;
