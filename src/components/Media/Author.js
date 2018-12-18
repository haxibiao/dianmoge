import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import { Avatar } from '../../components/Pure';

import { followUserMutation } from '../../graphql/user.graphql';
import { recommandDynamicQuery } from '../../graphql/article.graphql';
import { graphql, compose, Mutation } from 'react-apollo';
import { connect } from 'react-redux';

class Author extends Component {
	constructor(props) {
		super(props);

		this.state = {
			followed: props.user.followed_status ? true : false,
			tickInterpolate: new Animated.Value(1),
			addInterpolate: new Animated.Value(1)
		};
	}

	render() {
		let { followed, tickInterpolate, addInterpolate } = this.state;
		let { user, navigation } = this.props;
		let { avatar, id } = user;
		let tickButtonOpacity = tickInterpolate.interpolate({
			inputRange: [0, 0.5],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		});
		let tickButtonRotateZ = tickInterpolate.interpolate({
			inputRange: [0.5, 1],
			outputRange: ['0deg', '-45deg'],
			extrapolate: 'clamp'
		});
		let addButtonOpacity = addInterpolate.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		});
		return (
			<View style={[styles.center, { paddingBottom: 10 }]}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('用户详情', { user });
					}}
					activeOpacity={0.8}
				>
					<Avatar uri={avatar} size={50} borderStyle={{ borderWidth: 1, borderColor: '#fff' }} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.followButton} onPress={this.followHandler}>
					{!followed && (
						<Animated.View
							style={[
								styles.addBtn,
								{
									backgroundColor: '#fff',
									opacity: tickButtonOpacity,
									transform: [{ translateX: 16 }, { rotateZ: tickButtonRotateZ }]
								}
							]}
						>
							<Iconfont name="gougou" size={10} color={Colors.hotPink} />
						</Animated.View>
					)}
					{!followed && (
						<Animated.View style={[styles.addBtn, { opacity: addButtonOpacity }]}>
							<Text style={{ fontSize: 12, color: '#fff' }}>＋</Text>
						</Animated.View>
					)}
				</TouchableOpacity>
			</View>
		);
	}

	followHandler = () => {
		let { followed } = this.state;
		let { user, personal, login, navigation } = this.props;
		if (!login) {
			navigation.navigate('登录注册');
			return;
		}
		if (!followed) {
			this.props.followUser({
				variables: {
					user_id: user.id,
					undo: followed
				},
				refetchQueries: result => [
					{
						query: recommandDynamicQuery,
						variables: {
							user_id: personal.id
						}
					}
				]
			});
			this.followAnimation();
		}
	};

	followAnimation = () => {
		let { tickInterpolate, addInterpolate } = this.state;
		// +按钮fadeOut；√按钮fadeIn、接着rotate、fadeOut
		Animated.sequence([
			Animated.timing(addInterpolate, {
				toValue: 0,
				duration: 500,
				easing: Easing.linear
			}),
			Animated.timing(tickInterpolate, {
				toValue: 0,
				duration: 800,
				easing: Easing.linear
			})
		]).start(() => this.setState({ followed: true }));
	};
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	followButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 18
	},
	addBtn: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: 18,
		height: 18,
		borderRadius: 9,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.hotPink,
		transform: [{ translateX: 16 }]
	},
	add: {
		fontSize: 11,
		color: Colors.shade2
	}
});

export default compose(
	withNavigation,
	graphql(followUserMutation, { name: 'followUser' }),
	connect(store => ({ login: store.users.login, personal: store.users.user }))
)(Author);
