import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native";
import SortableListView from "react-native-sortable-listview";

import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { Header, HeaderRight } from "../../../components/Header";
import { ModificationModal } from "../../../components/Modal";
import Screen from "../../Screen";

import { Query, Mutation } from "react-apollo";
import { userCollectionsQuery } from "../../../graphql/user.graphql";
import { editCollectionMutation, deleteCollectionMutation } from "../../../graphql/collection.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class EditScreen extends Component {
	constructor(props) {
		super(props);
		let data = [
			{
				id: 1,
				title: "家常菜谱 | 剁椒蒜苗"
			},
			{
				id: 2,
				title: "懒人食谱 | 海鲜炒饭 — 营养美味"
			},
			{
				id: 3,
				title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高"
			},
			{
				id: 4,
				title: "食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效"
			},
			{
				id: 5,
				title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气"
			},
			{
				id: 6,
				title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩"
			}
		];
		this.toggleModalVisible = this.toggleModalVisible.bind(this);
		let { collection } = props.navigation.state.params;
		this.state = {
			data,
			order: Object.keys(data),
			modalVisible: false,
			collectionName: collection.name,
			collectionId: collection.id
		};
	}

	render() {
		let { data, order, modalVisible, collectionName, collectionId } = this.state;
		let { navigation, user } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Mutation mutation={deleteCollectionMutation}>
						{deleteCollection => {
							return (
								<Header
									navigation={navigation}
									routeName="编辑文集"
									rightComponent={
										<HeaderRight
											options={["删除文集"]}
											selectHandler={index => {
												if (index == 0) {
													deleteCollection({
														variables: {
															id: collectionId
														},
														update: (cache, { data: { deleteCollection } }) => {
															let prev = cache.readQuery({
																query: userCollectionsQuery,
																variables: {
																	user_id: user.id
																}
															});
															prev = {
																collections: prev.collections.filter(item => item.id != deleteCollection.id)
															};
															cache.writeQuery({
																query: userCollectionsQuery,
																variables: {
																	user_id: user.id
																},
																data: prev
															});
															//TODO: TOAST...
															this.props.navigation.goBack();
														}
													});
												}
											}}
										/>
									}
								/>
							);
						}}
					</Mutation>
					<ScrollView>
						<View style={styles.modification}>
							<Text style={styles.highlightText}>修改文集名</Text>
							<TouchableOpacity onPress={this.toggleModalVisible}>
								<Text style={styles.collectionName}>{collectionName}</Text>
							</TouchableOpacity>
						</View>
						<View style={{ paddingVertical: 12, paddingHorizontal: 15 }}>
							<Text style={styles.highlightText}>文集目录</Text>
						</View>
						<View style={styles.remind}>
							<Text style={{ fontSize: 13, color: Colors.tintFontColor }}>按住上下拖动可调整文章顺序</Text>
						</View>
						<SortableListView
							style={{ flex: 1 }}
							data={data}
							order={order}
							onRowMoved={e => {
								order.splice(e.to, 0, order.splice(e.from, 1)[0]);
								this.setState({
									order
								});
							}}
							renderRow={row => this.renderArticleItem(row)}
						/>
					</ScrollView>
				</View>
				<Mutation mutation={editCollectionMutation}>
					{editCollection => {
						return (
							<ModificationModal
								modalName="修改文集名"
								visible={modalVisible}
								value={collectionName}
								handleVisible={this.toggleModalVisible}
								submit={value => {
									editCollection({
										variables: {
											id: collectionId,
											name: value
										}
									});
									this.setState({ collectionName: value });
									this.toggleModalVisible();
								}}
							/>
						);
					}}
				</Mutation>
			</Screen>
		);
	}

	renderArticleItem(article) {
		return (
			<TouchableOpacity style={styles.articleItem} {...this.props.sortHandlers}>
				<Iconfont name={"more-rail"} size={25} color={Colors.tintFontColor} />
				<View style={{ flex: 1, marginLeft: 8, marginRight: 15 }}>
					<Text numberOfLines={2} style={styles.title}>
						{article.title}
					</Text>
				</View>
				<Iconfont name={"chacha"} size={20} color={Colors.tintFontColor} />
			</TouchableOpacity>
		);
	}

	toggleModalVisible() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	modification: {
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	highlightText: {
		fontSize: 13,
		color: Colors.themeColor
	},
	remind: {
		paddingHorizontal: 15,
		paddingVertical: 12,
		backgroundColor: Colors.lightGray
	},
	articleItem: {
		height: 70,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontSize: 15,
		lineHeight: 20,
		color: Colors.primaryFontColor,
		textAlign: "left"
	},
	collectionName: {
		marginTop: 10,
		fontSize: 17,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({ user: store.users.user }))(EditScreen);
