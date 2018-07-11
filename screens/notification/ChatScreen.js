import React, { Component } from "react";
import { SectionList, FlatList, Image, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { GiftedChat, Bubble, Send, Composer, InputToolbar } from "react-native-gifted-chat";
import { HeaderLeft, HeaderRight, Header } from "../../components/Header";
import { ReportModal } from "../../components/Modal";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import Screen from "../Screen";

import { connect } from "react-redux";
import { Query, Mutation, withApollo, compose, graphql } from "react-apollo";
import { chatsQuery, chatQuery, messagesQuery, sendMessageMutation } from "../../graphql/chat.graphql";
import { blockUserMutation, blockedUsersQuery } from "../../graphql/user.graphql";

class ChatScreen extends React.Component {
	constructor(props) {
		super(props);
		this.handleReportVisible = this.handleReportVisible.bind(this);
		this.renderInputToolbar = this.renderInputToolbar.bind(this);
		this.renderComposer = this.renderComposer.bind(this);
		this.renderSend = this.renderSend.bind(this);
		this.state = {
			messages: [],
			reportVisible: false,
			isBlocked: false
		};
	}

	render() {
		let { messages, reportVisible, isBlocked } = this.state;
		const { navigation } = this.props;
		const { user } = this.props.users;
		let { chat, withUser } = navigation.state.params;
		let chatWithUser = chat && chat.withUser ? chat.withUser : withUser;
		return (
			<Screen>
				<View style={styles.container}>
					<Mutation mutation={blockUserMutation}>
						{blockUser => (
							<Header
								navigation={navigation}
								routeName={chatWithUser.name}
								rightComponent={
									<HeaderRight
										options={["举报用户", isBlocked ? "移除黑名单" : "加入黑名单"]}
										selectHandler={index => {
											if (index == 0) {
												this.handleReportVisible();
											} else {
												blockUser({
													variables: {
														user_id: chatWithUser.id
													},
													refetchQueries: result => [
														{
															query: blockedUsersQuery
														}
													]
												});
												this.setState(prevState => ({
													isBlocked: !prevState.isBlocked
												}));
											}
										}}
									/>
								}
							/>
						)}
					</Mutation>
					{chat ? (
						this._renderMessagesQuery(chat)
					) : (
						<Query query={chatQuery} variables={{ with_id: withUser.id }}>
							{({ loading, error, data }) => {
								if (error) return <LoadingError />;
								if (!(data && data.chat)) return <SpinnerLoading />;
								return this._renderMessagesQuery(data.chat);
							}}
						</Query>
					)}
				</View>
				<ReportModal visible={reportVisible} handleVisible={this.handleReportVisible} type="user" report={chatWithUser} />
			</Screen>
		);
	}

	_renderMessagesQuery(chat) {
		const { navigation, users } = this.props;
		let { user } = users;
		return (
			<Query query={messagesQuery} variables={{ chat_id: chat.id }}>
				{({ loading, error, data, refetch, fetchMore, client, startPolling, stopPolling }) => {
					if (error) return <LoadingError />;
					if (!(data && data.messages)) return <SpinnerLoading />;
					//retech unreadsQuery ...
					client.query({
						query: chatsQuery,
						fetchPolicy: "network-only"
					});
					let messages = data.messages.map(message => {
						return {
							_id: message.id,
							text: message.message,
							createdAt: message.created_at,
							user: {
								_id: message.user.id,
								name: message.user.name,
								avatar: message.user.avatar
							}
						};
					});

					startPolling(1000);

					return (
						<Mutation mutation={sendMessageMutation}>
							{sendMessage => (
								<GiftedChat
									renderAvatarOnTop={true}
									showUserAvatar={true}
									loadEarlier={true}
									showAvatarForEveryMessage={true}
									placeholder={"在这里输入内容"}
									renderInputToolbar={this.renderInputToolbar}
									renderComposer={this.renderComposer}
									renderSend={this.renderSend}
									renderBubble={this.renderBubble}
									messages={messages}
									onSend={messages => {
										stopPolling();
										startPolling(500);
										this.onSend(messages);
										let messageText = messages[0].text;
										sendMessage({
											variables: {
												chat_id: chat.id,
												message: messageText
											},
											optimisticResponse: {
												__typename: "Mutation",
												sendMessage: {
													__typename: "Message",
													id: 0,
													time_ago: "正在发送...",
													created_at: new Date(),
													message: messageText + "...",
													user: user,
													images: []
												}
											},
											update: (cache, { data: { sendMessage } }) => {
												const { messages } = cache.readQuery({
													query: messagesQuery,
													variables: { chat_id: chat.id }
												});
												cache.writeQuery({
													query: messagesQuery,
													variables: { chat_id: chat.id },
													data: { messages: [sendMessage, ...messages] }
												});
											},
											refetchQueries: result => {
												return [{ query: chatsQuery }];
											}
										});
									}}
									renderLoadEarlier={() => {
										// if (messages.length >= data.chats[0].count_messages)
										//   return null;
										return (
											<TouchableOpacity
												onPress={() => {
													stopPolling();

													//TODO:: when srcoll to bottom, need startPolling again ...

													fetchMore({
														variables: {
															offset: messages.length
														},
														updateQuery: (prev, { fetchMoreResult }) => {
															if (!fetchMoreResult) return prev;
															return Object.assign({}, prev, {
																messages: [...prev.messages, ...fetchMoreResult.messages]
															});
														}
													});
												}}
											>
												<View style={{ alignItems: "center" }}>
													<Text>查看更早的消息</Text>
												</View>
											</TouchableOpacity>
										);
									}}
									onPressAvatar={user => {
										//默认传递过来的currentUser，id字段名字不同
										user = { ...user, ...{ id: user._id } };
										navigation.navigate("用户详情", { user });
									}}
									user={{
										_id: user.id,
										name: user.name,
										avatar: user.avatar
									}}
								/>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}

	renderComposer(props) {
		//Add the extra styles via containerStyle
		return (
			<Composer
				{...props}
				textInputStyle={{
					backgroundColor: Colors.darkGray,
					marginTop: 6,
					marginBottom: 6,
					padding: 5,
					lineHeight: 20
				}}
			/>
		);
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages)
		}));
	}

	renderInputToolbar(props) {
		//Add the extra styles via containerStyle
		return <InputToolbar {...props} primaryStyle={{ alignItems: "center" }} />;
	}

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: {
						backgroundColor: Colors.nattierBlue,
						marginBottom: 15,
						marginLeft: 3,
						paddingLeft: 5,
						paddingRight: 5,
						paddingTop: 2,
						paddingBottom: 2
					},
					right: {
						marginBottom: 15,
						marginRight: 3,
						paddingLeft: 5,
						paddingRight: 5,
						paddingTop: 2,
						paddingBottom: 2,
						backgroundColor: "#e0e0e0"
					}
				}}
				textStyle={{
					left: {
						color: Colors.primaryFontColor
					},
					right: {
						color: "#515151"
					}
				}}
			/>
		);
	}

	renderSend(props) {
		return (
			<Send {...props} containerStyle={{ justifyContent: "center" }} alwaysShowSend>
				<View style={styles.sendButton}>
					<Text style={{ color: Colors.themeColor, fontSize: 17 }}>发送</Text>
				</View>
			</Send>
		);
	}

	//举报模态框开关
	handleReportVisible() {
		this.setState(prevState => ({ reportVisible: !prevState.reportVisible }));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	sendButton: {
		alignItems: "center",
		justifyContent: "center",
		width: 60,
		marginHorizontal: 5
	}
});

export default connect(store => ({ users: store.users }))(withApollo(ChatScreen));
