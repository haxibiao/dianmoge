import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../../constants/Colors";
import { Avatar } from "../../components/Pure";
import { Button } from "../../components/Button";

import { Query, Mutation, graphql } from "react-apollo";
import { submitArticleMutation } from "../../graphql/user.graphql";

class CategoryContributeGroup extends React.Component {
	render() {
		let { article, category, navigation } = this.props;
		let { submit_status } = category;
		return (
			<TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate("专题详情", { category })}>
				<View>
					<Avatar type={"category"} uri={category.logo} size={38} />
				</View>
				<View style={styles.categoryItemRight}>
					<View style={styles.categoryItemInfo}>
						<View>
							<Text style={styles.categoryItemTitle}>{category.name}</Text>
						</View>
						<View>
							<Text numberOfLines={1} style={styles.categoryItemMeta}>
								{category.count_articles + "篇文章  " + category.count_follows + "人关注" || ""}
							</Text>
						</View>
						<View>
							<Text numberOfLines={1} style={styles.categoryItemMeta}>
								投稿需要管理员审核
							</Text>
						</View>
					</View>
					<View style={{ width: 60, height: 28 }}>
						<Mutation mutation={submitArticleMutation}>
							{submitArticle => {
								return (
									<Button
										name={submit_status ? submit_status : "投稿"}
										fontSize={12}
										// color={submit_status.indexOf("投稿") !== -1 ? "rgba(66,192,46,0.9)" : Colors.themeColor}
										theme={"rgba(66,192,46,0.9)"}
										handler={() => {
											submitArticle({
												variables: {
													category_id: category.id,
													article_id: article.id
												}
											});
										}}
									/>
								);
							}}
						</Mutation>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	categoryItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		flexDirection: "row"
	},
	categoryItemRight: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10
	},
	categoryItemInfo: {
		flex: 1,
		marginRight: 15
	},
	categoryItemTitle: {
		fontSize: 16,
		color: Colors.primaryFontColor
	},
	categoryItemMeta: {
		marginTop: 6,
		fontSize: 13,
		color: Colors.tintFontColor
	}
});

export default CategoryContributeGroup;
