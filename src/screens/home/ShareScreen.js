import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions, CameraRoll, Platform, PermissionsAndroid } from 'react-native';
// import QRCode from "react-native-qrcode-svg";
// import ViewShot from "react-native-view-shot";

import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice, Config } from '../../constants';
import { Header, Avatar, Dashed, Row } from '../../components';
import Screen from '../Screen';

import { connect } from 'react-redux';
import actions from '../../store/actions';

class ShareScreen extends Component {
	render() {
		return (
			<Screen>
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: 'https://hbimg.b0.upaiyun.com/9e71ee49d815bbb39794293efb99f78bd0cc9e203db6a-dzORrN_fw658' }}
						style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
					/>
				</View>
				<View style={{ padding: 15 }}>
					<Row style={{ alignItems: 'flex-start' }}>
						<View style={{ flex: 1 }}>
							<Text style={{ fontSize: 19, color: Colors.font1, lineHeight: 24 }}>
								白日依山尽，黄河入海流，欲穷千里目，更上一层楼。
							</Text>
						</View>
						<View>
							<Image
								source={{
									uri:
										'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1542894290&di=fb76e424dc820ae890fcec8c675de984&src=http://y3.ifengimg.com/news_spider/dci_2013/09/b85234c4801f8b2d7771353867a7a0f8.jpg'
								}}
								style={{ width: 80, height: 80, marginLeft: 20 }}
							/>
						</View>
					</Row>
					<View style={{ paddingVertical: 15 }}>
						<Dashed length={Divice.width - 40} />
					</View>
					<Row>
						<Row style={{ flex: 1 }}>
							<Iconfont name="picture" size={50} color={Colors.shade1} />
							<View style={{ flex: 1, marginLeft: 10 }}>
								<Text style={{ fontSize: 14, lineHeight: 18, color: Colors.font1 }}>保存到相册，分享给朋友</Text>
							</View>
						</Row>
						<Image source={require('../../assets/images/right_arrow.png')} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
						<Row style={{ flex: 1 }}>
							<Iconfont name="phone" size={50} color={Colors.shade1} />
							<View style={{ flex: 1, marginLeft: 10 }}>
								<Text style={{ fontSize: 14, lineHeight: 18, color: Colors.font1 }}>打开点墨阁App立即观看</Text>
							</View>
						</Row>
					</Row>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({});

export default ShareScreen;
