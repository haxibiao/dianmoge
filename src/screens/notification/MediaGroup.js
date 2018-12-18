import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { UserGroup } from "../../components/MediaGroup";
import { TextContainer, SubComment } from "../../components/Pure";
import { Colors } from "../../constants";
import { navigationAction, goContentScreen } from "../../constants/Methods";

class MediaGroup extends Component {
	render() {
		let { navigation, user, rightComponent, description, comment, message, meta } = this.props;
		return (
			<View style={styles.notificationItem}>
				<View style={styles.userMedia}>
					<UserGroup
						navigation={navigation}
						user={user}
						customStyle={{ avatar: 40 }}
						rightButton={rightComponent ? rightComponent : null}
					/>
				</View>
				<View style={styles.notificationDescribe}>
					<Text style={styles.notificationDescribeText}>{description ? description : null}</Text>
				</View>
				{comment && comment.body ? (
					<TouchableOpacity style={styles.notificationContent} onPress={() => navigation.navigate("评论详情", comment.param)}>
						<TextContainer>
							<SubComment numberOfLines={3} style={styles.tintText} body={comment.body} />
						</TextContainer>
					</TouchableOpacity>
				) : null}
				{message && message.body ? (
					<TouchableOpacity style={styles.notificationContent} onPress={() => message.skipScreen()}>
						<TextContainer>{message.body}</TextContainer>
					</TouchableOpacity>
				) : null}
				<View>
					{meta && (
						<Text
							style={{
								fontSize: 13,
								lineHeight: 18,
								color: Colors.tintFontColor
							}}
						>
							{meta}
						</Text>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	notificationItem: {
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	userMedia: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	customButton: {
		height: 30,
		width: 55,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.tintBorderColor,
		alignItems: "center",
		justifyContent: "center"
	},
	notificationDescribe: {
		marginVertical: 20
	},
	notificationDescribeText: {
		fontSize: 16,
		lineHeight: 24,
		color: Colors.primaryFontColor
	},
	notificationContent: {
		marginBottom: 20
	},
	tintText: {
		fontSize: 15,
		color: Colors.primaryFontColor
	}
});

export default MediaGroup;
