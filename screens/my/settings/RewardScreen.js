import React, { Component } from "react";
import { StyleSheet, View, Switch, Text, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import SettingItem from "../../../components/Setting/SettingItem";
import Screen from "../../Screen";

// import { commentsQuery, addCommentMutation } from "../../../graphql/comment.graphql";
import { Query, Mutation } from "react-apollo";

class ResetPasswordScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rewarding: true,
			loose: false
		};
	}

	render() {
		const { navigation } = this.props;
		const { rewarding, loose } = this.state;
		return (
			<Screen>
				<Header navigation={navigation} routeName="赞赏设置" />
				<View style={styles.container}>
					<View>
						<SettingItem
							endItem
							itemName="赞赏功能"
							rightComponent={
								<View style={{ marginLeft: 10 }}>
									<Switch
										value={rewarding}
										onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
										tintColor={"#ccc"}
										thumbTintColor={rewarding ? Colors.themeColor : Colors.tintGray}
										onValueChange={value => {
											this.setState({
												rewarding: value
											});
										}}
									/>
								</View>
							}
						/>
					</View>
					<View style={styles.settingStateWrap}>
						<Text style={styles.settingState}>{rewarding ? "已启用,赞赏按钮会出现在您的文章底部" : "开启后,赞赏按钮会出现在您的文章底部"}</Text>
					</View>
					<View>
						<SettingItem
							endItem
							itemName="开启小额免密支付功能"
							rightComponent={
								<View style={{ marginLeft: 10 }}>
									<Switch
										value={loose}
										onTintColor={`rgba(${Colors.rgbThemeColor},0.3)`}
										tintColor={"#ccc"}
										thumbTintColor={loose ? Colors.themeColor : Colors.tintGray}
										onValueChange={value => {
											this.setState({
												loose: value
											});
										}}
									/>
								</View>
							}
						/>
					</View>
					<View style={styles.settingStateWrap}>
						<Text style={styles.settingState}>{loose ? "已启用,低于10.00元的支付不用输入密码" : "开启后,低于10.00元的支付不用输入密码"}</Text>
					</View>
					<TouchableOpacity
						style={{ borderBottomWidth: 1, borderBottomColor: Colors.lightBorderColor }}
						onPress={() => navigation.navigate("更改赞赏描述")}
					>
						<SettingItem endItem itemName="更改赞赏描述" />
					</TouchableOpacity>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	settingStateWrap: {
		paddingTop: 8,
		paddingBottom: 16,
		paddingHorizontal: 15,
		backgroundColor: Colors.lightGray
	},
	settingState: {
		fontSize: 13,
		color: Colors.tintFontColor
	}
});

export default ResetPasswordScreen;
