import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import React, { Component } from "react";
import Color from "../../constants/Colors";
import Avatar from "../../components/Pure/Avatar";
import Config from "../../constants/Config";

const { width, height } = Dimensions.get("window");

class CategoryItem extends Component {
	render() {
		let { category } = this.props;
		return (
			<View style={styles.categoryItem}>
				<View>
					<Avatar type={"category"} size={(width - 60) / 3} uri={category.logo} />
					<View style={styles.followCountWrap}>
						<Text style={styles.followCount} numberOfLines={1}>
							{category.count_follows}人关注
						</Text>
					</View>
				</View>
				<View>
					<Text style={styles.categoryName} numberOfLines={2}>
						{category.name}
					</Text>
				</View>
				<View>
					<Text style={styles.latestFollower} numberOfLines={2}>
						{category.latest_follower ? category.latest_follower.name + "关注" : Config.AppName + "推荐"}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	categoryItem: {
		width: (width - 60) / 3
	},
	followCountWrap: {
		position: "absolute",
		bottom: 5,
		left: 5,
		right: 0,
		backgroundColor: "transparent"
	},
	followCount: {
		fontSize: 12,
		color: "#fff"
	},
	categoryName: {
		fontSize: 16,
		color: Color.primaryFontColor,
		lineHeight: 20,
		paddingVertical: 6
	},
	latestFollower: {
		fontSize: 12,
		color: Color.tintFontColor
	}
});

export default CategoryItem;
