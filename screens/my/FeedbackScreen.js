import React, { Component } from "react";
import { StyleSheet, ScrollView, Image, View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import KeyboardSpacer from "react-native-keyboard-spacer";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import { Query } from "react-apollo";
import gql from "graphql-tag";

class FeedbackScreen extends Component {
	constructor(props) {
		super(props);
		this.selectImage = this.selectImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
		this.submitFeddBack = this.submitFeddBack.bind(this);
		this.state = {
			images_path: [],
			body: "",
			contact: ""
		};
	}

	render() {
		let { images_path, body, contact } = this.state;
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<ScrollView style={styles.container}>
						<View style={[styles.formTitleWrap, { borderTopColor: "transparent" }]}>
							<Text style={styles.formTitle}>问题和意见</Text>
						</View>
						<View style={styles.inputWrap}>
							<TextInput
								selectionColor={Colors.themeColor}
								textAlignVertical="top"
								underlineColorAndroid="transparent"
								multiline={true}
								style={[styles.textInputStyle, { height: 92 }]}
								placeholder={"简要描述你要反馈的问题和意见"}
								placeholderTextColor={Colors.lightFontColor}
								onChangeText={body => this.setState({ body })}
								value={body + ""}
							/>
						</View>
						<View style={styles.formTitleWrap}>
							<Text style={styles.formTitle}>
								<Text>图片（选填，提供问题截图）</Text>
								<Text>{images_path.length}/4</Text>
							</Text>
						</View>
						<ScrollView horizontal>
							<View style={styles.imagesWrap}>
								{images_path &&
									images_path.map((elem, index) => {
										return (
											<TouchableOpacity key={index} style={styles.addImage} onPress={() => this.deleteImage(elem)}>
												<Image style={styles.image} source={{ uri: elem.uri }} />
											</TouchableOpacity>
										);
									})}
								{images_path.length < 4 && (
									<TouchableOpacity onPress={this.selectImage} style={styles.addImage}>
										<Iconfont name={"add"} size={60} color={Colors.lightFontColor} />
									</TouchableOpacity>
								)}
							</View>
						</ScrollView>
						<View style={styles.formTitleWrap}>
							<Text style={styles.formTitle}>联系方式（选填）</Text>
						</View>
						<View style={styles.inputWrap}>
							<TextInput
								selectionColor={Colors.themeColor}
								textAlignVertical="center"
								underlineColorAndroid="transparent"
								style={[styles.textInputStyle, { height: 30 }]}
								placeholder={"微信/QQ/邮箱"}
								placeholderTextColor={Colors.lightFontColor}
								onChangeText={contact => this.setState({ contact })}
								value={contact + ""}
							/>
						</View>
						<View style={styles.buttonWrap}>
							<Button disabled={body.length < 1 ? true : false} handler={this.submitFeddBack} name="提交反馈" />
						</View>
					</ScrollView>
					{Platform.OS == "ios" && <KeyboardSpacer />}
				</View>
			</Screen>
		);
	}

	selectImage() {
		let { images_path } = this.state;
		ImagePicker.openPicker({
			multiple: true,
			width: 400,
			height: 400,
			cropping: true
		})
			.then(images => {
				// Array.prototype.push.apply(images,images_path);
				if (images.length > 4) {
					images.splice(4);
				}
				this.setState({
					images_path: images.map(i => {
						return {
							uri: i.path,
							width: i.width,
							height: i.height
						};
					})
				});
			})
			.catch(error => {});
	}

	deleteImage() {
		return null;
	}

	submitFeddBack() {
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	formTitleWrap: {
		padding: 15,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.lightGray
	},
	formTitle: {
		fontSize: 13,
		color: Colors.tintFontColor,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	inputWrap: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	textInputStyle: {
		fontSize: 17,
		color: Colors.primaryFontColor,
		lineHeight: 23,
		padding: 0
	},
	imagesWrap: {
		flexDirection: "row",
		paddingVertical: 6,
		paddingLeft: 15,
		paddingRight: 9
	},
	addImage: {
		width: 100,
		height: 100,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 6
	},
	image: {
		width: 92,
		height: 92,
		resizeMode: "cover"
	},
	buttonWrap: {
		marginTop: 40,
		marginHorizontal: 15,
		height: 45
	}
});

export default FeedbackScreen;
