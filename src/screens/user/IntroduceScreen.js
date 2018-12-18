import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions, CameraRoll, Platform, PermissionsAndroid } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';
import Config from '../../constants/Config';
import { Header, Avatar, ShareModal, Dashed } from '../../components';
import ViewShotUtil from '../../components/Utils/ViewShotUtil';
import Screen from '../Screen';

import actions from '../../store/actions';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { userDetailQuery } from '../../graphql/user.graphql';

const { width, height } = Dimensions.get('window');

let dashedLength = width - 80;

class IntroduceScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		this.shareCard = null;
		this.state = {
			modalVisible: false
		};
	}

	render() {
		let { modalVisible } = this.state;
		let { navigation } = this.props;
		let { user } = navigation.state.params;
		return (
			<Screen customStyle={{ backgroundColor: Colors.nightColor }} lightBar header={<Header lightBar />}>
				<Query query={userDetailQuery} variables={{ id: user.id }}>
					{({ loading, error, data }) => {
						if (!(data && data.user)) return null;
						let user = data.user;
						return (
							<View style={styles.container}>
								<ScrollView style={styles.visitingCardContainer}>
									<View ref={ref => (this.shareCard = ref)} style={styles.visitingCard}>
										<View>
											<Image style={styles.cover} source={require('../../assets/images/userBg.png')} />
										</View>
										<View style={{ alignItems: 'center' }}>
											<View style={{ marginTop: -49 }}>
												<Avatar uri={user.avatar} size={100} borderStyle={{ borderColor: '#fff', borderWidth: 2 }} />
											</View>
											<View style={{ marginTop: 5 }}>
												<Text style={styles.name}>{user.name}</Text>
											</View>
											<View style={{ marginTop: 10 }}>
												<Text style={{ fontSize: 15, color: '#666' }}>
													{user.count_articles || 0}
													个作品，获得了
													{user.count_likes || 0}
													个喜欢
												</Text>
												<Text style={styles.introduce}>
													{user.introduction ? user.introduction : '本宝宝暂时还没想到个性签名'}
												</Text>
											</View>
										</View>
										<View style={styles.gutterWrap}>
											<View style={styles.hole} />
											<View style={styles.gutter}>
												<Dashed color={Colors.shade1} />
											</View>
											<View style={styles.hole} />
										</View>
										<View style={styles.cardBottom}>
											<View style={styles.QRcode}>
												<QRCodeSvg size={80} value={Config.ServerRoot + '/user/' + user.id} />
											</View>
											<View>
												<Text style={styles.tutorial}>保存图片到相册</Text>
												<Text style={styles.tutorial}>
													安装
													{Config.AppDisplayName}
													APP
												</Text>
												<Text style={styles.tutorial}>打开即可查看个人主页</Text>
											</View>
										</View>
									</View>
									<TouchableOpacity onPress={this.onCapture} style={styles.saveButton}>
										<Text style={styles.saveButtonText}>保存图片</Text>
									</TouchableOpacity>
								</ScrollView>
							</View>
						);
					}}
				</Query>
				<ShareModal plain visible={modalVisible} toggleVisible={this.toggleModalVisible} />
			</Screen>
		);
	}

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}

	onCapture = async () => {
		console.log('ViewShotUtil', ViewShotUtil);
		let image = await ViewShotUtil.capture(this.shareCard);
		console.log('image', image);
		console.log('ViewShotUtil.saveImage', ViewShotUtil.saveImage);
		ViewShotUtil.saveImage(image);
		this.props.navigation.goBack();
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.nightColor
	},
	visitingCardContainer: {
		flex: 1,
		paddingHorizontal: 20
	},
	visitingCard: {
		marginTop: 35,
		marginBottom: 25,
		borderRadius: 5,
		backgroundColor: '#fff',
		overflow: 'hidden'
	},
	cover: {
		width: width - 40,
		height: (width - 40) / 3,
		resizeMode: 'cover'
	},
	name: {
		fontSize: 22,
		fontWeight: '500',
		color: Colors.font1
	},
	introduce: {
		marginTop: 10,
		fontSize: 16,
		color: Colors.font1,
		lineHeight: 20,
		textAlign: 'center'
	},
	gutterWrap: {
		marginTop: 15,
		marginHorizontal: -8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	gutter: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.lightGray,
		marginHorizontal: 16
	},
	hole: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: Colors.nightColor
	},
	QRcode: {
		alignItems: 'center',
		marginBottom: 10
	},
	cardBottom: {
		paddingHorizontal: 20,
		paddingVertical: 15
	},
	tutorial: { fontSize: 14, color: Colors.font1, lineHeight: 20, textAlign: 'center' },
	saveButton: { height: 44, borderRadius: 22, backgroundColor: '#68afff', justifyContent: 'center' },
	saveButtonText: { fontSize: 16, color: '#fff', fontWeight: '500', textAlign: 'center' }
});

export default IntroduceScreen;
