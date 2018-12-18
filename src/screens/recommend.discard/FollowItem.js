import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar } from "../../components/Pure";
import { UserGroup, CategoryGroup } from "../../components/MediaGroup";

class FollowItem extends Component {
	render() {
		let { follow } = this.props;
		if (!(follow.user ? follow.user : follow.category)) {
			return null;
		}
		return (
			<View>
				{follow.user ? <UserGroup user={follow.user} /> : <CategoryGroup category={follow.category} />}
				<View style={{ paddingLeft: 50, marginTop: 20 }}>
					<View>
						<Text numberOfLines={3} style={[styles.recommendInfo, follow.category && { lineHeight: 22 }]}>
							{follow.user ? follow.user.introduction || "暂无简介" : follow.category.description || "暂无简介"}
						</Text>
					</View>
					{follow.user &&
						follow.user.articles.length > 0 && (
							<View style={styles.latestUpdataWrap}>
								{follow.user.articles.slice(0, 2).map((elem, index) => {
									if (elem.title) {
										return (
											<View key={index} style={[styles.latestUpdata, index == 0 && { marginBottom: 6 }]}>
												<Iconfont name={"collection"} size={14} color={Colors.tintFontColor} style={{ marginRight: 8 }} />
												<Text numberOfLines={1} style={styles.recommendInfo}>
													{elem.title}
												</Text>
											</View>
										);
									}
									return <View key={index} />;
								})}
							</View>
						)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	recommendInfo: {
		fontSize: 13,
		color: Colors.tintFontColor,
		lineHeight: 18
	},
	latestUpdataWrap: {
		marginTop: 10,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor
	},
	latestUpdata: {
		flexDirection: "row",
		alignItems: "center"
	}
});

export default FollowItem;
