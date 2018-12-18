'use strict';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { Iconfont } from '../../utils/Fonts';
import { Colors, Config } from '../../constants';

class ImagePickerView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectImages: []
		};
	}

	render() {
		let {
			getImages = () => null,
			onTouchImage = () => null,
			addImageComponent,
			maxLength = 3,
			imagesWrapStyle = {},
			imageWrapStyle = {},
			imageStyle = {}
		} = this.props;
		let { selectImages } = this.state;
		return (
			<View style={styles.pickerView}>
				<View style={[styles.imagesWrap, imagesWrapStyle]}>
					{selectImages.length > 0 &&
						selectImages.map((elem, index) => {
							return (
								<TouchableWithoutFeedback onPress={() => onTouchImage(index)} key={index}>
									<View style={[styles.imageWrap, imageWrapStyle, index == 0 && { marginLeft: 10 }]}>
										<Image style={[styles.image, imageStyle]} source={{ uri: elem.url }} />
										<TouchableWithoutFeedback onPress={() => this.deleteImage(index)}>
											<View style={styles.chacha}>
												<Iconfont name="chacha" size={14} color="#fff" />
											</View>
										</TouchableWithoutFeedback>
									</View>
								</TouchableWithoutFeedback>
							);
						})}
					{selectImages.length < maxLength && (
						<TouchableWithoutFeedback onPress={() => this.selectImage(getImages)}>
							{addImageComponent ? (
								addImageComponent
							) : (
								<View style={styles.addImage}>
									<Iconfont name={'add'} size={60} color="#fff" />
								</View>
							)}
						</TouchableWithoutFeedback>
					)}
				</View>
			</View>
		);
	}

	selectImage(getImages) {
		let { selectImages } = this.state;
		ImagePicker.openPicker({
			multiple: true,
			cropping: true
		})
			.then(images => {
				let { selectImages } = this.state;
				let count_images = selectImages.length;
				images.map(image => {
					selectImages.push({ url: image.path });
				});
				selectImages = selectImages.slice(0, 3);
				getImages(selectImages);
				this.setState({
					selectImages
				});
			})
			.catch(error => {});
	}

	deleteImage(index) {
		this.setState(prevState => {
			prevState.selectImages.splice(index, 1);
			return {
				selectImages: prevState.selectImages
			};
		});
	}
}

const styles = StyleSheet.create({
	pickerView: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	imagesWrap: {
		flexDirection: 'row',
		paddingVertical: 6
	},
	imageWrap: {
		borderRadius: 4,
		marginRight: 10
	},
	image: {
		width: 80,
		height: 80,
		resizeMode: 'cover'
	},
	chacha: {
		position: 'absolute',
		right: 4,
		top: 4,
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addImage: {
		marginLeft: 10,
		width: 80,
		height: 80,
		borderRadius: 4,
		backgroundColor: Colors.shade3,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ImagePickerView;
