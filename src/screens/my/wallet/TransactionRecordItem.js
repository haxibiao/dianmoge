import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";

class TransactionRecordItem extends Component {
	render() {
		let { type, money, time, status, children } = this.props;
		return (
			<View style={styles.transactionRecordItem}>
				<View style={styles.recordTop}>
					<Text style={styles.recordType}>{type}</Text>
					<Text
						style={{
							flexDirection: "row",
							alignItems: "center",
							fontSize: 15,
							color: status ? Colors.weixinColor : Colors.tintFontColor
						}}
					>
						{status ? "＋" : "－"}
						<Iconfont name={"RMB"} size={14} color={status ? Colors.weixinColor : Colors.tintFontColor} />
						<Text>
							{money}
							.00
						</Text>
					</Text>
				</View>
				<View>{children ? children : null}</View>
				<View>
					<Text style={styles.timeAgo}>{time}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	transactionRecordItem: {
		paddingVertical: 25,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	recordTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10
	},
	recordType: {
		fontSize: 17,
		color: Colors.darkFontColor
	},
	recordText: {
		fontSize: 15,
		lineHeight: 23,
		color: Colors.primaryFontColor
	},
	timeAgo: {
		marginTop: 10,
		fontSize: 15,
		color: Colors.tintFontColor
	}
});

export default TransactionRecordItem;
