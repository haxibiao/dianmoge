import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import VideoPlayer from "react-native-video-controls";
import KeyboardSpacer from "react-native-keyboard-spacer";
import VideoDownloader from "../../native/VideoDownloader";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { userOperationMiddleware } from "../../constants/Methods";
import { Iconfont } from "../../utils/Fonts";
import { UserMetaGroup } from "../../components/MediaGroup";

import RewardPanel from "../article/RewardPanel";
import ArticleBottomTools from "../article/ArticleBottomTools";
import Comments from "../article/comment/Comments";
import { RewardModal, ShareModal } from "../../components/Modal";
import { LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, graphql, compose } from "react-apollo";
import { articleQuery, favoriteArticleMutation } from "../../graphql/article.graphql";
import { likeArticleMutation } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

class DetailScreen extends Component {
	constructor(props) {
		super(props);
		this.onProgress = this.onProgress.bind(this);
		this.onBuffer = this.onBuffer.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.handleRewardVisible = this.handleRewardVisible.bind(this);
		this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
		this.toggleAddCommentVisible = this.toggleAddCommentVisible.bind(this);
		this.state = {
			fullScreen: false,
			rate: 1,
			paused: false,
			volume: 1,
			muted: false,
			duration: 0,
			currentTime: 0,
			isBuffering: false,
			addCommentVisible: false,
			rewardVisible: false,
			shareModalVisible: false
		};
	}

	onLoad(data) {
		this.setState({ duration: data.duration });
	}

	onProgress(data) {
		this.setState({ currentTime: data.currentTime });
	}

	onBuffer({ isBuffering }: { isBuffering: boolean }) {
		this.setState({ isBuffering });
	}

	render() {
		let {
			fullScreen,
			rate,
			paused,
			muted,
			ignoreSilentSwitch,
			rewardVisible,
			addCommentVisible,
			shareModalVisible
		} = this.state;
		let { navigation, login, favoriteArticle, likeArticle } = this.props;
		let video = navigation.getParam("video", {});
		return (
			<Screen>
				<Query query={articleQuery} variables={{ id: video.id }}>
					{({ loading, error, data, refetch }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (loading) return <SpinnerLoading />;
						if (!(data && data.article)) return <BlankContent />;
						this.video = data.article;
						let video = data.article;
						let { id, video_url, user, title, description, liked, favorited, cover } = video;
						return (
							<View style={styles.container}>
								<View style={styles.videoWrap}>
									<VideoPlayer
										onPlay={() => {
											this.setState({
												paused: false
											});
										}}
										onPause={() => {
											this.setState({
												paused: true
											});
										}}
										// onEnterFullscreen={()=>{
										// 	navigation.navigate("视频全屏")
										// }}
										navigator={navigation}
										source={{ uri: video_url }}
										poster={cover}
										posterResizeMode="cover"
										style={{
											width,
											height: fullScreen ? height : (width * 9) / 16
										}}
										ref={ref => {
											this.player = ref;
										}}
										muted={muted}
										volume={1}
										rate={rate}
										paused={paused}
										resizeMode={"contain"}
										onLoad={this.onLoad.bind(this)}
										onBuffer={this.onBuffer.bind(this)}
										onProgress={this.onProgress.bind(this)}
										onEnd={() => {
											return "Done!";
										}}
										repeat={true}
									/>
								</View>
								<ScrollView style={styles.container} keyboardShouldPersistTaps={"handled"}>
									<View style={styles.topInfo}>
										<UserMetaGroup user={user} navigation={navigation} />
										<View>
											<Text style={styles.title}>{description ? description : title}</Text>
										</View>
									</View>
									<View style={styles.topOperation}>
										<Mutation mutation={likeArticleMutation}>
											{likeArticle => {
												return (
													<TouchableOpacity
														style={styles.operationItem}
														onPress={() => this.likeHandler(likeArticle)}
													>
														<Iconfont
															name={liked ? "like-fill" : "like"}
															color={liked ? Colors.themeColor : Colors.tintFontColor}
															size={20}
														/>
														<Text style={styles.operationItemText}>喜欢</Text>
													</TouchableOpacity>
												);
											}}
										</Mutation>
										<TouchableOpacity
											onPress={this.handleRewardVisible}
											style={styles.operationItem}
										>
											<Iconfont name="reward" size={22} color={Colors.tintFontColor} />
											<Text style={styles.operationItemText}>赞赏</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={this.handleSlideShareMenu}
											style={styles.operationItem}
										>
											<Iconfont name="share-cycle" size={18} color={Colors.tintFontColor} />
											<Text style={styles.operationItemText}>分享</Text>
										</TouchableOpacity>
									</View>
									<Comments
										article={video}
										addCommentVisible={addCommentVisible}
										toggleCommentModal={this.toggleAddCommentVisible}
										navigation={navigation}
									/>
								</ScrollView>
								{/*文章底部工具**/}
								<View style={styles.bottomTools}>
									<Mutation mutation={favoriteArticleMutation}>
										{favoriteArticle => {
											return (
												<TouchableOpacity onPress={() => this.favoriteHandler(favoriteArticle)}>
													<Iconfont
														name={favorited ? "star-fill" : "star"}
														size={20}
														color={favorited ? Colors.themeColor : Colors.tintFontColor}
													/>
												</TouchableOpacity>
											);
										}}
									</Mutation>
									<TouchableOpacity
										onPress={this.toggleAddCommentVisible}
										style={styles.commentInput}
									>
										<Text style={{ fontSize: 13, color: Colors.lightFontColor }}>说点什么吧</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={this.handleRewardVisible}>
										<Iconfont name="reward" color={Colors.tintFontColor} size={22} />
									</TouchableOpacity>
								</View>
								{/*赞赏模态框**/}
								<RewardModal visible={rewardVisible} handleVisible={this.handleRewardVisible} />
							</View>
						);
					}}
				</Query>
				<ShareModal visible={shareModalVisible} toggleVisible={this.handleSlideShareMenu} />
			</Screen>
		);
	}

