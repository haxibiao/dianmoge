import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, Platform } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { DivisionLine } from "../../components/Pure";
import DialogSelected from "../../components/Pure/AlertSelected";

import * as Progress from "react-native-progress";
import Video from "react-native-video";

const selectedArr = ["图片", "视频"];

class UploadBody extends Component {
	render() {
		let {
			navigation,
			covers,
			progress,
			completed,
			uploadId,
			uploadType,
			changeBody,
			body,
			selectCategories,
			selectCategory,
			removeMedia
		} = this.props;
		return (
			<View style={{ backgroundColor: Colors.lightGray, flex: 1, marginTop: 30 }}>
				{/*				<TouchableOpacity
					onPress={() => navigation.navigate("选择专题", { callback: selectCategory, selectCategories })}
				>
					<View style={styles.item}>
						<Text style={{ color: "#000", fontSize: 14 }}>发布到</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<Text style={{ color: Colors.darkGray, fontSize: 14 }}>
								{selectCategories.length > 0 ? selectCategories[0].name : "请选择投稿的专题"}
							</Text>
							<Iconfont name={"right"} size={14} color={Colors.darkGray} />
						</View>
					</View>
				</TouchableOpacity>*/}
				<View style={styles.inputText}>
					<TextInput
						ref="textInput"
						style={styles.input}
						placeholder="内容"
						underlineColorAndroid="transparent"
						selectionColor="#000"
						multiline={true}
						textAlignVertical={"top"}
						onChangeText={changeBody}
					/>
				</View>
				<View style={styles.uploadPreview}>
					<View
						style={{
							flexWrap: "wrap",
							alignItems: "flex-start",
							flexDirection: "row",
							borderColor: Colors.lightGray
						}}
					>
						{Platform.OS == "android"
							? covers.map((cover, index) => (
									<View key={index} style={styles.imageWrap}>
										<Image style={styles.picture} source={{ uri: cover }} />
										<TouchableOpacity style={styles.chacha} onPress={() => removeMedia(index)}>
											<Iconfont name="chacha" size={15} color="#fff" />
										</TouchableOpacity>
									</View>
							  ))
							: uploadType < 0
								? covers.map((cover, index) => (
										<Video
											key={index}
											source={{
												uri: cover
											}}
											style={styles.picture}
											rate={0}
											muted={true}
											resizeMode="cover"
										/>
								  ))
								: covers.map((cover, index) => (
										<View key={index} style={styles.imageWrap}>
											<Image style={styles.picture} source={{ uri: cover }} />
											<TouchableOpacity style={styles.chacha} onPress={() => removeMedia(index)}>
												<Iconfont name="chacha" size={15} color="#fff" />
											</TouchableOpacity>
										</View>
								  ))}

						{
							//TODO: 视频在ios渲染预览有问题，参照https://facebook.github.io/react-native/docs/images.html#static-non-image-resources
							//用require 方式，或者用react-native-video 来渲染video
						}
						{/*<TouchableOpacity onPress={covers.length > 0 ? onPressPhotoUpload : showAlertSelected}>
							{uploadType < 0 ? null : (
								<View style={covers == "" ? styles.icon : styles.icon2}>
									<Iconfont name={"add"} size={100} color={Colors.lightGray} />
								</View>
							)}
						</TouchableOpacity>*/}
						{uploadType < 0 ? (
							<Progress.Circle
								style={uploadId == null || completed ? styles.complete : styles.nocomplete}
								size={100}
								progress={progress / 100}
								indeterminate={false}
								color={Colors.lightGray}
								showsText={true}
							/>
						) : null}
					</View>
					<View style={{ flexDirection: "row", marginTop: 10, height: 20 }}>
						{selectCategories.map((elem, index) => (
							<View
								style={{
									flexDirection: "row",
									borderColor: Colors.themeColor,
									borderWidth: 1,
									borderRadius: 30,
									paddingHorizontal: 6,
									marginRight: 10
								}}
								key={index}
							>
								<Text style={{ fontSize: 9, color: Colors.themeColor, paddingVertical: 3 }}>{elem.name}</Text>
								<TouchableOpacity
									onPress={() => {
										selectCategories = selectCategories.filter((query, index) => {
											return query.id !== elem.id;
										});
										selectCategory(selectCategories);
									}}
								>
									<Iconfont name={"chacha"} size={11} color={Colors.themeColor} style={{ marginLeft: 5, padding: 3 }} />
								</TouchableOpacity>
							</View>
						))}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputText: {
		backgroundColor: Colors.skinColor
		// marginTop:10,
	},
	input: {
		backgroundColor: "transparent",
		fontSize: 14,
		padding: 0,
		paddingLeft: 20,
		paddingTop: 10,
		height: 200,
		justifyContent: "flex-start"
		// marginTop:10,
	},

	uploadPreview: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 18,
		backgroundColor: Colors.skinColor,
		paddingBottom: 10
	},
	icon: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		height: 100,
		width: 100,
		borderWidth: 1,
		borderColor: Colors.lightGray
	},
	icon2: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		height: 100,
		width: 100,
		marginLeft: 3,
		borderWidth: 1,
		borderColor: Colors.lightGray
	},
	imageWrap: {
		marginHorizontal: 4,
		marginTop: 8
	},
	chacha: {
		position: "absolute",
		right: 4,
		top: 4,
		width: 18,
		height: 18,
		borderRadius: 8,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		justifyContent: "center",
		alignItems: "center"
	},
	picture: {
		height: 100,
		width: 100
	},
	nocomplete: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		marginTop: 8,
		marginLeft: 4
	},
	complete: {
		display: "none"
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: Colors.skinColor
	}
});

export default UploadBody;
