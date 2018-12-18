'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Likes from './Likes';
import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import { Avatar } from '../../components';

import { Mutation } from 'react-apollo';
import { likeCommentMutation } from '../../graphql/comment.graphql';

class CommentItem extends Component {
	render() {
		let { navigation, author, comment } = this.props;
		let isAuthor = author.id == comment.user.id;
		return (
			<View style={styles.commentItem}>
				<View style={styles.userInfo}>
					<View style={styles.flexRow}>
						<TouchableOpacity activeOpacity={0.8} onPress={() => null}>
							<Avatar uri={comment.user.avatar} size={34} borderStyle={{ borderWidth: 0 }} />
						</TouchableOpacity>
						<View style={{ marginLeft: 10 }}>
							<View style={styles.flexRow}>
								<View>
									<Text style={styles.name}>{comment.user.name}</Text>
								</View>
								{isAuthor && (
									<View style={[styles.center, styles.extrude]}>
										<Text style={styles.extrudeText}>作者</Text>
									</View>
								)}
							</View>
							<View>
								<Text style={styles.time}>{comment.time_ago}</Text>
							</View>
						</View>
					</View>
					<Likes
						likes={comment.likes}
						liked={comment.liked}
						size={20}
						text={{ fontSize: 10, color: Colors.font4 }}
						type="comment"
						id={comment.id}
						activeSource={require('../../assets/images/liked_xs.png')}
						unActiveSource={require('../../assets/images/like_xs.png')}
					/>
				</View>
				<View style={styles.body}>{this.renderBody(JSON.parse(comment.body))}</View>
			</View>
		);
	}

	renderBody = body => {
		let { navigation } = this.props;
		let Comment = body.map((elem, index) => {
			if (typeof elem === 'object') {
				return (
					<Text
						key={index}
						style={styles.linkText}
						onPress={() =>
							navigation.navigate('用户详情', {
								user: elem
							})
						}
					>
						{`@${elem.name} `}
					</Text>
				);
			}
			return (
				<Text key={index} style={{ lineHeight: 19 }}>
					{elem}
				</Text>
			);
		});
		return <Text style={styles.content}>{Comment}</Text>;
	};

	renderReplyBody = body => {
		let Comment = body.map((elem, index) => {
			if (typeof elem === 'object') {
				return (
					<Text key={index} style={styles.replyBody}>
						{`@${elem.name} `}
					</Text>
				);
			}
			return (
				<Text key={index} style={{ lineHeight: 19 }}>
					{elem}
				</Text>
			);
		});
		return <Text style={styles.replyBody}>{Comment}</Text>;
	};
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
	commentItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: Colors.shade4 },
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	time: {
		fontSize: 13,
		color: Colors.font3,
		marginTop: 2
	},
	body: {
		marginTop: 10
	},
	extrude: {
		width: 30,
		height: 16,
		backgroundColor: Colors.theme1,
		marginLeft: 5,
		borderRadius: 2
	},
	extrudeText: {
		fontSize: 11,
		color: '#fff'
	},
	name: {
		fontSize: 14,
		color: Colors.font3
	},
	content: {
		fontSize: 15,
		color: Colors.font1,
		lineHeight: 19
	},
	replyComment: {
		backgroundColor: Colors.shade2,
		padding: 6
	},
	replyBody: {
		fontSize: 15,
		color: Colors.shade3,
		lineHeight: 19
	},
	linkText: {
		color: Colors.theme3
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	}
});

export default CommentItem;
