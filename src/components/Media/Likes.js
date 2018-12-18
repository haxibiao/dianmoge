import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Iconfont } from '../../utils/Fonts';
import { Colors, Methods } from '../../constants';

import { graphql, compose, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { likeArticleMutation } from '../../graphql/user.graphql';
import { likeCommentMutation } from '../../graphql/comment.graphql';

class Likes extends Component {
	static defaultProps = {
		activeSource: require('../../assets/images/liked.png'),
		unActiveSource: require('../../assets/images/like.png')
	};

	constructor(props) {
		super(props);
		this.state = {
			liked: props.liked,
			likes: props.likes,
			bounce: new Animated.Value(1)
		};
	}

	render() {
		let { size = 30, text = {}, activeSource, unActiveSource, tyoe, id, login } = this.props;
		let { liked, likes, bounce } = this.state;
		const scale = bounce.interpolate({
			inputRange: [1, 1.1, 1.2],
			outputRange: [1, 1.25, 1]
		});
		return (
			<Animated.View style={{ transform: [{ scale: scale }] }}>
				<TouchableOpacity style={styles.center} onPress={() => this.followHandler(login)} activeOpacity={0.5}>
					<Image source={liked ? activeSource : unActiveSource} style={{ width: size, height: size, borderRadius: size / 2 }} />
					<Text style={[styles.likes, text]}>{Methods.numberFormat(likes) || 0}</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	}

	mutate = () => {
		let { likeArticle, likeComment, type, id } = this.props;
		if (type == 'article') {
			likeArticle({
				variables: {
					article_id: id
				}
			});
		} else if (type == 'comment') {
			likeComment({
				variables: {
					comment_id: id
				}
			});
		}
	};

	followHandler = login => {
		if (login) {
			this.setState(
				prevState => ({
					liked: !prevState.liked,
					likes: prevState.liked ? --prevState.likes : ++prevState.likes
				}),
				() => this.bounceAnimation(this.state.liked)
			);
		} else {
			this.props.navigation.navigate('登录注册');
		}
	};

	bounceAnimation = is_liked => {
		this.mutate();
		if (is_liked) {
			let { bounce } = this.state;
			bounce.setValue(1);
			Animated.spring(bounce, {
				toValue: 1.2,
				friction: 2,
				tension: 40
			}).start();
		}
	};
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	likes: {
		marginTop: 2,
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)'
	}
});

export default compose(
	withNavigation,
	graphql(likeArticleMutation, { name: 'likeArticle' }),
	graphql(likeCommentMutation, { name: 'likeComment' }),
	connect(store => ({ login: store.users.login, personal: store.users.user }))
)(Likes);
