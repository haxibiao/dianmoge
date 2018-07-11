import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from "react-native";
import BasicModal from "./BasicModal";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";

import { reportArticleMutation } from "../../graphql/article.graphql";
import { reportUserMutation, reportUserCommentMutation } from "../../graphql/user.graphql";
import { Query, Mutation, compose, graphql } from "react-apollo";

const { width, height } = Dimensions.get("window");

class ReportModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reason: "",
			checkedType: 0
		};
	}

	render() {
		const { visible, handleVisible, type, report, reportArticleMutation, reportUserMutation, reportUserCommentMutation } = this.props;
		let options = ["广告或垃圾信息", "抄袭或转载", "其他"];
		if (type == "comment") {
			options = ["广告或垃圾信息", "其他"];
		}
		const { reason, checkedType } = this.state;
		return (
			<BasicModal
				visible={visible}
				handleVisible={handleVisible}
				customStyle={{ width: width - 60, paddingBottom: 0 }}
				header={<Text style={styles.modalHeader}>请选择举报类别</Text>}
			>
				<View>
					<View>
						{options.map((elem, index) => {
							return (
								<TouchableOpacity key={index} style={styles.reportItem} onPress={() => this.setState({ checkedType: index })}>
									<Text style={styles.reportType}>{elem}</Text>
									{checkedType == index ? (
										<Iconfont name="radio-check" size={22} color={Colors.themeColor} />
									) : (
										<Iconfont name="radio-uncheck" size={22} color={Colors.themeColor} />
									)}
								</TouchableOpacity>
							);
						})}
						<View style={styles.textInputWrap}>
							<TextInput
								words={false}
								underlineColorAndroid="transparent"
								selectionColor={Colors.themeColor}
								style={styles.textInput}
								placeholder="请输入举报原因"
								placeholderTextColor={Colors.tintFontColor}
								autoFocus={true}
								onChangeText={reason => this.setState({ reason })}
								value={reason + ""}
							/>
						</View>
					</View>
					<View style={styles.modalFooter}>
						<TouchableOpacity
							onPress={() => {
								handleVisible();
								this.setState({ checkedType: 0 });
							}}
							style={[styles.modalOperation, { borderRightColor: Colors.lightBorderColor, borderRightWidth: 1 }]}
						>
							<Text style={styles.modalFooterText}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								switch (type) {
									case "article":
										reportArticleMutation({
											variables: {
												id: report.id,
												type: options[checkedType],
												reason
											}
										});
										break;
									case "user":
										reportUserMutation({
											variables: {
												id: report.id,
												type: options[checkedType],
												reason
											}
										});
										break;
									case "comment":
										reportUserCommentMutation({
											variables: {
												id: report.user.id,
												comment_id: report.id,
												type: options[checkedType],
												reason
											}
										});
										break;
								}
								handleVisible();
							}}
							style={styles.modalOperation}
						>
							<Text style={[styles.modalFooterText, { marginLeft: 20 }]}>确定</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BasicModal>
		);
	}
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 14,
		color: Colors.themeColor
	},
	reportItem: {
		paddingVertical: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	reportType: {
		fontSize: 17,
		color: Colors.tintFontColor
	},
	textInputWrap: {
		marginTop: 10,
		marginBottom: 20,
		height: 40,
		paddingHorizontal: 8,
		justifyContent: "center",
		backgroundColor: Colors.tintGray
	},
	textInput: {
		fontSize: 16,
		color: Colors.primaryFontColor,
		padding: 0
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
		color: Colors.themeColor
	}
});

export default compose(
	graphql(reportArticleMutation, { name: "reportArticleMutation" }),
	graphql(reportUserMutation, { name: "reportUserMutation" }),
	graphql(reportUserCommentMutation, { name: "reportUserCommentMutation" })
)(ReportModal);
