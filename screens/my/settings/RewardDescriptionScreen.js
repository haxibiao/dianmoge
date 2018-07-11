import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";

import { updateUserIntroductionMutation } from "../../../graphql/user.graphql";
import { Query, Mutation } from "react-apollo";

class RewardDescriptionScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reward_description: ""
		};
	}

	render() {
		const { navigation } = this.props;
		const { reward_description } = this.state;
		return (
			<Screen>
				<Mutation mutation={updateUserIntroductionMutation}>
					{updateUserIntroduction => {
						return (
							<Header
								routeName="更改赞赏描述"
								navigation={navigation}
								rightComponent={
									<TouchableOpacity
										onPress={() => {
											// updateUserIntroduction({
											// 	variables: {
											// 		reward_description
											// 	}
											// });
											// this.props.dispatch(actions.updateIntroduction(reward_description));
											navigation.goBack();
										}}
									>
										<Text
											style={{
												fontSize: 17,
												color: Colors.themeColor
											}}
										>
											确定
										</Text>
									</TouchableOpacity>
								}
							/>
						);
					}}
				</Mutation>
				<View style={styles.container}>
					<View style={styles.inputContainer}>
						<TextInput
							textAlignVertical="top"
							underlineColorAndroid="transparent"
							placeholder="如果觉得我的文章对你有帮助，请随意赞赏。您的支持将鼓励我继续创作！"
							placeholderText={Colors.tintFontColor}
							selectionColor={Colors.themeColor}
							multiline={true}
							autoFocus
							style={styles.textInput}
							onChangeText={reward_description => this.setState({ reward_description })}
							value={reward_description + ""}
						/>
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
	inputContainer: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		padding: 15
	},
	textInput: {
		height: 80,
		padding: 0,
		fontSize: 16,
		color: Colors.primaryFontColor,
		lineHeight: 24
	}
});

export default connect(store => ({
	user: store.users.user
}))(RewardDescriptionScreen);
