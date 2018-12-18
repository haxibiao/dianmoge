import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions } from "react-native";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";

import { categoryAdminsQuery, categoryAuthorsQuery, categoryFollowersQuery } from "../../graphql/category.graphql";
import { Mutation, Query } from "react-apollo";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class MembersScreen extends Component {
	constructor(props) {
		super(props);
		this.category = props.navigation.getParam("category", {});
		this.state = {};
	}

	render() {
		let { navigation } = this.props;
		let { authors, admins } = this.category;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={categoryFollowersQuery} variables={{ id: this.category.id }}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.users)) return null;
							return (
								<FlatList
									ListHeaderComponent={() => this._renderHeader(authors, admins)}
									data={data.users}
									keyExtractor={(item, index) => index.toString()}
									numColumns={3}
									renderItem={this._memberItem}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										// if (follows) {
										// 	fetchMore({
										// 		variables: {
										// 			offset: follows.length
										// 		},
										// 		updateQuery: (
										// 			prev,
										// 			{ fetchMoreResult }
										// 		) => {
										// 			if (fetchMoreResult) {
										// 				return {
										// 					...prev,
										// 					...fetchMoreResult
										// 				};
										// 			}
										// 		}
										// 	});
										// }
									}}
									ListFooterComponent={() => {
										if (data.users.length > 0) {
											return <ContentEnd />;
										} else {
											return <View />;
										}
									}}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	_memberItem = ({ item }) => {
		let { navigation } = this.props;
		let user = item;
		return (
			<TouchableOpacity onPress={() => navigation.navigate("用户详情", { user })}>
				<View style={styles.memberItem}>
					<View style={{ marginBottom: 12 }}>
						<Avatar uri={user.avatar} size={46} />
						{user.id == this.category.user.id && (
							<View style={styles.creatorMark}>
								<Text style={{ fontSize: 10, color: "#fff" }}>创建者</Text>
							</View>
						)}
					</View>
					<View>
						<Text
							style={{
								fontSize: 15,
								color: Colors.primaryFontColor
							}}
						>
							{user.name}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	_renderHeader = (authors, admins) => {
		let { navigation } = this.props;
		return (
			<View>
				{admins.length > 0 && (
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: Colors.lightBorderColor
						}}
					>
						<View style={styles.membersType}>
							<Text style={styles.memberItemText}>
								管理员(
								{admins.length})
							</Text>
						</View>
						<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
							{admins.map((user, index) => {
								return (
									<View key={index.toString()}>
										{this._memberItem({
											item: user
										})}
									</View>
								);
							})}
						</View>
					</View>
				)}
				{authors.length > 0 && (
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: Colors.lightBorderColor
						}}
					>
						<View style={styles.membersType}>
							<Text style={styles.memberItemText}>
								活跃用户(
								{authors.length})
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap"
							}}
						>
							{authors.map((user, index) => {
								return (
									<View key={index.toString()}>
										{this._memberItem({
											item: user
										})}
									</View>
								);
							})}
						</View>
					</View>
				)}
				{this.category.count_follows > 0 && (
					<View style={styles.membersType}>
						<Text style={styles.memberItemText}>
							关注的人(
							{this.category.count_follows})
						</Text>
					</View>
				)}
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	memberItem: {
		alignItems: "center",
		paddingVertical: 20,
		width: width / 3
	},
	creatorMark: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		height: 16,
		paddingHorizontal: 2,
		backgroundColor: Colors.themeColor,
		borderRadius: 10,
		left: 20,
		bottom: 0
	},
	membersType: {
		paddingHorizontal: 15,
		marginVertical: 15
	},
	memberItemText: {
		fontSize: 15,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({
	category_detail: store.categories.category_detail
}))(MembersScreen);
