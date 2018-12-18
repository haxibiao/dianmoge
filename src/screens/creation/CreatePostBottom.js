import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, Platform, Dimensions } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

const { width, height } = Dimensions.get("window");

class CreatePostBottom extends Component {
	render() {
		let {
			navigation,
			covers,
			completed,
			uploadId,
			uploadType,
			onPressPhotoUpload,
			onPressVideoUpload,
			selectCategories,
			selectCategory,
			publishing,
			publish,
			body,
			image_urls
		} = this.props;
		return (
			<View style={styles.body}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TouchableOpacity onPress={onPressVideoUpload} disabled={covers.length > 0 ? true : false}>
						<Iconfont name={"video-up"} size={26} color={covers.length > 0 ? "#999" : "#666"} style={{ paddingRight: 30 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressPhotoUpload} disabled={uploadType < 0 ? true : false}>
						<Iconfont name={"picture"} size={22} color={uploadType < 0 ? "#999" : "#666"} style={{ paddingRight: 30 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("选择专题", { callback: selectCategory, selectCategories })}>
						<Iconfont name={"category3"} size={24} color={"#666"} style={{ paddingRight: 30 }} />
					</TouchableOpacity>
				</View>
				{uploadType < 0 ? (
					<TouchableOpacity
						onPress={!publishing ? publish : null}
						style={{
							backgroundColor: !body || !uploadId == null || !completed ? "#999" : Colors.themeColor,
							borderRadius: 30
						}}
						disabled={!body || !uploadId == null || !completed ? true : false}
					>
						<Text style={{ paddingVertical: 7, paddingHorizontal: 20, color: Colors.skinColor }}>发表</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={!publishing ? publish : null}
						style={{
							backgroundColor: !body || !(covers.length == image_urls.length) ? "#999" : Colors.themeColor,
							borderRadius: 30
						}}
						disabled={!body || !(covers.length == image_urls.length) ? true : false}
					>
						<Text style={{ paddingVertical: 7, paddingHorizontal: 20, color: Colors.skinColor }}>发表</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		bottom: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: width,
		backgroundColor: Colors.skinColor,
		padding: 15
	}
});

export default CreatePostBottom;
