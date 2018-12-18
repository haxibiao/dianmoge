"use strict";

import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods } from "../../constants";
import { FollowButton } from "../../components/Button";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";

import { connect } from "react-redux";
import { recommandCategoriesQuery } from "../../graphql/category.graphql";
import { Query } from "react-apollo";

let page = 1;
class RecommendCategory extends React.Component {
	constructor(props) {
		super(props);
		this.refreshing = false;
	}

	render() {
		return (
			<Query query={recommandCategoriesQuery}>
				{({ loading, error, data, refetch, fetchMore }) => {
					if (error) return <LoadingError reload={() => refetch()} />;
					if (!(data && data.categories)) return null;
					return (
						<View style={{ marginVertical: 15 }}>
							<View style={styles.flexRow}>
								<Text style={styles.emptyText}>你还没关注任何专题哦，快去关注一下吧！</Text>
							</View>
							<View>
								{data.categories.map((elem, index) => {
									return this._renderCategoryItem({
										item: elem,
										index
									});
								})}
							</View>
							<TouchableWithoutFeedback
								onPress={() => {
									if (this.refreshing) return null;
									this.refreshing = true;
									fetchMore({
										variables: {
											offset: page * 3
										},
										updateQuery: (prev, { fetchMoreResult }) => {
											console.log("fetchMoreResult", fetchMoreResult);
											++page;
											this.refreshing = false;
											if (!(fetchMoreResult && fetchMoreResult.categories && fetchMoreResult.categories.length > 0)) {
												return prev;
											}
											console.log("page", page);
											return fetchMoreResult;
										}
									});
								}}
							>
								<View style={[styles.refresh, styles.flexRow]}>
									<Iconfont name="fresh" size={15} color={Colors.themeColor} />
									<Text style={styles.refreshText}>换一批</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					);
				}}
			</Query>
		);
	}

	_renderCategoryItem = ({ item, index }) => {
		let category = item;
		let { navigation } = this.props;
		return (
			<TouchableWithoutFeedback key={index} onPress={() => Methods.goContentScreen(navigation, { ...category, type: "category" })}>
				<View style={styles.recommendItem}>
					<Avatar size={60} type="category" uri={category.logo} />
					<View style={styles.followInfo}>
						<Text numberOfLines={1} style={styles.drakText}>
							{category.name}
						</Text>
						<Text numberOfLines={1} style={styles.tintText}>
							{category.description ? category.description : "这个专题还没有freestyle"}
						</Text>
					</View>
					<FollowButton
						type="category"
						id={category.id}
						status={category.followed}
						customStyle={styles.followWrap}
						theme={Colors.themeColor}
						fontSize={13}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};
}

const styles = StyleSheet.create({
	categoryCardWrap: {
		marginHorizontal: 15,
		marginBottom: 15
	},
	flexRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	emptyText: {
		fontSize: 14,
		color: Colors.darkFontColor,
		marginLeft: 15,
		marginBottom: 15
	},
	recommendItem: {
		height: 90,
		marginHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	followInfo: {
		marginHorizontal: 15,
		flex: 1
	},
	drakText: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.darkFontColor
	},
	tintText: {
		marginTop: 8,
		fontSize: 12,
		color: Colors.tintFontColor
	},
	followWrap: {
		width: 58,
		height: 26,
		borderRadius: 13
	},
	refresh: {
		justifyContent: "center",
		paddingVertical: 10
	},
	refreshText: {
		fontSize: 14,
		color: Colors.themeColor,
		marginLeft: 5
	}
});

export default RecommendCategory;
