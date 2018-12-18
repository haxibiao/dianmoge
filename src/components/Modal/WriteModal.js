import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";
import BasicModal from "./BasicModal";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

class WriteModal extends Component {
	render() {
		const { modalName, visible, value, handleVisible, changeVaule, submit, placeholder } = this.props;
		return (
			<BasicModal visible={visible} handleVisible={handleVisible} header={<Text style={styles.modalHeader}>{modalName}</Text>}>
				<View>
					<TextInput
						words={false}
						underlineColorAndroid="transparent"
						selectionColor={Colors.themeColor}
						style={styles.textInput}
						autoFocus={true}
						placeholder={placeholder}
						placeholderText={Colors.tintFontColor}
						onChangeText={changeVaule}
						defaultValue={value + ""}
					/>
					<View style={styles.modalFooter}>
						<Text style={styles.modalFooterText} onPress={handleVisible}>
							取消
						</Text>
						<Text style={[styles.modalFooterText, { marginLeft: 20 }]} onPress={submit}>
							确定
						</Text>
					</View>
				</View>
			</BasicModal>
		);
	}
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 19,
		fontWeight: "500",
		color: Colors.primaryFontColor
	},
	textInput: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.themeColor,
		fontSize: 15,
		color: Colors.primaryFontColor,
		padding: 0,
		paddingBottom: 5
	},
	modalFooter: {
		marginTop: 20,
		flexDirection: "row-reverse"
	},
	modalFooterText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.primaryFontColor,
		padding: 10
	}
});

export default WriteModal;
