'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ImageBackground, CameraRoll } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import BasicModal from './BasicModal';
import ShareQRcode from './ShareQRcode';
import { Dashed, Avatar } from '../Pure';
import { Row, Center, PlaceholderImage } from '../Element';
import { FetchBlob } from '../Utils';
import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice, Config, Methods } from '../../constants';

import ViewShot, { captureRef } from 'react-native-view-shot';
import QRCodeSvg from 'react-native-qrcode-svg';
import VideoEditor from '../../native/VideoEditor';

import { Mutation } from 'react-apollo';
import { publishArticleMutation, removeArticleMutation } from '../../graphql/user.graphql';
import { favoriteArticleMutation, unpublishArticleMutation } from '../../graphql/article.graphql';
import { connect } from 'react-redux';
import store, { actions } from '../../store';

const WIDTH = Divice.width * 0.8;

const dashedLength = WIDTH - (WIDTH * 0.25 - 50);

class WaterMark extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let { post } = this.props;
		return (
			<View>
				<View collapsable={false} ref={ref => (this.topWatermark = ref)} style={styles.topWatermark}>
					<Text style={styles.title} numberOfLines={2}>
						“{post.description}“
					</Text>
				</View>
				<View collapsable={false} ref={ref => (this.bottomWatermark = ref)}>
					<Row style={styles.bottomWatermark}>
						<View style={{ flex: 1, marginRight: 20 }}>
							<Row>
								<Avatar uri={post.user.avatar} size={36} />
								<Text style={styles.waterMarkUserName}>{post.user && post.user.name}</Text>
							</Row>
							<View style={{ marginVertical: 5 }}>
								<Dashed length={dashedLength} color={Colors.shade1} />
							</View>
							<Row>
								<View style={{ flex: 1 }}>
									<Text style={styles.tutorial}>保存视频</Text>
									<Text style={styles.tutorial}>分享给朋友</Text>
								</View>
								<Image
									source={require('../../assets/images/right_arrow.png')}
									style={{ width: 40, height: 30, marginHorizontal: 10 }}
								/>
								<View style={{ flex: 1 }}>
									<Text style={styles.tutorial}>
										打开
										{Config.AppDisplayName}
									</Text>
									<Text style={styles.tutorial}>立即观看</Text>
								</View>
							</Row>
						</View>
						<QRCodeSvg size={WIDTH * 0.25} value={Config.ServerRoot + '/post/' + post.id} />
					</Row>
				</View>
			</View>
		);
	}
}

class ShareCard extends Component {
	static propTypes = {
		type: PropTypes.oneOf(['video', 'post', 'article']),
		post: PropTypes.object
	};

	static defaultProps = {
		type: 'article',
		post: {}
	};

	constructor(props) {
		super(props);
		let { favorited, status } = props.post;
		this.state = {
			favorited,
			is_privacy: !status
		};
		this.isSelf = false;
		this.checkIsPersonal();
		this.waterMark = null;
		this.shareShotQRcode = null;
	}

	checkIsPersonal = () => {
		let { post, personal } = this.props;
		if (post.user && post.user.id == personal.id) {
			this.isSelf = true;
		}
	};

