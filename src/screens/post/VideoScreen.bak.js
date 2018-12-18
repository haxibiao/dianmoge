import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Video from "react-native-video";
import Spinner from "react-native-spinkit";

import Screen from "../Screen";
import { Colors } from "../../constants";
import { userOperationMiddleware } from "../../constants/Methods";
import { Iconfont } from "../../utils/Fonts";
import { UserMetaGroup } from "../../components/MediaGroup";

import RewardPanel from "../article/RewardPanel";
import ArticleBottomTools from "../article/ArticleBottomTools";
import Comments from "../article/comment/Comments";
import { RewardModal, ShareModal } from "../../components/Modal";
import ArticleDetailHeader from "../article/ArticleDetailHeader";
import { LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, graphql, compose } from "react-apollo";
import { articleQuery, favoriteArticleMutation } from "../../graphql/article.graphql";
import { likeArticleMutation } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

class VideoScreen extends Component {
	constructor(props) {
		super(props);
		this.handleRewardVisible = this.handleRewardVisible.bind(this);
		this.handleSlideShareMenu = this.handleSlideShareMenu.bind(this);
		this.toggleAddCommentVisible = this.toggleAddCommentVisible.bind(this);
		this.state = {
			duration: 0,
			currentTime: 0,
			loading: true,
			paused: false,
			addCommentVisible: false,
			rewardVisible: false,
			shareModalVisible: false
		};
	}

	componentDidMount() {
		let { navigation } = this.props;
		this.willBlurSubscription = navigation.addListener("willBlur", payload => {
			this.videoPlayerControl();
		});
	}

	componentWillUnmount() {
		this.willBlurSubscription.remove();
	}

	render() {
		let { paused, rewardVisible, addCommentVisible, shareModalVisible } = this.state;
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
								<ArticleDetailHeader navigation={navigation} article={video} share={this.handleSlideShareMenu} login={login} />
								<TouchableOpacity activeOpacity={1} onPress={this.videoPlayerControl} style={styles.videoWrap}>
									<Video
										source={{ uri: video_url }}
										poster={cover}
										posterResizeMode="cover"
										style={{
											width,
											height: (width * 9) / 16
										}}
										rate={1}
										muted={false}
										volume={1}
										paused={paused}
										resizeMode={"contain"}
										repeat={false} // 是否重复播放
										playInBackground={true}
										onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
										onLoad={this.onLoad} // 当视频加载完毕时的回调函数
										// onProgress={this.onProgress}      //  进度控制，每250ms调用一次，以获取视频播放的进度
										onEnd={this.onEnd} // 当视频播放完毕后的回调函数
										onError={this.onError}
									/>
									{paused && (
										<View style={styles.pausedStyle}>
											<Iconfont name="video" size={40} color={Colors.tintGray} />
										</View>
									)}
								</TouchableOpacity>
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
													<TouchableOpacity style={styles.operationItem} onPress={() => this.likeHandler(likeArticle)}>
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
										<TouchableOpacity onPress={this.handleRewardVisible} style={styles.operationItem}>
											<Iconfont name="reward" size={22} color={Colors.tintFontColor} />
											<Text style={styles.operationItemText}>赞赏</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={this.handleSlideShareMenu} style={styles.operationItem}>
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
									<TouchableOpacity onPress={this.toggleAddCommentVisible} style={styles.commentInput}>
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

	loadStart(data) {}
	onLoad = data => {
		// this.setState({ loading: false });
	};
	onProgress(data) {}
	onEnd(data) {}
	onError(data) {}

	playStatus = () => {
		let { loading, paused } = this.state;
		switch (true) {
			case !loading:
				return <Spinner size={40} type="FadingCircleAlt" color={Colors.tintGray} />;
				break;
			case paused:
				return (
					<View style={styles.pausedStyle}>
						<Iconfont name="video" size={40} color={Colors.tintGray} />
					</View>
				);
				break;
		}
	};

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
	videoPlayerControl = () => {
		this.setState(prevState => ({ paused: !prevState.paused }));
	};

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
		position: "relative",
		height: (width * 9) / 16
	},
	pausedStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 50,
		height: 50,
		opacity: 0.7,
		marginLeft: -25,
		marginTop: -25,
		justifyContent: "center",
		alignItems: "center"
	},
	topInfo: {
		padding: 15
	},
	title: {
		marginTop: 15,
		fontSize: 16,
		lineHeight: 22,
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
)(VideoScreen);
