import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import { withNavigation } from "react-navigation";

import Colors from "../../constants/Colors";
import { Avatar } from "../../components/Pure";
import { FollowButton } from "../../components/Button";
import { navigationAction } from "../../constants/Methods";

class CategoryCard extends Component {
	render() {
		let { category, navigation, followHandler } = this.props;
		let { id, logo, name, description, count_follows, followed } = category;
		return (
			<TouchableWithoutFeedback onPress={() => navigation.dispatch(navigationAction({ routeName: "专题详情", params: { category } }))}>
				<View style={styles.card} elevation={5}>
					<Avatar size={50} uri={logo} type="category" />
					<View style={styles.middle}>
						<View style={styles.layoutFlexRow}>
							<View>
								<Text style={styles.name}>{name}</Text>
							</View>
							<View style={{ flex: 1, marginLeft: 4 }}>
								<Text style={styles.metaText} numberOfLines={1}>
									{count_follows}人关注
								</Text>
							</View>
						</View>
						<View style={{ flex: 1, marginTop: 10 }}>
							<Text style={styles.tintText} numberOfLines={1}>
								{description ? description : "这个专题还没有freestyle"}
							</Text>
						</View>
					</View>
					<FollowButton
						outline
						customStyle={{ width: 66, height: 30, borderRadius: 15 }}
						theme={Colors.themeColor}
						type={"category"}
						id={id}
						status={followed}
						fontSize={14}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	layoutFlexRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		backgroundColor: Colors.skinColor,
		borderRadius: 5,
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: Colors.primaryBorderColor,
		shadowOffset: { height: 0, width: 0 }
	},
	middle: {
		flex: 1,
		marginHorizontal: 10
	},
	name: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.darkFontColor
	},
	tintText: {
		fontSize: 13,
		color: Colors.tintFontColor
	},
	metaText: {
		fontSize: 12,
		color: Colors.tintFontColor
	}
});

export default withNavigation(CategoryCard);