	createBottomBar = () => {
		const { type, post, user, personal, toggleVisible, navigation } = this.props;
		let { favorited, is_privacy } = this.state;
		return (
			<Row style={{ justifyContent: 'space-between' }}>
				{type === 'video' && (
					<TouchableOpacity onPress={() => this.downloadHandler({ url: post.video_url, id: post.id })}>
						<Image source={require('../../assets/images/share_download.png')} style={styles.toolBar} />
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={() => this.shotQRcodeView()}>
					<Image source={require('../../assets/images/share_code.png')} style={styles.toolBar} />
				</TouchableOpacity>
				{this.isSelf ? (
					<Mutation
						mutation={is_privacy ? publishArticleMutation : unpublishArticleMutation}
						variables={{ id: post.id }}
						onCompleted={() => this.unpublishSuccessed(is_privacy)}
						onError={() => this.unpublishFailed(is_privacy)}
					>
						{unpublishArticle => {
							return (
								<TouchableOpacity onPress={() => unpublishArticle()}>
									{is_privacy ? (
										<Image source={require('../../assets/images/publish.png')} style={styles.toolBar} />
									) : (
										<Image source={require('../../assets/images/privacy.png')} style={styles.toolBar} />
									)}
								</TouchableOpacity>
							);
						}}
					</Mutation>
				) : (
					<Mutation
						mutation={favoriteArticleMutation}
						variables={{ article_id: post.id }}
						onCompleted={() => this.favoritedSuccessed(favorited)}
						onError={() => this.favoritedFailed(favorited)}
					>
						{favoriteArticle => {
							return (
								<TouchableOpacity
									onPress={() => {
										if (personal.id) {
											favoriteArticle();
										} else {
											navigation.navigate('登录注册');
											toggleVisible();
										}
									}}
								>
									<Image
										source={
											favorited
												? require('../../assets/images/collectioned.png')
												: require('../../assets/images/collection.png')
										}
										style={styles.toolBar}
									/>
								</TouchableOpacity>
							);
						}}
					</Mutation>
				)}
				{this.isSelf ? (
					<Mutation
						mutation={removeArticleMutation}
						variables={{ id: post.id }}
						onCompleted={() => this.mutateResponse('删除成功')}
						onError={() => this.mutateResponse('删除失败')}
					>
						{removeArticle => {
							return (
								<TouchableOpacity onPress={() => removeArticle()}>
									<Image source={require('../../assets/images/delete.png')} style={styles.toolBar} />
								</TouchableOpacity>
							);
						}}
					</Mutation>
				) : (
					<TouchableOpacity
						onPress={() => {
							toggleVisible();
							navigation.navigate('举报', { type, id: post.id });
						}}
					>
						<Image source={require('../../assets/images/report.png')} style={styles.toolBar} />
					</TouchableOpacity>
				)}
			</Row>
		);
	};

	render() {
		const { type, post, visible, toggleVisible } = this.props;
		return (
			<BasicModal
				visible={visible}
				handleVisible={toggleVisible}
				customStyle={{ width: Divice.width, height: Divice.height, padding: 0, backgroundColor: 'transparent' }}
			>
				{type === 'video' && (
					<View style={styles.watermark}>
						<WaterMark ref={ref => (this.waterMark = ref)} post={post} />
					</View>
				)}
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
					onStartShouldSetResponder={evt => true}
					onResponderStart={toggleVisible}
					onStartShouldSetResponderCapture={evt => false}
				>
					<View
						style={{ width: WIDTH, height: WIDTH * 1.5, borderRadius: 3, backgroundColor: '#fff' }}
						onStartShouldSetResponder={evt => true}
					>
						<ImageBackground source={require('../../assets/images/shareBg.png')} style={{ width: '100%', height: '100%' }}>
							<Center style={{ flex: 1 }}>
								<PlaceholderImage
									source={{ uri: post.cover }}
									style={{
										width: WIDTH * 0.5,
										height: WIDTH * 0.7,
										resizeMode: 'cover',
										backgroundColor: '#f0f0f0'
									}}
								/>
							</Center>
							<View style={{ padding: 15 }}>
								<Row style={{ alignItems: 'flex-start' }}>
									<View style={{ flex: 1, marginRight: 20 }}>
										<Text style={styles.userName}>@{post.user && post.user.name}</Text>
										<Text style={styles.description} numberOfLines={2}>
											{post.description}
										</Text>
									</View>
									<QRCodeSvg size={WIDTH * 0.25} value={Config.ServerRoot + '/' + type + '/' + post.id} />
								</Row>
								<View style={{ paddingVertical: 15 }}>
									<Dashed length={Divice.width - 40} color={Colors.shade1} />
								</View>
								<View>{this.createBottomBar()}</View>
							</View>
						</ImageBackground>
					</View>
				</View>
				<ShareQRcode post={post} getRef={ref => (this.shareShotQRcode = ref)} />
			</BasicModal>
		);
	}

	downloadHandler = async ({ url, id }) => {
		//viewshot  android坑！！ 大图必须放小的前面shot
		let bottomWatermark = await this.capture(this.waterMark.bottomWatermark);
		let topWatermark = await this.capture(this.waterMark.topWatermark);

		this.props.toggleVisible();
		console.log('FetchBlob.download:', url);

		//download, 如果不要加水印的话，就更新相册
		let videoPath = await FetchBlob.download({ url, scan: !this.props.addWatermark, id });
		console.log('videoPath', videoPath);

		//addWatermark
		if (this.props.addWatermark) {
			console.log('topWatermark', topWatermark);
			console.log('bottomWatermark', bottomWatermark);

			LoadingProgress.show('正在生成分享视频');
			VideoEditor.addListener('progress', data => {
				console.log('data', data);
				LoadingProgress.progress(data.progress);
			});
			VideoEditor.addListener('completed', completed => {
				console.log('completed', completed);
				LoadingProgress.hide();
			});
			VideoEditor.addWaterMark(videoPath, topWatermark, bottomWatermark);
		}
	};

	shotQRcodeView = async () => {
		let shareShotView = await this.capture(this.shareShotQRcode);
		this.saveImage(shareShotView);
		this.props.toggleVisible();
	};

	capture = viewRef => {
		return new Promise((resolve, reject) => {
			captureRef(viewRef).then(
				uri => {
					console.log('capture Image saved to', uri);
					resolve(uri);
				},
				error => console.error('Oops, snapshot failed', error)
			);
		});
	};

	saveImage = uri => {
		console.log('CameraRoll', CameraRoll);
		CameraRoll.saveToCameraRoll(uri, 'photo');
		Methods.toast('图片已保存至本地相册');
	};

	favoritedSuccessed = favorited => {
		this.setState({ favorited: !favorited });
		this.props.toggleVisible();
		Methods.toast(favorited ? '取消收藏成功' : '收藏成功');
	};

	favoritedFailed = favorited => {
		this.props.toggleVisible();
		Methods.toast(favorited ? '取消收藏失败' : '收藏失败');
	};

	unpublishSuccessed = is_privacy => {
		this.setState({ is_privacy: !is_privacy });
		this.props.toggleVisible();
		Methods.toast(is_privacy ? '已公开' : '私密成功');
	};

	unpublishFailed = is_privacy => {
		this.props.toggleVisible();
		Methods.toast(is_privacy ? '公开失败' : '私密失败');
	};

	mutateResponse = message => {
		this.props.toggleVisible();
		Methods.toast(message);
	};
}

const styles = StyleSheet.create({
	watermark: { position: 'absolute', top: -WIDTH, left: 0, right: 0 },
	title: { fontSize: 15, color: Colors.font1, lineHeight: 18 },
	topWatermark: { padding: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' },
	bottomWatermark: { paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#fff' },
	waterMarkUserName: { fontSize: 15, color: Colors.font1, marginLeft: 15 },
	tutorial: { fontSize: 13, lineHeight: 16, color: Colors.font1, textAlign: 'center' },
	userName: { fontSize: 17, color: Colors.font1, marginBottom: 4 },
	description: { fontSize: 14, color: Colors.font1, lineHeight: 18 },
	toolBar: { width: (WIDTH - 30) * 0.18, height: (WIDTH - 30) * 0.18, borderRadius: 20 }
});

export default connect(store => ({ personal: store.users.user, addWatermark: store.users.addWatermark }))(withNavigation(ShareCard));
