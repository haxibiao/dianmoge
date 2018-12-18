import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { Avatar, ContentEnd } from "../../components/Pure";
import { FollowCategoryButton, Button } from "../../components/Button";
import UserListHorizontal from "../../components/User/UserListHorizontal";
import { MenuOption } from "react-native-popup-menu";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation } from "react-apollo";
import { userArticlesSubmitStatusQuery, submitArticleMutation } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

const contributeItem = {
	optionWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor
	}
};

class ArticleItem extends Component {
	render() {
		let { article, category } = this.props;
		let { submit_status } = article;
		return (
			<TouchableOpacity style={styles.contributeItem}>
				<View style={{ flex: 1, marginRight: 20 }}>
					<Text numberOfLines={2} style={{ fontSize: 16, color: Colors.primaryFontColor, lineHeight: 22 }}>
						{article.title}
					</Text>
				</View>
				<View style={{ width: 58, height: 28 }}>
					<Mutation mutation={submitArticleMutation}>
						{submitArticle => {
							return (
								<Button
									outline
									name={submit_status}
									fontSize={12}
									theme={
										submit_status.indexOf("投稿") !== -1 || submit_status.indexOf("收录") !== -1
											? "rgba(66,192,46,0.9)"
											: Colors.themeColor
									}
									handler={() => {
										submitArticle({
											variables: { category_id: category.id, article_id: article.id }
										});
									}}
								/>
							);
						}}
					</Mutation>
				</View>
			</TouchableOpacity>
		);
	}
}

class CategoryTopInfo extends Component {
	constructor(props) {
		super(props);
		this.handleVisible = this.handleVisible.bind(this);
		this.state = {
			modalVisible: false
		};
	}

	render() {
		let { category = {}, navigation, user } = this.props;
		let { modalVisible } = this.state;
		return (
			<View style={styles.categoryInfo}>
				<View style={styles.categoryInfoTop}>
					<View>
						<Avatar type={"category"} uri={category.logo} size={80} />
					</View>
					<View style={{ marginTop: 10, marginLeft: 20 }}>
						<View style={{ marginBottom: 10 }}>
							<Text
								style={{
									fontSize: 20,
									color: Colors.primaryFontColor
								}}
							>
								{category.name}
							</Text>
						</View>
						<View>
							<Text
								style={{
									fontSize: 16,
									color: "#666"
								}}
							>
								<Text
									style={{
										color: Colors.linkColor
									}}
									onPress={() => navigation.navigate("用户详情", { user: category.user })}
								>
									{category.user.name + " "}
								</Text>
								编·
								{category.count_articles}
								篇文章
							</Text>
						</View>
					</View>
				</View>
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity style={styles.categoryDescription} onPress={() => navigation.navigate("专题介绍", { category })}>
						<View style={{ flex: 1 }}>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 15,
									color: "#666"
								}}
							>
								{category.description ? category.description : "暂无简介"}
							</Text>
						</View>
						<Iconfont name={"right"} size={16} color={Colors.primaryFontColor} />
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}
					>
						<Iconfont name={"upload"} size={12} color={Colors.tintFontColor} />
						<Text style={styles.upload}>投稿需要审核</Text>
					</View>
				</View>
				<View style={styles.categoryButton}>
					<View style={{ flex: 1, marginRight: 6 }}>
						<FollowCategoryButton
							size={15}
							id={category.id}
							type={"category"}
							user={user}
							followed={category.followed}
							follows={category.count_follows}
						/>
					</View>
					<View style={{ flex: 1, marginLeft: 6 }}>
						<Button outline name={"投稿"} fontSize={17} handler={this.handleVisible} />
					</View>

					<Query query={userArticlesSubmitStatusQuery} variables={{ category_id: category.id }}>
						{({ loading, error, data }) => {
							if (!(data && data.user && data.user.articles)) return null;
							return (
								<Modal
									isVisible={modalVisible}
									onBackButtonPress={this.handleVisible}
									onBackdropPress={this.handleVisible}
									backdropOpacity={0.4}
									style={{ justifyContent: "flex-end", margin: 0 }}
								>
									<View style={{ height: 400, backgroundColor: Colors.skinColor }}>
										<View style={{ padding: 20 }}>
											<Text style={{ fontSize: 14, color: Colors.tintFontColor }}>向专题投稿</Text>
										</View>
										<FlatList
											data={data.user.articles}
											keyExtractor={item => item.id.toString()}
											renderItem={({ item, index }) => <ArticleItem article={item} category={category} />}
											ListFooterComponent={() => <ContentEnd />}
										/>
									</View>
								</Modal>
							);
						}}
					</Query>
				</View>
				<TouchableOpacity style={styles.recommendAuthor} onPress={() => navigation.navigate("专题推荐作者", { data: category.authors })}>
					<UserListHorizontal users={category.authors.slice(0, 6)} radius={16} />
					<View style={{ marginLeft: 6 }}>
						<Text
							style={{
								fontSize: 14,
								color: Colors.primaryFontColor
							}}
						>
							等{category.authors.length}
							位推荐作者
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	_contributeItem = ({ item }) => {
		return (
			<MenuOption customStyles={contributeItem}>
				<View style={{ flex: 1, marginRight: 20 }}>
					<Text numberOfLines={2} style={{ fontSize: 16, color: Colors.primaryFontColor, lineHeight: 22 }}>
						{item.title}
					</Text>
				</View>
				<View style={{ width: 52, height: 28 }}>
					<Button
						outline
						name={item.submited_status !== "已收录" ? "投稿" : "撤回"}
						fontSize={14}
						theme={item.submited_status !== "已收录" ? "rgba(66,192,46,0.9)" : Colors.themeColor}
						handler={() => null}
					/>
				</View>
			</MenuOption>
		);
	};

	handleVisible() {
		this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
	}
}

const styles = StyleSheet.create({
	categoryInfo: {
		padding: 20
	},
	categoryInfoTop: {
		flexDirection: "row",
		paddingBottom: 20
	},
	categoryDescription: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10
	},
	upload: {
		fontSize: 12,
		color: Colors.tintFontColor,
		marginLeft: 5
	},
	categoryButton: {
		flexDirection: "row",
		height: 42
	},
	recommendAuthor: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
		marginBottom: 15
	},
	contributeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor
	}
});

export default connect(store => ({ user: store.users.user }))(CategoryTopInfo);
