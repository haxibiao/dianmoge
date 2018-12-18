import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "../../constants";
import { Avatar } from "../../components/Pure";
import { Button } from "../../components/Button";

import { Query, Mutation, graphql } from "react-apollo";
import { submitArticleMutation } from "../../graphql/user.graphql";
import CheckBox from "react-native-check-box";
import Toast from "react-native-root-toast";

class CategoryItem extends React.Component {
	constructor(props) {
		super(props);
		let selectCategories = props.selectCategories;
		let category = props.category;
		let check = selectCategories.some((elem, index) => {
			return elem.id == category.id;
		});
		this.state = {
			check,
			disabled: true
		};
	}

	render() {
		let { category, navigation, metaInfo } = this.props;
		let { check, disabled } = this.state;
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
							{metaInfo ? (
								metaInfo
							) : (
								<Text numberOfLines={1} style={styles.categoryItemMeta}>
									{category.count_articles || 0}
									{"个内容  "}
									{category.count_follows || 0}
									{"人关注 "}
								</Text>
							)}
						</View>
						<View>
							<Text numberOfLines={1} style={styles.categoryItemMeta}>
								{category.need_approve ? "投稿需要管理员审核" : "自由投稿"}
							</Text>
						</View>
					</View>
					<CheckBox style={{ padding: 10 }} onClick={() => this.onClick(category)} isChecked={check} />
				</View>
			</TouchableOpacity>
		);
	}
	onClick(value) {
		let { category, selectCategory, disabled } = this.props;
		this.setState(
			prevState => ({
				check: !prevState.check
			}),
			() => {
				let { check } = this.state;
				console.log("状态", check);
				selectCategory(category, check);
			}
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

export default CategoryItem;
