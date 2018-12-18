import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, FlatList, StatusBar, BackHandler, Animated } from 'react-native';
import Orientation from 'react-native-orientation';

import PostHeader from './PostHeader';
import VideoPlayer from './VideoPlayer';
import RewardPanel from './RewardPanel';
import PostBottomTools from './PostBottomTools';
import Comments from '../article/comment/Comments';
import Screen from '../Screen';
import { Colors, Divice, Methods, Config } from '../../constants';
import { Iconfont } from '../../utils/Fonts';
import { RewardModal, ImageView } from '../../components/Modal';
import { LoadingError, SpinnerLoading, BlankContent } from '../../components/Pure';

import { connect } from 'react-redux';
import actions from '../../store/actions';
import { Query, Mutation } from 'react-apollo';
import { articleQuery } from '../../graphql/article.graphql';

const IMG_SPACE = 3;

class PostScreen extends Component {
	constructor(props) {
		super(props);
		this.handleRewardVisible = this.handleRewardVisible.bind(this);
		this.toggleAddCommentVisible = this.toggleAddCommentVisible.bind(this);
		this.commentsOffsetY = 0;
		this.commentsHeight = 0;
		this.state = {
			isFullScreen: false,
			videoWidth: Divice.width,
			videoHeight: (Divice.width * 9) / 16,
			rewardVisible: false,
			addCommentVisible: false,
			imageViewVisible: false,
			initImage: 0, //图片预览模式下首先打开的图片索引
			offsetTop: new Animated.Value(0)
		};
		this.post = null;
		this.watermarkPath = null;
	}

	// 监听安卓物理返回键，横屏时点击回到竖屏，再次点击返回
	componentDidMount() {
		let { navigation } = this.props;
		if (!Divice.isIos) {
			this.didFocusSubscription = navigation.addListener('didFocus', payload => {
				BackHandler.addEventListener('hardwareBackPress', this._backButtonPress);
			});
			this.willBlurSubscription = navigation.addListener('willBlur', payload => {
				BackHandler.removeEventListener('hardwareBackPress', this._backButtonPress);
				//fix 退出页面视频还在播放的bug
				this.videoPlayer && this.videoPlayer.pause();
			});
		} else {
			this.willBlurSubscription = navigation.addListener('willBlur', payload => {
				//fix 退出页面视频还在播放的bug
				this.videoPlayer && this.videoPlayer.pause();
			});
		}
	}

	componentWillUnmount() {
		if (!Divice.isIos) {
			this.didFocusSubscription.remove();
			this.willBlurSubscription.remove();
		} else {
			this.willBlurSubscription.remove();
		}
		// 离开该screen固定竖屏
		Orientation.lockToPortrait();
	}

