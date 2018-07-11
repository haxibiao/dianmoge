import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";
import BasicModal from "./BasicModal";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";

class DialogModal extends Component {
	render() {
		const { visible, dialog = "确定执行此操作？", handleVisible, confirm, title = "提示" } = this.props;
		return (
			<BasicModal visible={visible} handleVisible={handleVisible} header={<Text style={styles.modalHeader}>{title}</Text>}>
				<View>
					<View style={{ minHeight: 40 }}>
						<Text style={styles.modalRemindContent}>{dialog}</Text>
					</View>
					<View style={styles.modalFooter}>
						<TouchableOpacity style={styles.operation} onPress={confirm}>
							<Text style={[styles.operationText, { marginLeft: 20 }]}>确定</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.operation} onPress={handleVisible}>
							<Text style={styles.operationText}>取消</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BasicModal>
		);
	}
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 20,
		fontWeight: "500",
		color: Colors.primaryFontColor
	},
	modalRemindContent: {
		fontSize: 16,
		color: Colors.tintFontColor
	},
	modalFooter: {
		marginTop: 10,
		marginBottom: -10,
		flexDirection: "row-reverse"
	},
	operation: {
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	operationText: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.primaryFontColor
	}
});

export default DialogModal;
