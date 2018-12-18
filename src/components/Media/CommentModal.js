'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	Dimensions,
	FlatList,
	Text,
	Platform,
	BackHandler,
	Keyboard
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from 'react-native-modal';

import Likes from './Likes';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import { DivisionLine, Avatar, ContentEnd, Diving } from '../../components';

import { commentsQuery } from '../../graphql/comment.graphql';
import { Query } from 'react-apollo';

const { width, height } = Dimensions.get('window');

class CommentModal extends Component {
	constructor(props) {
		super(props);
		this.author = props.video.user;
		this.keyboard_show = false;
	}

	// componentDidMount() {
	// 	let { navigation } = this.props;
	// 	if (Platform.OS === "android") {
	// 		this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
	// 		this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
	// 		BackHandler.addEventListener("hardwareBackPress", this._backHanlder);
	// 	}
	// }

	// componentWillUnmount() {
	// 	if (Platform.OS === "android") {
	// 		this.keyboardDidShowListener.remove();
	// 		this.keyboardDidHideListener.remove();
	// 		BackHandler.removeEventListener("hardwareBackPress", this._backHanlder);
	// 	}
	// }

	render() {
		let { navigation, visible, toggleVisible, children, style = {}, video } = this.props;
		return (
			<Modal
				isVisible={visible}
				onBackButtonPress={toggleVisible}
				onBackdropPress={toggleVisible}
				backdropColor={'transparent'}
				backdropOpacity={1}
				style={{ justifyContent: 'flex-end', margin: 0 }}
			>
				<View style={[styles.container, style]}>
					<Query query={commentsQuery} variables={{ article_id: video.id }} fetchPolicy="network-only">
						{({ laoding, error, data, refetch }) => {
							if (!(data && data.comments && data.comments.length > 0)) {
								return (
									<View style={{ flex: 1 }}>
										{this._renderCommentHeader(0)}
										<Diving>
											<Text style={styles.listEmpty}>别走，请你坐沙发</Text>
										</Diving>
									</View>
								);
							}
							return (
								<FlatList
									data={data.comments}
									keyExtractor={(item, index) => 'comment_id' + item.id}
									renderItem={({ item, index }) => <CommentItem comment={item} navigation={navigation} author={video.user} />}
									ListHeaderComponent={() => this._renderCommentHeader(data.comments.length)}
									ListFooterComponent={() => <ContentEnd loadingmore />}
									showsVerticalScrollIndicator={false}
								/>
							);
						}}
					</Query>
					<CommentInput video={video} />
					{Platform.OS === 'ios' && <KeyboardSpacer />}
				</View>
			</Modal>
		);
	}

	_renderCommentHeader = (count_comments: number) => {
		let { toggleVisible, navigation } = this.props;
		return (
			<View style={styles.header}>
				<View>
					{count_comments > 0 && (
						<Text style={styles.countComments}>
							{count_comments}
							条评论
						</Text>
					)}
				</View>
				<TouchableOpacity style={[styles.center, styles.close]} onPress={toggleVisible}>
					<Iconfont name="chacha" size={20} color={Colors.font1} />
				</TouchableOpacity>
			</View>
		);
	};

	_keyboardDidShow = () => {
		this.keyboard_show = true;
	};
	_keyboardDidHide = () => {
		this.keyboard_show = false;
	};

	_backHanlder = () => {
		if (this.keyboard_show) {
			Keyboard.dismiss;
			// return false;
		} else {
			// return false;
		}
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
	container: {
		position: 'relative',
		width,
		height: height * 0.6,
		overflow: 'hidden',
		backgroundColor: '#fff',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8
	},
	header: {
		position: 'relative',
		alignItems: 'center',
		padding: 15,
		paddingBottom: 10
	},
	close: {
		position: 'absolute',
		width: 20,
		height: 20,
		top: 10,
		right: 10
	},
	countComments: {
		fontSize: 13,
		fontWeight: '500',
		color: Colors.font1,
		textAlign: 'center'
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	},
	listEmpty: {
		fontSize: 14,
		color: Colors.font3,
		marginTop: 12
	}
});

export default CommentModal;
