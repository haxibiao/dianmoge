import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Dimensions } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header, HeaderLeft } from "../../../components/Header";
import { CollectionGroup } from "../../../components/MediaGroup";
import { WriteModal, OperationModal } from "../../../components/Modal";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, Mutation } from "react-apollo";
import { userCollectionsQuery } from "../../../graphql/user.graphql";
import { createCollectionMutation } from "../../../graphql/collection.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

const { width, height } = Dimensions.get("window");

class ListScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleCreateModal = this.toggleCreateModal.bind(this);
		this.toggleEditModal = this.toggleEditModal.bind(this);
		this.changeCollectionName = this.changeCollectionName.bind(this);
		this.collectionName = "";
		this.state = {
			createModalVisible: false,
			editModalVisible: false,
			currentCollection: null
		};
	}

	render() {
		const { user = {} } = this.props.navigation.state.params;
		let { navigation, currentUser, collections } = this.props;
		let { createModalVisible, editModalVisible, currentCollection } = this.state;
		let is_self = false;
		if (user.id == currentUser.id) {
			is_self = true;
		}
		return (
			<Screen header>
				<Query query={userCollectionsQuery} variables={{ user_id: user.id }}>
					{({ loading, error, data, refetch, fetchMore }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (!(data && data.collections)) return <SpinnerLoading />;
						if (data.collections.length < 1) return <BlankContent />;
						this.collections = data.collections;
						return (
							<View style={[styles.container, !is_self && { backgroundColor: Colors.skinColor }]}>
								<Header
									routeName="文集"
									rightComponent={
										is_self &&
										this.collections && (
											<TouchableOpacity onPress={() => navigation.navigate("文集排序", { collections: this.collections })}>
												<Text
													style={{
														fontSize: 17,
														color: Colors.weixinColor
													}}
												>
													排序
												</Text>
											</TouchableOpacity>
										)
									}
								/>
								<FlatList
									data={data.collections}
									ListHeaderComponent={() => this._listHeader(is_self)}
									keyExtractor={item => item.id.toString()}
									getItemLayout={(data, index) => ({
										length: 85,
										offset: 85 * index,
										index
									})}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={styles.collectionItem}
											onPress={() =>
												navigation.navigate("文集详情", {
													collection: item
												})
											}
											onLongPress={() => {
												this.setState({ currentCollection: item });
												this.toggleEditModal();
											}}
										>
											<CollectionGroup
												navigation={navigation}
												collection={item}
												customStyle={{
													logo: 44,
													mateSize: 13
												}}
												hideButton
											/>
										</TouchableOpacity>
									)}
									ListFooterComponent={() => <ContentEnd />}
								/>
							</View>
						);
					}}
				</Query>
				<Mutation mutation={createCollectionMutation}>
					{createCollection => {
						return (
							<WriteModal
								modalName="新建文集"
								placeholder={"文集名"}
								visible={createModalVisible}
								value={this.collectionName}
								handleVisible={this.toggleCreateModal}
								changeVaule={this.changeCollectionName}
								submit={() => {
									createCollection({
										variables: {
											name: this.collectionName
										},
										refetchQueries: addCollection => [
											{
												query: userCollectionsQuery,
												variables: {
													user_id: user.id
												}
											}
										]
									});
									this.toggleCreateModal();
								}}
							/>
						);
					}}
				</Mutation>
				<OperationModal
					visible={editModalVisible}
					operation={["编辑"]}
					handleVisible={this.toggleEditModal}
					handleOperation={index => {
						if (index == 0) {
							this.editCollection();
						}
					}}
				/>
			</Screen>
		);
	}

	_listHeader = bool => {
		return bool ? (
			<View style={{ marginBottom: 30 }}>
				<View
					style={{
						paddingLeft: 15,
						paddingVertical: 10
					}}
				>
					<Text
						style={{
							fontSize: 12,
							color: Colors.tintFontColor
						}}
					>
						温馨提示：第一个文集将作为你新建文章的默认文集
					</Text>
				</View>
				<TouchableOpacity style={styles.addCollection} onPress={this.toggleCreateModal}>
					<Iconfont name={"fill-add"} size={25} color={Colors.weixinColor} />
					<Text
						style={{
							fontSize: 17,
							color: Colors.primaryFontColor,
							marginLeft: 12
						}}
					>
						新建一个文集
					</Text>
				</TouchableOpacity>
			</View>
		) : null;
	};

	changeCollectionName(val) {
		this.collectionName = val;
	}

	toggleCreateModal() {
		this.setState(prevState => ({
			createModalVisible: !prevState.createModalVisible
		}));
	}

	toggleEditModal(collection) {
		this.setState(prevState => ({
			editModalVisible: !prevState.editModalVisible
		}));
	}

	editCollection() {
		let { navigation } = this.props;
		let { currentCollection } = this.state;
		this.toggleEditModal();
		navigation.navigate("编辑文集", {
			collection: currentCollection
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray
	},
	collectionItem: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor
	},
	addCollection: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 30,
		paddingVertical: 12,
		backgroundColor: Colors.skinColor,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	currentUser: store.users.user,
	collections: store.categories.collections
}))(ListScreen);
