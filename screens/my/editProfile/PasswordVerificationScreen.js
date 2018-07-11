import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

import Screen from "../../Screen";
import Colors from "../../../constants/Colors";
import { Button } from "../../../components/Button";
import Header from "../../../components/Header/Header";
import SettingItem from "../../../components/Setting/SettingItem";

import { connect } from "react-redux";
import actions from "../../../store/actions";
// import { commentsQuery, addCommentMutation } from "../../../graphql/comment.graphql";
import { updateUserPasswordMutation } from "../../../graphql/user.graphql";
import { Query, Mutation } from "react-apollo";

class PasswordVerificationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldpassword: "",
			password: "",
			disabled: true
		};
	}

	render() {
		let { oldpassword, password, disabled } = this.state;
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<View style={{ height: 10, backgroundColor: Colors.lightGray }} />
					<View style={styles.textWrap}>
						<TextInput
							textAlignVertical="center"
							underlineColorAndroid="transparent"
							placeholder="请输入当前密码"
							placeholderText={Colors.tintFontColor}
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							onChangeText={oldpassword => {
								this.setState({ oldpassword });
							}}
							secureTextEntry={true}
						/>
					</View>
					<View style={styles.textWrap}>
						<TextInput
							textAlignVertical="center"
							underlineColorAndroid="transparent"
							placeholder="请输入新密码"
							placeholderText={Colors.tintFontColor}
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							onChangeText={password => {
								this.setState({ password });
							}}
							secureTextEntry={true}
						/>
					</View>
					{/*<View style={styles.textWrap}>
						<TextInput
							textAlignVertical="center"
							underlineColorAndroid="transparent"
							placeholder="请再次输入新密码"
							placeholderText={Colors.tintFontColor}
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							onChangeText={password => this.setState({ password })}
							secureTextEntry={true}
						/>
					</View>*/}
					<View style={{ margin: 15, height: 48 }}>
						<Mutation mutation={updateUserPasswordMutation}>
							{updateUserPassword => {
								return (
									<Button
										name="完成"
										handler={() => {
											updateUserPassword({
												variables: {
													oldpassword,
													password
												}
											});
											this.props.dispatch(actions.updatePassword(password));
											navigation.goBack();
										}}
										disabled={oldpassword && password && password ? false : true}
									/>
								);
							}}
						</Mutation>
					</View>
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
	textWrap: {
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	textInput: {
		fontSize: 16,
		color: Colors.primaryFontColor,
		padding: 0,
		height: 50
	}
});

export default connect(store => ({
	user: store.users.user
}))(PasswordVerificationScreen);
