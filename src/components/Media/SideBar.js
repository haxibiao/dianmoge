import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import { ShareCard } from '../Modal';
import CommentModal from './CommentModal';
import Likes from './Likes';
import Author from './Author';

class SideBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			commentModalVisible: false,
			shareModalVisible: false
		};
	}

	render() {
		let { commentModalVisible, shareModalVisible } = this.state;
		let { video, navigation } = this.props;
		let { id, user, count_likes, count_comments, count_shares, liked, music } = video;
		return (
			<View style={styles.sideBar}>
				<View style={{ marginBottom: 20 }}>
					<Author user={user} />
				</View>
				<View style={{ marginBottom: 20 }}>
					<Likes likes={count_likes} liked={liked} type="article" id={id} />
				</View>
				<TouchableOpacity
					style={[styles.center, { marginBottom: 20 }]}
					activeOpacity={0.5}
					onPress={() => this.toggleVisible('commentModalVisible')}
				>
					<Image source={require('../../assets/images/comment.png')} style={{ width: 30, height: 30 }} />
					<Text style={styles.countText}>{count_comments}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.center, { marginBottom: 40 }]}
					activeOpacity={0.5}
					// onPress={() => navigation.navigate("分享", { video })}
					onPress={() => this.toggleVisible('shareModalVisible')}
				>
					<Image source={require('../../assets/images/share.png')} style={{ width: 30, height: 30 }} />
					<Text style={styles.countText}>{count_shares}</Text>
				</TouchableOpacity>
				<CommentModal visible={commentModalVisible} toggleVisible={() => this.toggleVisible('commentModalVisible')} video={video} />
				<ShareCard
					visible={shareModalVisible}
					toggleVisible={() => this.toggleVisible('shareModalVisible')}
					user={user}
					post={video}
					type="video"
				/>
			</View>
		);
	}

	toggleVisible = visible => {
		this.setState(prevState => ({ [visible]: !prevState[visible] }));
	};
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	sideBar: {
		alignItems: 'center'
	},
	itemWrap: {
		marginBottom: 20
	},
	countText: {
		marginTop: 2,
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)'
	}
});

export default withNavigation(SideBar);
