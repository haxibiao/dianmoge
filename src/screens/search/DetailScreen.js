import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { SearchHeader } from "../../components/Header";
import { Avatar, DivisionLine, ContentEnd, LoadingMore } from "../../components/Pure/Avatar";
import SearchArticleItem from "../../components/Article/SearchArticleItem";

import { connect } from "react-redux";
import { graphql, Query } from "react-apollo";

class DetailScreen extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.changeKeywords = this.changeKeywords.bind(this);
		this.filterArticleSort = this.filterArticleSort.bind(this);
		this._matchingText = this._matchingText.bind(this);
		this._renderRelatedUserItem = this._renderRelatedUserItem.bind(this);
		this._renderRelatedCategoryItem = this._renderRelatedCategoryItem.bind(this);
		this._renderSearchHeader = this._renderSearchHeader.bind(this);
		this._renderRelatedArticle = this._renderRelatedArticle.bind(this);
		this.state = {
			keywords: "美味",
			filter: "time-fill"
		};
	}

	render() {
		let { keywords } = this.state;
		let { navigation, search_detail } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<SearchHeader changeKeywords={this.changeKeywords} keywords={keywords} navigation={navigation} handleSearch={this.handleSearch} />

					<FlatList
						data={search_detail.articles}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderRelatedArticle}
						ListHeaderComponent={this._renderSearchHeader}
						ListFooterComponent={() => {
							return <ContentEnd />;
						}}
					/>
				</View>
			</Screen>
		);
	}

	handleSearch(keywords) {
		let { navigation } = this.props;
		let navigateAction = NavigationActions.replace({
			key: navigation.state.key,
			routeName: "搜索详情",
			params: { keywords }
		});
		navigation.dispatch(navigateAction);
	}

	_matchingText(keywords, content) {
		// todo 可以替换 但是不能创建React Element
		// var reg = new RegExp(keywords,"g");
		// if(reg.test(content)&&keywords) {
		// 	// var highlightKeywords = React.createElement(Text,{style:{styles.focused}},keywords);
		// 	var enhanceContent = content.replace(reg,`<Text style={styles.focused}>${keywords}</Text>`);
		// 	return enhanceContent;
		// }else {
		// 	return content;
		// }
		return content;
	}

	_renderRelatedUserItem(item, index) {
		let { navigation } = this.props;
		return (
			<TouchableOpacity style={styles.relatedItem} key={index} onPress={() => navigation.navigate("用户详情", { user: item })}>
				<Avatar uri={item.avatar} size={40} />
				<Text style={styles.relatedItemName}>{item.name}</Text>
			</TouchableOpacity>
		);
	}

	_renderRelatedCategoryItem(item, index) {
		let { navigation } = this.props;
		return (
			<TouchableOpacity style={styles.relatedItem} key={index} onPress={() => navigation.navigate("专题详情", { category: item })}>
				<Avatar uri={item.logo} type={"category"} size={40} />
				<Text style={styles.relatedItemName}>{item.name}</Text>
			</TouchableOpacity>
		);
	}

	_renderSearchHeader() {
		let { filter, keywords } = this.state;
		let { navigation, search_detail } = this.props;
		let { users, categories, collections } = search_detail;
		return (
			<View>
				<View>
					<TouchableOpacity style={styles.relatedType} onPress={() => navigation.navigate("相关用户", { keywords })}>
						<Text style={styles.relatedTypeText}>相关用户</Text>
						<Iconfont name={"right"} color={Colors.tintFontColor} size={16} />
					</TouchableOpacity>
					<View style={styles.relatedItemList}>
						{users.slice(0, 4).map((elem, idnex) => {
							return this._renderRelatedUserItem(elem, idnex);
						})}
					</View>
				</View>
				<DivisionLine height={18} />
				<View>
					<TouchableOpacity style={styles.relatedType} onPress={() => navigation.navigate("相关专题", { keywords })}>
						<Text style={styles.relatedTypeText}>相关专题</Text>
						<Iconfont name={"right"} color={Colors.tintFontColor} size={16} />
					</TouchableOpacity>
					<View style={styles.relatedItemList}>
						{categories.slice(0, 4).map((elem, idnex) => {
							return this._renderRelatedCategoryItem(elem, idnex);
						})}
					</View>
				</View>
				<DivisionLine height={18} />
				<TouchableOpacity style={styles.relatedType} onPress={() => navigation.navigate("相关文集", { keywords })}>
					<Text style={styles.relatedTypeText}>相关文集</Text>
					<Iconfont name={"right"} color={Colors.tintFontColor} size={16} />
				</TouchableOpacity>
				<DivisionLine height={18} />
				<View style={styles.filterArticleHeader}>
					<Text
						style={[styles.relatedTypeText, filter == "time-fill" ? styles.focused : {}]}
						onPress={() => this.filterArticleSort("time-fill")}
					>
						按时间
					</Text>
					<View style={styles.divisionLine} />
					<Text style={[styles.relatedTypeText, filter == "hits" ? styles.focused : {}]} onPress={() => this.filterArticleSort("hits")}>
						按热度
					</Text>
				</View>
			</View>
		);
	}

	_renderRelatedArticle({ item, index }) {
		let { navigation } = this.props;
		let { keywords } = this.state;
		return <SearchArticleItem navigation={navigation} keywords={keywords} post={item} />;
	}

	changeKeywords(keywords) {
		this.setState({ keywords });
	}

	filterArticleSort(filter) {
		this.setState({ filter });
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	relatedType: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	relatedTypeText: {
		fontSize: 15,
		color: Colors.tintFontColor
	},
	relatedItemList: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 5,
		paddingBottom: 25,
		paddingHorizontal: 15
	},
	relatedItem: {
		flex: 1,
		alignItems: "center"
	},
	relatedItemName: {
		fontSize: 14,
		color: Colors.primaryFontColor,
		marginTop: 8
	},
	filterArticleHeader: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15
	},
	divisionLine: {
		width: 1,
		height: 20,
		marginHorizontal: 10,
		backgroundColor: Colors.tintGray
	},
	focused: {
		color: Colors.themeColor
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(DetailScreen);
