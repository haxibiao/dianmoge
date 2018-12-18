import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";
import BasicModal from "./BasicModal";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

const { width, height } = Dimensions.get("window");

class OperationModal extends Component {
	render() {
		const { visible, handleVisible, operation = [], handleOperation = () => null } = this.props;
		return (
			<BasicModal visible={visible} handleVisible={handleVisible} customStyle={{ width: width - 60, padding: 0 }}>
				<View>
					{operation.map(function(elem, index) {
						return (
							<TouchableOpacity
								key={index}
								style={[styles.operationItem, index == operation.length - 1 ? { borderBottomColor: "transparent" } : null]}
								onPress={() => handleOperation(index)}
							>
								<Text style={styles.modalText}>{elem}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</BasicModal>
		);
	}
}

const styles = StyleSheet.create({
	operationItem: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		paddingVertical: 15,
		marginHorizontal: 15,
		alignItems: "center"
	},
	modalText: {
		fontSize: 17,
		color: Colors.primaryFontColor
	}
});

export default OperationModal;
