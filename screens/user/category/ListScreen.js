import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Dimensions } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import Colors from "../../../constants/Colors";
import { CustomScrollTabBar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import { Header, HeaderLeft } from "../../../components/Header";
import { CategoryGroup } from "../../../components/MediaGroup";
import { OperationModal } from "../../../components/Modal";
import Screen from "../../Screen";

import { Query, Mutation } from "react-apollo";
import { userCategoriesQuery, userAdminCategoriesQuery } from "../../../graphql/user.graphql";
import { deleteCategoryMutation } from "../../../graphql/category.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

const { width, height } = Dimensions.get("window");

class ListScreen extends Component {
	constructor(props) {
		super(props);
		this.toggleEditModal = this.toggleEditModal.bind(this);
		this.state = {
			editModalVisible: false,
			currentCategory: null
		};
	}

	render() {
		const { user = {} } = this.props.navigation.state.params;
		let { navigation, personal, categories, administrative } = this.props;
		let { editModalVisible, currentCategory } = this.state;
		let is_self = false;
		if (user.id == personal.id) {
			is_self = true;
		}
		return (
			<Screen>
				<View style={styles.container}>
					<Header
						navigation={navigation}
						leftComponent={<HeaderLeft navigation={navigation} routeName={"专题"} />}
						rightComponent={
							is_self ? (
								<TouchableOpacity onPress={() => navigation.navigate("新建专题")}>
									<Text
										style={{
											fontSize: 17,
											color: Colors.weixinColor
										}}
									>
										新建专题
									</Text>
								</TouchableOpacity>
							) : null
						}
					/>
					<ScrollableTabView
						renderTabBar={() => (
							<CustomScrollTabBar
								tabNames={is_self ? ["我创建的", "我管理的"] : ["他创建的", "他管理的"]}
								tabBarStyle={{ borderTopColor: "transparent" }}
								tabItemWrapStyle={{
									paddingHorizontal: 10,
									marginHorizontal: 20
								}}
							/>
						)}
					>
						<View tabLabel="创建的" style={{ flex: 1 }}>
							<Query query={userCategoriesQuery} variables={{ user_id: user.id }}>
								{({ loading, error, data, refetch, fetchMore }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.categories)) return <SpinnerLoading />;
									if (data.categories.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.categories}
											keyExtractor={item => item.id.toString()}
											getItemLayout={(data, index) => ({
												length: 85,
												offset: 85 * index,
												index
											})}
											renderItem={({ item }) => (
												<TouchableOpacity
													style={styles.categoryItem}
													onPress={() =>
														navigation.navigate("专题详情", {
															category: item
														})}
													onLongPress={() => {
														if (is_self) {
															this.setState({
																currentCategory: item
															});
															this.toggleEditModal();
														}
													}}
												>
													<CategoryGroup
														navigation={navigation}
														category={item}
														showCreator
														customStyle={{
															logo: 44,
															mateSize: 13
														}}
														plain
													/>
												</TouchableOpacity>
											)}
											ListFooterComponent={() => <ContentEnd />}
										/>
									);
								}}
							</Query>
						</View>
						<View tabLabel="管理的" style={{ flex: 1 }}>
							<Query query={userAdminCategoriesQuery} variables={{ user_id: user.id }}>
								{({ loading, error, data, refetch, fetchMore }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.categories)) return <SpinnerLoading />;
									if (data.categories.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.categories}
											keyExtractor={item => item.id.toString()}
											getItemLayout={(data, index) => ({
												length: 85,
												offset: 85 * index,
												index
											})}
											renderItem={({ item }) => (
												<TouchableOpacity
													style={styles.categoryItem}
													onPress={() =>
														navigation.navigate("专题详情", {
															category: item
														})}
												>
													<CategoryGroup
														navigation={navigation}
														category={item}
														showCreator
														plain
														customStyle={{
															logo: 44,
															mateSize: 13
														}}
													/>
												</TouchableOpacity>
											)}
											ListFooterComponent={() => <ContentEnd />}
										/>
									);
								}}
							</Query>
						</View>
					</ScrollableTabView>
				</View>
				<Mutation mutation={deleteCategoryMutation}>
					{deleteCategory => {
						return (
							<OperationModal
								visible={editModalVisible}
								operation={["编辑", "删除"]}
								handleVisible={this.toggleEditModal}
								handleOperation={index => {
									if (index == 0) {
										this.editCategory();
									} else {
										deleteCategory({
											variables: {
												id: currentCategory.id
											},
											refetchQueries: deleteCategoryResult => [
												{
													query: userCategoriesQuery,
													variables: {
														user_id: user.id
													}
												}
											]
										});
										this.toggleEditModal();
									}
								}}
							/>
						);
					}}
				</Mutation>
			</Screen>
		);
	}

	toggleEditModal() {
		this.setState(prevState => ({
			editModalVisible: !prevState.editModalVisible
		}));
	}

	editCategory() {
		let { navigation } = this.props;
		let { currentCategory } = this.state;
		this.toggleEditModal();
		navigation.navigate("新建专题", {
			category: currentCategory
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	categoryItem: {
		marginHorizontal: 15,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	divisionLine: {
		height: 1,
		backgroundColor: Colors.tintGray,
		marginVertical: 15
	},
	modalText: {
		fontSize: 17,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({
	personal: store.users.user,
	categories: store.categories.categories,
	administrative: store.categories.administrative
}))(ListScreen);
