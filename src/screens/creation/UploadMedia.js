import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, Platform } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

import DialogSelected from "../../components/Pure/AlertSelected";

import * as Progress from "react-native-progress";
const selectedArr = ["图片", "视频"];

class UploadMedia extends Component {
	render() {
		let {
			navigation,
			covers,
			showMediaSelect,
			progress,
			cancelUploa,
			onPressPhotoUpload,
			selectMedia,
			cancelUpload,
			completed,
			uploadId,
			retype,
			uri,
			showAlertSelected
		} = this.props;
		return (
			<ScrollView>
				<View style={styles.inputText}>
					<TextInput
						ref="textInput"
						style={styles.input}
						placeholder="这一刻的想法"
						underlineColorAndroid="transparent"
						selectionColor="#000"
						multiline={true}
						textAlignVertical={"top"}
						onChangeText={body => {
							this.setState({
								body
							});
						}}
					/>
				</View>
				<View style={styles.add}>
					<View
						style={{
							flexWrap: "wrap",
							alignItems: "flex-start",
							flexDirection: "row",
							borderColor: Colors.lightGray
						}}
					>
						{covers.map((cover, index) => (
							<Image key={index} style={styles.picture} source={{ uri: cover }} />
						))}
						<TouchableOpacity onPress={covers.length > 0 ? onPressPhotoUpload : showAlertSelected}>
							{retype < 0 ? null : (
								<View style={covers == "" ? styles.icon : styles.icon2}>
									<Iconfont name={"add"} size={100} color={Colors.lightGray} />
								</View>
							)}
						</TouchableOpacity>
						{retype < 0 ? (
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
				</View>
				<TouchableOpacity>
					<View style={styles.item}>
						<Iconfont name={"person"} size={22} style={{ paddingRight: 15 }} color={"#000000"} />
						<Text style={{ color: "#000", fontSize: 15 }}>谁可以看</Text>
						<Text style={{ position: "absolute", right: 15 }}>公开</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.item}>
						<Iconfont name={"aite"} size={22} style={{ paddingRight: 15 }} color={"#000000"} />
						<Text style={{ color: "#000", fontSize: 15 }}>提醒谁看</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
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
		fontSize: 16,
		padding: 0,
		paddingLeft: 20,
		paddingTop: 3,
		height: 100,
		justifyContent: "flex-start"
		// marginTop:10,
	},

	add: {
		flexDirection: "column",
		justifyContent: "center",
		marginHorizontal: 18,
		backgroundColor: Colors.skinColor,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray
	},
	icon: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		height: 100,
		width: 100,
		marginBottom: 120,
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
		marginBottom: 70,
		marginLeft: 3,
		borderWidth: 1,
		borderColor: Colors.lightGray
	},
	picture: {
		height: 100,
		width: 100,
		marginHorizontal: 4,
		marginTop: 8,
		marginBottom: 70
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
		marginHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: Colors.skinColor,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray
	}
});

export default UploadMedia;
