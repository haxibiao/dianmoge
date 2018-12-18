import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Iconfont } from '../../../utils/Fonts';
import { Colors, Config, Methods } from '../../../constants';
import Screen from '../../Screen';
import { ImagePickerView, ImageView, Input, SelectList } from '../../../components';

import { reportArticleMutation } from '../../../graphql/article.graphql';
import { reportUserMutation, reportUserCommentMutation } from '../../../graphql/user.graphql';
import { Query, Mutation, compose, graphql } from 'react-apollo';

class ReportScreen extends Component {
	constructor(props) {
		super(props);
		this.initImage = 0;
		this.selectImages = [];
		this.reportType = [
			{
				text: '色情',
				select: false
			},
			{
				text: '广告',
				select: false
			},
			{
				text: '侵权',
				select: false
			},
			{
				text: '侮辱攻击',
				select: false
			},
			{
				text: '其他原因',
				select: false
			}
		];
		this.state = {
			reason: '',
			selectedItem: null,
			imageViewVisible: false
		};
	}

	selectedItem = item => {
		this.setState({ selectedItem: item });
	};

	render() {
		const { reason, selectedItem, imageViewVisible } = this.state;
		const { navigation } = this.props;
		let type = navigation.getParam('type', 'article');
		let reaportable_id = navigation.getParam('id', 0);
		let comment_id = navigation.getParam('comment_id', 0);
		let disabled = !(selectedItem && (selectedItem.text == '其他原因' ? (reason ? true : false) : true));
		console.log('disableddisableddisabled', disabled);
		return (
			<Screen>
				<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
					<View>
						<Text style={styles.tip}>请选择举报原因</Text>
					</View>

					<View style={styles.reasonBox}>
						<SelectList data={this.reportType} selectedItem={this.selectedItem} />
						{selectedItem &&
							selectedItem.text == '其他原因' && (
								<View style={styles.inputWrap}>
									<Input
										style={styles.input}
										placeholder="请描述举报原因"
										multiline
										maxLength={200}
										value={reason}
										onChangeText={value => this.setState({ reason: value })}
									/>
									<View style={styles.upload}>
										<ImagePickerView
											getImages={images => (this.selectImages = images)}
											onTouchImage={index => {
												this.initImage = index;
												this.toggleImageView();
											}}
										/>
									</View>
								</View>
							)}
					</View>
					<TouchableOpacity
						disabled={disabled}
						style={[styles.submit, disabled && { backgroundColor: Colors.shade1 }]}
						onPress={() => this.submitReport({ type, id: reaportable_id, reason, comment_id })}
					>
						<Text style={styles.submitText}>举报</Text>
					</TouchableOpacity>
				</ScrollView>
				<ImageView visible={imageViewVisible} handleVisible={this.toggleImageView} imageUrls={this.selectImages} initImage={this.initImage} />
			</Screen>
		);
	}

	toggleImageView = () => {
		this.setState(prevState => ({
			imageViewVisible: !prevState.imageViewVisible
		}));
	};

	submitReport = ({ type, id, reason, comment_id }) => {
		const { reportArticleMutation, reportUserMutation, reportUserCommentMutation } = this.props;
		console.log('typetypetype', type);
		switch (type) {
			case 'article':
			case 'video':
			case 'post':
				console.log('test');
				reportArticleMutation({
					variables: {
						id,
						type,
						reason
					},
					update: this.update
				});
				break;
			case 'user':
				console.log('test');
				reportUserMutation({
					variables: {
						id,
						type,
						reason
					},
					update: this.update
				});
				break;
			case 'comment':
				console.log('test');
				reportUserCommentMutation({
					variables: {
						id,
						comment_id,
						type,
						reason
					},
					update: this.update
				});
				break;
		}
	};

	update = (proxy, { data, error }) => {
		if (error) {
			Methods.toast('举报失败');
		} else {
			this.props.navigation.goBack();
			Methods.toast('举报成功，感谢您的反馈');
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.shade4
	},
	tip: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		fontSize: 13,
		color: Colors.font3
	},
	reasonBox: { backgroundColor: '#fff', paddingLeft: 15 },
	inputWrap: {
		marginRight: 15,
		marginBottom: 15,
		padding: 10,
		borderRadius: 4,
		backgroundColor: Colors.shade5
	},
	input: {
		height: 60,
		padding: 0,
		paddingTop: 0,
		fontSize: 15,
		lineHeight: 20,
		color: Colors.font2
	},
	upload: { marginTop: 10 },
	submit: {
		marginTop: 40,
		marginHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 5,
		backgroundColor: Colors.theme1
	},
	submitText: {
		fontSize: 17,
		color: '#fff',
		textAlign: 'center'
	}
});

export default compose(
	graphql(reportArticleMutation, { name: 'reportArticleMutation' }),
	graphql(reportUserMutation, { name: 'reportUserMutation' }),
	graphql(reportUserCommentMutation, { name: 'reportUserCommentMutation' })
)(ReportScreen);
