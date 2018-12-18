import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import { Colors, Methods } from "../../../constants";
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
		this.menuOptions = ["全部关注", "只看用户", "只看专题"];
		this.state = {
			filter: filter,
			fetchingMore: true
		};
	}

	render() {
		let { filter } = this.state;
		let { navigation, user } = this.props;
		return (
			<Screen header={this.renderHeader()}>
				<View style={styles.container}>
					<Query query={userFollows} variables={{ user_id: user.id, filter }}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.follows)) return <SpinnerLoading />;
							if (data.follows.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.follows}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => {
										return (
											<TouchableOpacity
												onPress={() =>
													Methods.goContentScreen(navigation, { ...item, id: item.followed_id, type: item.followed_type })
												}
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

	renderHeader = () => {
		let { filter } = this.state;
		return (
			<Header
				centerComponent={
					<View style={styles.filter}>
						<CustomPopoverMenu
							width={120}
							customOptionStyle={{
								optionWrapper: {
									alignItems: "center"
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
											color: Colors.primaryFontColor,
											marginRight: 5
										}}
									>
										{this.followType(filter)}
									</Text>
									<Iconfont name={"downward-arrow"} size={12} color={Colors.primaryFontColor} />
								</View>
							}
							options={this.menuOptions}
						/>
					</View>
				}
			/>
		);
	};

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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	filter: {
		flex: 1,
		marginHorizontal: 40,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default connect(store => ({ user: store.users.user }))(AllFollowsScreen);