	render() {
		let { isFullScreen, videoWidth, videoHeight, rewardVisible, addCommentVisible, imageViewVisible, initImage, offsetTop } = this.state;
		let { navigation, login } = this.props;
		const post = navigation.getParam('post', {});

		//首页检测分享二维码的跳转场景
		if (!post.id) {
			post.id = navigation.getParam('qrcode_post_id', 0);
		}

		let bottomToolsOffset = offsetTop.interpolate({
			inputRange: [0, Divice.BOTTOM_BAR_HEIGHT],
			outputRange: [-Divice.BOTTOM_BAR_HEIGHT, 0],
			extrapolate: 'clamp'
		});
		let headerBackground = offsetTop.interpolate({
			inputRange: [Divice.height - Divice.HEADER_HEIGHT * 2, Divice.height - Divice.HEADER_HEIGHT],
			outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
			extrapolate: 'clamp'
		});
		let lightHeaderOpacity = offsetTop.interpolate({
			inputRange: [Divice.height - Divice.HEADER_HEIGHT * 3, Divice.height - Divice.HEADER_HEIGHT * 2],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		});
		let darkHeaderOpacity = offsetTop.interpolate({
			inputRange: [Divice.height - Divice.HEADER_HEIGHT * 2, Divice.height - Divice.HEADER_HEIGHT],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		});
		return (
			<Screen header>
				<Query query={articleQuery} variables={{ id: post.id }}>
					{({ loading, error, data, refetch }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (loading) return <SpinnerLoading />;
						if (!(data && data.article)) return <BlankContent />;
						let post = data.article;
						this.post = post;
						let { type, body, pictures, user, categories, category, count_tips, count_replies, time_ago, hits, video } = post;
						this.isPortrait = video && video.info && video.info.width < video.info.height;
						this.pictures = pictures.map((elem, index) => {
							return { url: elem.url };
						});
						return (
							<View style={styles.container} onLayout={event => this._onLayout(post, event)}>
								{!isFullScreen &&
									!this.isPortrait && (
										<PostHeader navigation={navigation} post={post} share={this.handleSlideShareMenu} login={login} />
									)}
								<ScrollView
									style={styles.container}
									onScroll={Animated.event([
										{
											nativeEvent: { contentOffset: { y: offsetTop } }
										}
									])}
									bounces={false}
									scrollEnabled={!isFullScreen}
									ref={ref => (this.scrollRef = ref)}
									keyboardShouldPersistTaps={'handled'}
									scrollEventThrottle={16}
								>
									{type == 'video' && (
										<VideoPlayer
											ref={ref => (this.videoPlayer = ref)}
											video={post}
											isFullScreen={isFullScreen}
											isPortrait={this.isPortrait}
											videoWidth={this.isPortrait ? Divice.width : videoWidth}
											videoHeight={this.isPortrait ? Divice.height : videoHeight}
											navigation={navigation}
										/>
									)}
									<View>
										{body ? (
											<View style={{ margin: 15 }}>
												<Text style={styles.body}>{body}</Text>
											</View>
										) : null}
										<View style={{ flexDirection: 'row' }}>{pictures && pictures.length > 0 && this.renderImages(pictures)}</View>
										<View style={styles.meta}>
											{category && (
												<Text
													style={styles.category}
													onPress={() =>
														Methods.goContentScreen(navigation, {
															...category,
															type: 'category'
														})
													}
												>
													#{category.name}
												</Text>
											)}
											{time_ago ? <Text style={styles.time_ago}>{time_ago}</Text> : null}
										</View>
									</View>
									<RewardPanel
										navigation={navigation}
										rewardUsers={post.tipedUsers}
										rewardDescrib={post.user.tip_words}
										handleRewardVisible={this.handleRewardVisible}
									/>
									<View style={this.isPortrait && { marginBottom: Divice.BOTTOM_BAR_HEIGHT }}>
										<Comments
											addCommentVisible={addCommentVisible}
											article={post}
											navigation={navigation}
											onLayout={this._commentsOnLayout}
											toggleCommentModal={this.toggleAddCommentVisible}
										/>
									</View>
								</ScrollView>
								{this.isPortrait && (
									<Animated.View style={[styles.headPosition, { backgroundColor: headerBackground }]}>
										<Animated.View style={[styles.headPosition, { opacity: lightHeaderOpacity }]}>
											<PostHeader
												lightBar
												navigation={navigation}
												post={post}
												share={this.handleSlideShareMenu}
												login={login}
											/>
										</Animated.View>
										<Animated.View style={[styles.headPosition, { opacity: darkHeaderOpacity }]}>
											<PostHeader navigation={navigation} post={post} share={this.handleSlideShareMenu} login={login} />
										</Animated.View>
									</Animated.View>
								)}
								{!isFullScreen && (
									<Animated.View style={[this.isPortrait && { ...styles.toolsPosition, bottom: bottomToolsOffset }]}>
										<PostBottomTools
											post={post}
											login={login}
											navigation={navigation}
											toggleCommentModal={this.toggleAddCommentVisible}
											handleRewardVisible={this.handleRewardVisible}
											handleSlideShareMenu={this.handleSlideShareMenu}
											scrollToComment={this._scrollToComment}
										/>
									</Animated.View>
								)}
								<RewardModal visible={rewardVisible} handleVisible={this.handleRewardVisible} article={post} />
							</View>
						);
					}}
				</Query>
				{/*点击图片预览**/
				!this.videoPlayer && (
					<ImageView
						visible={imageViewVisible}
						handleVisible={() => this.setState({ imageViewVisible: false })}
						imageUrls={this.pictures}
						initImage={initImage}
					/>
				)}
			</Screen>
		);
	}

