'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import { Input } from '../../components';

import { Mutation } from 'react-apollo';
import { commentsQuery, addCommentMutation } from '../../graphql/comment.graphql';
import { connect } from 'react-redux';

class CommentInput extends Component {
	constructor(props) {
		super(props);
		this.value = '';
		this.state = {
			focus: false,
			body: ''
		};
	}

	render() {
		let { focus, body } = this.state;
		let { video, personal, navigation } = this.props;
		return (
			<Mutation mutation={addCommentMutation}>
				{addComment => {
					return (
						<View style={[styles.addComment, styles.flexRow]}>
							<View style={{ marginHorizontal: 5, flex: 1 }}>
								<Input
									placeholder="有爱评论，说点好听的~"
									style={styles.commentInput}
									value={body}
									onChangeText={body => this.setState({ body })}
									inputRef={ref => (this.inputRef = ref)}
									onFocus={() => {
										if (!personal.id) {
											this.inputRef.blur();
											navigation.navigate('登录注册');
										}
									}}
								/>
							</View>
							{
								// <TouchableOpacity style={[styles.center, styles.opt]} onPress={() => null}>
								// 	<Iconfont name="aite" size={20} color={focus ? Colors.shade1 : Colors.shade4} />
								// </TouchableOpacity>
							}
							<TouchableOpacity
								style={[styles.center, styles.send, body && { backgroundColor: Colors.theme1 }]}
								onPress={() => {
									if (body.length > 0) {
										addComment({
											variables: {
												commentable_id: video.id,
												body
											},
											refetchQueries: addComment => [
												{
													query: commentsQuery,
													variables: {
														article_id: video.id
													}
												}
											]
										});
										this.setState({ body: '' });
									}
									this.inputRef.blur();
								}}
							>
								<Text
									style={{
										fontSize: 14,
										color: body ? '#fff' : Colors.font3
									}}
								>
									发送
								</Text>
							</TouchableOpacity>
						</View>
					);
				}}
			</Mutation>
		);
	}
}

const styles = StyleSheet.create({
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	addComment: {
		height: 46,
		paddingHorizontal: 15,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderBottomWidth: 0,
		borderColor: Colors.shade4
	},
	commentInput: {
		fontSize: 15,
		color: Colors.font1
	},
	opt: {
		width: 32,
		height: 32
	},
	send: {
		marginLeft: 10,
		width: 50,
		height: 28,
		borderRadius: 14,
		backgroundColor: Colors.shade4
	}
});

export default connect(store => ({ personal: store.users.user }))(withNavigation(CommentInput));
