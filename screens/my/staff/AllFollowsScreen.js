import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { Header, HeaderLeft } from "../../../components/Header";
import { FollowedGroup } from "../../../components/MediaGroup";
import { CustomPopoverMenu } from "../../../components/Modal";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import { userFollows } from "../../../graphql/user.graphql";

class AllFollowsScreen extends Component {
	constructor(props) {
		super(props);
		let filter = props.navigation.getParam("filter", "USER_CATEGORY");
		this.menuOptions = ["全部关注", "只看用户", "只看专题", "只看文集"];
		this.state = {
			filter: filter,
			fetchingMore: true
		};
	}

	render() {
		let { filter } = this.state;
		let { navigation, user } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header
						navigation={navigation}
						search
						leftComponent={
							<HeaderLeft navigation={navigation} routeName={true}>
								<CustomPopoverMenu
									width={120}
									customOptionStyle={{
										optionWrapper: {
											alignItems: "flex-start",
											paddingLeft: 10
										}
									}}
									selectHandler={index => {
										switch (index) {
											case 0:
												this.setState({ filter: "USER_CATEGORY" });
												break;
											case 1:
												this.setState({ filter: "USER" });
												break;
											case 2:
												this.setState({ filter: "CATEGORY" });
												break;
											case 3:
												this.setState({ filter: "COLLECTION" });
												break;
										}
									}}
									triggerComponent={
										<View
											style={{
												flexDirection: "row",
												alignItems: "center"
											}}
										>
											<Text
												style={{
													fontSize: 16,
													color: Colors.tintFontColor,
													marginRight: 5
												}}
											>
												{this.followType(filter)}
											</Text>
											<Iconfont name={"downward-arrow"} size={12} color={Colors.tintFontColor} />
										</View>
									}
									options={this.menuOptions}
								/>
							</HeaderLeft>
						}
					/>
					<Query query={userFollows} variables={{ user_id: user.id, filter }}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.follows)) return <SpinnerLoading />;
							if (data.follows.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.follows}
									keyExtractor={item => item.id.toString()}
									renderItem={({ item }) => {
										return (
											<TouchableOpacity
												onPress={() =>
													navigation.navigate(this.routeName(item.followed_type), {
														[this.paramKey(item.followed_type)]: { ...item, id: item.followed_id }
													})}
											>
												<FollowedGroup follow={item} />
											</TouchableOpacity>
										);
									}}
									getItemLayout={(data, index) => ({
										length: 85,
										offset: 85 * index,
										index
									})}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.follows) {
											fetchMore({
												variables: {
													offset: data.follows.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.follows && fetchMoreResult.follows.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														follows: [...prev.follows, ...fetchMoreResult.follows]
													});
												}
											});
										} else {
											this.setState({
												fetchingMore: false
											});
										}
									}}
									ListFooterComponent={() => {
										return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
									}}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	followType = filter => {
		switch (filter) {
			case "USER_CATEGORY":
				return "全部关注";
				break;
			case "USER":
				return "只看用户";
				break;
			case "CATEGORY":
				return "只看专题";
				break;
			case "COLLECTION":
				return "只看文集";
				break;
		}
	};

	routeName = followType => {
		switch (followType) {
			case "users":
				return "用户详情";
				break;
			case "categories":
				return "专题详情";
				break;
			case "collections":
				return "文集详情";
				break;
		}
	};

	paramKey = followType => {
		switch (followType) {
			case "users":
				return "user";
				break;
			case "categories":
				return "category";
				break;
			case "collections":
				return "collection";
				break;
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default connect(store => ({ user: store.users.user }))(AllFollowsScreen);
