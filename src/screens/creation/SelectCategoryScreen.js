import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Toast from "react-native-root-toast";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Screen from "../Screen";

import CategoryItem from "./CategoryItem";
import SearchResult from "./SearchResult";

import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Element";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, graphql, compose, withApollo } from "react-apollo";
import { hotSearchAndLogsQuery, deleteQueryLogMutation } from "../../graphql/user.graphql";
import { visitCategoryQuery } from "../../graphql/category.graphql";

class SeleceCategoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.closeHistory = this.closeHistory.bind(this);
		this.deleteHistories = this.deleteHistories.bind(this);
		this.keywords = "";
		let selectCategories = props.navigation.getParam("selectCategories", []);
		selectCategories = [...selectCategories];
		this.state = {
			selectCategories,
			switchResult: true,
			fetchMore: true
		};
	}

	render() {
		let { navigation, user, hot_search, deleteQuery, login } = this.props;
		const callback = navigation.getParam("callback", {});
		let { switchResult, selectCategories } = this.state;
		return (
			<Screen header>
				<View style={styles.container}>
					<Header
						routeName
						leftComponent
						centerComponent={
							<View style={styles.searchWrap}>
								<Input words={false} style={styles.textInput} placeholder="搜索专题" onChangeText={this.onChangeText} />
								<TouchableOpacity style={styles.searchIcon} onPress={() => this.handleSearch(this.keywords)}>
									<Iconfont name={"search"} size={22} color={Colors.tintFontColor} style={{ marginRight: 8 }} />
								</TouchableOpacity>
							</View>
						}
						rightComponent={
							<TouchableOpacity
								onPress={() => {
									if (selectCategories.length > 3) {
										Toast.show("最多选择3个专题哦~", {
											shadow: true,
											delay: 100
										});
									} else {
										callback(selectCategories);
										navigation.goBack();
									}
								}}
							>
								<Text
									style={{
										fontSize: 17,
										color: Colors.themeColor,
										paddingHorizontal: 10
									}}
								>
									{selectCategories.length > 0 ? "确认 " : "取消"}
								</Text>
							</TouchableOpacity>
						}
					/>
					{switchResult ? (
						<ScrollView style={styles.container} bounces={false}>
							<Query query={visitCategoryQuery} fetchPolicy="network-only">
								{({ loading, error, data, refetch, fetchMore }) => {
									if (!(data && data.visits && data.visits.length > 0)) return null;
									return (
										<View style={styles.officialColumnWarp}>
											<View style={styles.visits}>
												<Iconfont name="browse" size={17} color={Colors.themeColor} />
												<Text style={styles.tintText}>最近逛的专题</Text>
											</View>
											<FlatList
												data={data.visits}
												keyExtractor={(item, index) => index.toString()}
												renderItem={({ item, index }) => (
													<CategoryItem
														selectCategory={this.selectCategory}
														category={{ ...item.visited, name: item.visited.title }}
														navigation={navigation}
														selectCategories={selectCategories}
														metaInfo={
															<Text numberOfLines={1} style={styles.metaInfo}>
																{item.visited.description || "这个专题还没有freestyle"}
															</Text>
														}
													/>
												)}
											/>
										</View>
									);
								}}
							</Query>
							<Query query={hotSearchAndLogsQuery}>
								{({ loading, error, data, fetchMore, refetch }) => {
									let histories = [];
									if (error) return <LoadingError reload={() => refetch()} />;
									if (login) {
										if (!(data && data.queries && data.queryLogs)) return <SpinnerLoading />;
										histories = data.queryLogs;
									} else {
										if (!(data && data.queries)) return <SpinnerLoading />;
									}
									let hotsearch = data.queries;
									this.hotsearchs += hotsearch.length;
									return (
										<View>
											<View style={styles.visits}>
												<Iconfont name="search" size={17} color={Colors.themeColor} />
												<Text style={styles.tintText}>搜索记录</Text>
											</View>
											{histories.length > 0 && (
												<View style={styles.historyWrap}>
													{this._renderHistories(histories)}
													<TouchableOpacity
														onPress={() =>
															deleteQuery({
																update: (cache, { data: { deleteQueryLog } }) => {
																	let { queries } = cache.readQuery({
																		query: hotSearchAndLogsQuery
																	});
																	cache.writeQuery({
																		query: hotSearchAndLogsQuery,
																		data: { queries, queryLogs: [] }
																	});
																}
															})
														}
													>
														<View style={[styles.searchItem, { justifyContent: "center" }]}>
															<Text style={{ fontSize: 16, color: Colors.tintFontColor }}>清除搜索记录</Text>
														</View>
													</TouchableOpacity>
												</View>
											)}
										</View>
									);
								}}
							</Query>
						</ScrollView>
					) : (
						<SearchResult
							keywords={this.keywords}
							navigation={navigation}
							selectCategory={this.selectCategory}
							selectCategories={selectCategories}
						/>
					)}
				</View>
			</Screen>
		);
	}
	// 搜索记录
	_renderHistories = data => {
		let { navigation, deleteQuery } = this.props;
		let histories = data.map((elem, index) => {
			return (
				<TouchableOpacity key={elem.id} onPress={() => this.handleSearch(elem.query)}>
					<View style={styles.searchItem}>
						<View style={styles.verticalCenter}>
							<Iconfont name={"time"} size={21} color={Colors.lightFontColor} style={{ marginRight: 20 }} />
							{elem.query && <Text style={{ fontSize: 16, color: "#666" }}>{elem.query}</Text>}
						</View>
						<TouchableOpacity
							onPress={() =>
								deleteQuery({
									variables: {
										id: elem.id
									},
									update: (cache, { data: { deleteQueryLog } }) => {
										let { queryLogs, queries } = cache.readQuery({
											query: hotSearchAndLogsQuery
										});
										queryLogs = queryLogs.filter((query, index) => {
											return query.id !== elem.id;
										});
										console.log(queryLogs);
										cache.writeQuery({
											query: hotSearchAndLogsQuery,
											data: { queries, queryLogs }
										});
									}
								})
							}
						>
							<View
								style={{
									width: 50,
									height: 50,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Iconfont name={"close"} size={20} color={Colors.lightFontColor} />
							</View>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			);
		});
		return <View>{histories}</View>;
	};

	handleSearch = keywords => {
		this.keywords = keywords;
		if (this.keywords.length > 0) {
			this.setState({ switchResult: false });
		}
	};

	onChangeText = value => {
		this.keywords = value;
		if (this.keywords.length < 1) {
			this.setState({ switchResult: true });
		}
	};

	closeHistory(id) {
		this.setState(prevState => {
			if (prevState.histories.length == 1) {
				return { histories: "" };
			}
			return {
				histories: prevState.histories.filter((elem, index) => elem.id != id)
			};
		});
	}

	deleteHistories(id) {
		this.setState({ histories: [] });
		variables: {
			id;
		}
	}

	selectCategory = (category, check) => {
		let { selectCategories } = this.state;
		if (check) {
			selectCategories.push(category);
		} else {
			selectCategories = selectCategories.filter((elem, i) => {
				return elem.id != category.id;
			});
		}
		this.setState({ selectCategories });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	searchWrap: {
		flex: 1,
		height: 32,
		borderRadius: 16,
		backgroundColor: Colors.lightGray,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		marginRight: 60
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		height: 22,
		lineHeight: 22,
		padding: 0,
		color: Colors.primaryFontColor
	},
	searchIcon: {
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: Colors.lightBorderColor
	},
	visits: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	tintText: {
		marginLeft: 8,
		fontSize: 14,
		color: Colors.tintFontColor
	},
	metaInfo: {
		marginTop: 6,
		fontSize: 13,
		color: Colors.tintFontColor
	},
	historyWrap: {
		paddingHorizontal: 15
	},
	searchItem: {
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	verticalCenter: {
		flexDirection: "row",
		alignItems: "center"
	}
});

export default compose(
	withApollo,
	connect(store => ({
		hot_search: store.search.hot_search,
		histories: store.search.histories,
		login: store.users.login
	})),
	graphql(deleteQueryLogMutation, { name: "deleteQuery" })
)(SeleceCategoryScreen);
// connect(store => ({ user: store.users.user }))(SeleceCategoryScreen);
