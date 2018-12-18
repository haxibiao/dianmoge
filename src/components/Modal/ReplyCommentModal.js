import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import BasicModal from "./BasicModal";
import SearchUserModal from "./SearchUserModal";

import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");

class ReplyCommentModal extends Component {
	constructor(props) {
		super(props);
		this.atUser = null;
		this.toggleVisible = this.toggleVisible.bind(this);
		this.state = {
			aiteModalVisible: false,
			body: ""
		};
	}

	// 输入框聚焦自带检测是否应该加上@用户名
	_inputFocus() {
		let { body } = this.state;
		if (body.indexOf(`@${this.props.atUser.name}`) !== 0) {
			body = `@${this.props.atUser.name} `;
			this.setState({ body });
		}
	}

	render() {
		const { visible, toggleReplyComment, replyComment, replyingComment, atUser, navigation } = this.props;
		let { aiteModalVisible, body } = this.state;

		return (
			<BasicModal
				visible={visible}
				handleVisible={toggleReplyComment}
				customStyle={{
					width,
					position: "absolute",
					bottom: 0,
					left: 0,
					borderRadius: 0
				}}
			>
				<View>
					<TextInput
						textAlignVertical="top"
						underlineColorAndroid="transparent"
						multiline={true}
						autoFocus
						style={styles.textInput}
						onFocus={this._inputFocus.bind(this)}
						onChangeText={body => {
							this.setState({ body });
						}}
						value={body}
					/>
					<View style={styles.textBottom}>
						<View style={styles.textBottom}>
							<TouchableOpacity onPress={this.toggleVisible}>
								<Iconfont name="aite" size={22} color={Colors.lightFontColor} style={{ marginHorizontal: 10 }} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.setState(prevState => ({ body: prevState.body + "🙂" }));
								}}
							>
								<Iconfont name="smile" size={22} color={Colors.lightFontColor} style={{ marginHorizontal: 10 }} />
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={() => {
								toggleReplyComment();
								replyComment({
									body,
									replyingComment,
									atUser
								});
								this.setState({ body: "" });
							}}
							style={styles.publishComment}
						>
							<Text
								style={{
									fontSize: 14,
									color: Colors.weixinColor,
									textAlign: "center"
								}}
							>
								发表评论
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<SearchUserModal
					navigation={navigation}
					visible={aiteModalVisible}
					toggleVisible={this.toggleVisible}
					handleSelectedUser={user => {
						this.toggleVisible();
						this.atUser = user;
						this.setState(prevState => ({ body: prevState.body + `@${this.atUser.name} ` }));
					}}
				/>
			</BasicModal>
		);
	}

	toggleVisible() {
		this.setState(prevState => ({ aiteModalVisible: !prevState.aiteModalVisible }));
	}
}

const styles = StyleSheet.create({
	textInput: {
		height: 80,
		padding: 10,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		borderRadius: 3
	},
	textBottom: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	publishComment: {
		width: 80,
		height: 30,
		borderWidth: 1,
		borderColor: Colors.weixinColor,
		borderRadius: 3,
		justifyContent: "center"
	}
});

export default withNavigation(ReplyCommentModal);