	// 喜欢文章
	likeHandler = likeArticle => {
		let { login, navigation } = this.props;
		userOperationMiddleware({
			login,
			action: () =>
				likeArticle({
					variables: {
						article_id: this.video.id,
						undo: this.video.liked
					}
				}),
			navigation
		});
	};

	// 收藏文章
	favoriteHandler = favoriteArticle => {
		let { login, navigation } = this.props;
		userOperationMiddleware({
			login,
			action: () =>
				favoriteArticle({
					variables: {
						article_id: this.video.id
					}
				}),
			navigation
		});
	};

	// 播放暂停
	togglePlay() {
		this.setState(prevState => ({
			paused: !prevState.paused
		}));
	}

	handleRewardVisible() {
		let { login, navigation } = this.props;
		if (login) {
			this.setState(prevState => ({ rewardVisible: !prevState.rewardVisible }));
		} else {
			navigation.navigate("登录注册");
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
			navigation.navigate("登录注册");
		}
	}

	//分享slide
	handleSlideShareMenu() {
		this.setState(prevState => ({
			shareModalVisible: !prevState.shareModalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	videoWrap: {
		overflow: "hidden",
		height: (width * 9) / 16
	},
	topInfo: {
		padding: 15
	},
	title: {
		marginTop: 15,
		fontSize: 18,
		fontWeight: "500",
		lineHeight: 24,
		color: Colors.darkFontColor
	},
	topOperation: {
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},
	operationItem: {
		flex: 1,
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	operationItemText: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginLeft: 5
	},
	bottomTools: {
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor,
		backgroundColor: Colors.tintGray
	},
	commentInput: {
		flex: 1,
		height: 34,
		paddingLeft: 10,
		borderRadius: 3,
		justifyContent: "center",
		marginHorizontal: 8,
		backgroundColor: Colors.skinColor
	},
	content: {
		paddingTop: 40
	},
	description: {
		fontSize: 15,
		color: Colors.primaryFontColor,
		lineHeight: 23
	}
});

export default compose(
	graphql(favoriteArticleMutation, { name: "favoriteArticle" }),
	graphql(likeArticleMutation, { name: "likeArticle" }),
	connect(store => {
		return {
			login: store.users.login
		};
	})
)(DetailScreen);
