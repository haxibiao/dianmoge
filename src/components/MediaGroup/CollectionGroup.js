import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Avatar from "../Pure/Avatar";
import FollowButton from "../Button/Follow";
import { Colors } from "../../constants";

class CollectionGroup extends Component {
	render() {
		const { collection = {}, customStyle = {}, hideButton = false, plain = false, navigation } = this.props;
		let { logo = 36, nameSize = 16, mateSize = 13, height = 40 } = customStyle;
		return (
			<View style={styles.groupWrap}>
				<View style={styles.groupLeft}>
					<TouchableOpacity onPress={() => navigation.navigate("文集详情", { collection })}>
						<Avatar type="collection" size={logo} uri={collection.logo} />
					</TouchableOpacity>
					<View style={[styles.collectionInfo, { height }]}>
						<Text
							numberOfLines={1}
							style={{
								color: Colors.primaryFontColor,
								fontSize: nameSize
							}}
						>
							{collection.name || ""}
						</Text>
						<Text
							numberOfLines={1}
							style={{
								color: Colors.tintFontColor,
								fontSize: mateSize
							}}
						>
							{`${collection.user.name} · ${collection.count_articles}篇文章 · ${collection.count_follows}人关注`}
						</Text>
					</View>
				</View>
				{!hideButton && (
					<FollowButton
						type={"collection"}
						id={collection.id}
						status={collection.followed}
						customStyle={plain ? { height: 28, width: 72 } : null}
						fontSize={plain ? 14 : 15}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	groupWrap: {
		flexDirection: "row",
		alignItems: "center"
	},
	collectionInfo: {
		justifyContent: "space-between",
		flex: 1,
		paddingLeft: 10
	},
	groupLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		marginRight: 20
	}
});

export default withNavigation(CollectionGroup);