	renderImages(images) {
		let images_length = images.length;
		// 单张图片计算比例自适应
		if (images_length == 1) {
			let { width: imgWidth, height: imgHeight } = Methods.imageSize({ width: images[0].width, height: images[0].height }, Divice.width);
			console.log(images[0], 'test', imgWidth, imgHeight, (Divice.width * 2) / 3);
			return (
				<View style={imgWidth < (Divice.width * 2) / 3 ? { paddingLeft: 15 } : { flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							this.setState({
								imageViewVisible: true,
								initImage: 0
							});
						}}
					>
						<Image source={{ uri: images[0].url }} style={[{ width: imgWidth, height: imgHeight }, styles.singleImage]} />
					</TouchableOpacity>
				</View>
			);
		} else {
			let sizeArr = Methods.imgsLayoutSize(images_length, IMG_SPACE);
			return (
				<View style={styles.gridView}>
					{images.map((img, i) => {
						return (
							<TouchableOpacity
								activeOpacity={1}
								key={i}
								onPress={() => {
									this.setState({
										imageViewVisible: true,
										initImage: i
									});
								}}
							>
								<Image source={{ uri: img.url }} style={[sizeArr[i], styles.gridImage]} />
							</TouchableOpacity>
						);
					})}
				</View>
			);
		}
	}

	//赞赏模态框开关
	handleRewardVisible() {
		let { login, navigation } = this.props;
		if (login) {
			this.setState(prevState => ({ rewardVisible: !prevState.rewardVisible }));
		} else {
			navigation.navigate('登录注册');
		}
	}

	//评论模态框开关
	toggleAddCommentVisible() {
		let { login, navigation } = this.props;
		if (login) {
			this.setState(prevState => ({
				addCommentVisible: !prevState.addCommentVisible
			}));
		} else {
			navigation.navigate('登录注册');
		}
	}

	//获取评论区域到顶部的高度
	_commentsOnLayout = event => {
		let { y, height } = event.nativeEvent.layout;
		this.commentsOffsetY = y;
		this.commentsHeight = height;
	};

	//滚动到评论顶部
	_scrollToComment = () => {
		if (this.commentsHeight >= Divice.height) {
			this.scrollRef.scrollTo({
				x: 0,
				y: this.commentsOffsetY,
				animated: true
			});
		} else {
			this.scrollRef.scrollToEnd({ animated: true });
		}
	};

	//屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
	_onLayout = (post, event) => {
		if (post.type == 'video') {
			let { width, height } = event.nativeEvent.layout;
			//该视频比例为手机长视频
			if (this.isPortrait) {
				// let { width, height } = post.video.info;
				// let video_width, video_height;
				// video_width = Divice.width;
				// video_height = (video_width * height) / width;
				// if (Divice.height <= video_height) {
				// 	this.fullPortrait = true;
				// 	this.setState({
				// 		videoWidth: Divice.width,
				// 		videoHeight: Divice.height
				// 	});
				// } else {
				// 	this.setState({
				// 		videoWidth: video_width,
				// 		videoHeight: video_height
				// 	});
				// }
				return;
			}
			// 让scrollview滚动到顶部并且禁止滚动
			this.scrollRef.scrollTo({ x: 0, y: 0, animated: true });
			//通过View的宽高来判断横竖屏
			let isLandscape = width > height;
			if (isLandscape) {
				this.setState({
					videoWidth: Divice.height,
					videoHeight: Divice.width,
					isFullScreen: true
				});
			} else {
				this.setState({
					videoWidth: Divice.width,
					videoHeight: (Divice.width * 9) / 16,
					isFullScreen: false
				});
			}
		}
	};

	_backButtonPress = () => {
		if (this.state.isFullScreen) {
			Orientation.lockToPortrait();
		} else {
			this.props.navigation.goBack();
		}
		return true;
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	body: {
		fontSize: 16,
		lineHeight: 22,
		color: Colors.darkFontColor
	},
	meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 15 },
	category: {
		fontSize: 15,
		lineHeight: 20,
		color: Colors.themeColor
	},
	time_ago: {
		fontSize: 13,
		color: Colors.tintFontColor
	},
	singleImage: {
		resizeMode: 'cover',
		marginBottom: 15
	},
	gridView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginLeft: -IMG_SPACE,
		marginTop: -IMG_SPACE
	},
	gridImage: {
		resizeMode: 'cover',
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.tintGray
	},
	headPosition: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: Divice.HEADER_HEIGHT
	},
	toolsPosition: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default connect(store => {
	return {
		login: store.users.login
	};
})(PostScreen);
