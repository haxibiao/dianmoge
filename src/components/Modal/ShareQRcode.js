'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';
import BasicModal from './BasicModal';
import { Dashed, Avatar } from '../Pure';
import { Row, Center, PlaceholderImage } from '../Element';
import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice, Config } from '../../constants';

const WIDTH = Divice.width;

class ShareQRcode extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { type, post, getRef } = this.props;
		return (
			<View style={styles.shareQRcode} ref={getRef} collapsable={false}>
				<View style={{ flex: 1 }}>
					<PlaceholderImage source={{ uri: post.cover }} style={styles.placeholderImage} />
				</View>
				<View style={{ padding: 15 }}>
					<Row>
						<View style={{ flex: 1, marginRight: 10 }}>
							<Row>
								<Avatar uri={post.user.avatar} size={36} />
								<Text style={styles.userName}>{post.user && post.user.name}</Text>
							</Row>
							<Text style={styles.description} numberOfLines={2}>
								{post.description}
							</Text>
						</View>
						<QRCodeSvg size={WIDTH * 0.25} value={Config.ServerRoot + '/' + type + '/' + post.id} />
					</Row>
					<View style={{ paddingVertical: 20 }}>
						<Dashed length={Divice.width - 30} />
					</View>
					<Row style={{ justifyContent: 'center' }}>
						<Row>
							<Image source={require('../../assets/images/dianmoge.png')} style={styles.tutorialImage} />
							<View style={{ marginLeft: 5 }}>
								<Text style={styles.tutorial}>保存分享图</Text>
								<Text style={[styles.tutorial, { marginTop: 5 }]}>
									安装
									{Config.AppDisplayName}
								</Text>
							</View>
						</Row>
						<Image source={require('../../assets/images/right_arrow.png')} style={[styles.tutorialImage, { marginHorizontal: 15 }]} />
						<Row>
							<Image source={require('../../assets/images/phone.png')} style={styles.tutorialImage} />
							<View style={{ marginLeft: 5 }}>
								<Text style={styles.tutorial}>打开APP</Text>
								<Text style={styles.watch}>立即观看</Text>
							</View>
						</Row>
					</Row>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	shareQRcode: {
		width: Divice.width,
		height: Divice.height,
		position: 'absolute',
		top: Divice.height,
		left: 0,
		backgroundColor: '#fff'
	},
	placeholderImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		resizeMode: 'cover',
		backgroundColor: '#f0f0f0'
	},
	tutorial: { fontSize: 14, lineHeight: 18, color: Colors.font1 },
	userName: { fontSize: 18, color: Colors.font1, marginLeft: 10 },
	description: { fontSize: 16, color: Colors.font1, lineHeight: 22, marginTop: 10 },
	tutorialImage: { width: 50, height: 50 },
	watch: { fontSize: 12, color: Colors.font1, letterSpacing: 2, marginTop: 9 }
});

export default ShareQRcode;
