import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { UserGroup } from "../../components/MediaGroup";
import { TextContainer } from "../../components/Pure";

class MediaGroup extends Component {
	render() {
		let { navigation, user, rightComponent, description, notification, meta } = this.props;
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
				{notification.content ? (
					<TouchableOpacity
						style={styles.notificationContent}
						onPress={() => navigation.navigate(notification.type, notification.info ? notification.info : {})}
					>
						<TextContainer>
							<Text
								numberOfLines={3}
								style={{
									fontSize: 15,
									color: Colors.primaryFontColor
								}}
							>
								{notification.content}
							</Text>
						</TextContainer>
					</TouchableOpacity>
				) : null}
				<View>
					<Text
						style={{
							fontSize: 13,
							lineHeight: 18,
							color: Colors.tintFontColor
						}}
					>
						{meta ? meta : null}
					</Text>
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
	}
});

export default MediaGroup;
