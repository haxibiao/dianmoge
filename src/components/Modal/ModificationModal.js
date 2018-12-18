import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";
import BasicModal from "./BasicModal";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";

const { width, height } = Dimensions.get("window");

class ModificationModal extends Component {
	constructor(props) {
		super(props);
		this.value = props.value;
	}

	render() {
		const { modalName, visible, handleVisible, submit } = this.props;
		return (
			<BasicModal
				visible={visible}
				handleVisible={handleVisible}
				customStyle={{ width: width - 60, paddingBottom: 0 }}
				header={<Text style={styles.modalHeader}>{modalName}</Text>}
			>
				<View>
					<TextInput
						words={false}
						underlineColorAndroid="transparent"
						selectionColor={Colors.themeColor}
						style={styles.textInput}
						autoFocus={true}
						onChangeText={value => (this.value = value)}
						defaultValue={this.value + ""}
					/>
					<View style={styles.modalFooter}>
						<TouchableOpacity
							onPress={handleVisible}
							style={[styles.modalOperation, { borderRightColor: Colors.lightBorderColor, borderRightWidth: 1 }]}
						>
							<Text style={styles.modalFooterText}>取消修改</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => submit(this.value)} style={styles.modalOperation}>
							<Text style={[styles.modalFooterText, { marginLeft: 20 }]}>确定修改</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BasicModal>
		);
	}
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 15,
		color: Colors.themeColor
	},
	textInput: {
		fontSize: 16,
		color: Colors.primaryFontColor,
		padding: 0,
		marginBottom: 20
	},
	modalFooter: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor,
		marginHorizontal: -20
	},
	modalOperation: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15
	},
	modalFooterText: {
		fontSize: 15,
		color: Colors.primaryFontColor
	}
});

export default ModificationModal;
