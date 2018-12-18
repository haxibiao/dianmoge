import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Platform } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { SearchTypeHeader } from "../../components/Header";
import { Button } from "../../components/Button";
import { UserGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { userFriendsQuery, SearchUsersQuery } from "../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class NewChatScreen extends Component {
	constructor(props) {
		super(props);
		this.keywords = "";
		this.state = {
			search: false
		};
	}

	render() {
		let { search } = this.state;
		let { follows, navigation } = this.props;
		return (
			<Screen header>
				<View style={styles.container}>
					<SearchTypeHeader
						placeholder="搜索用户昵称"
						keywords={this.keywords}
						changeKeywords={this.changeKeywords.bind(this)}
						handleSearch={() => this.handleSearch(this.keywords)}
					/>
					{search ? (
						<Query query={SearchUsersQuery} variables={{ keyword: this.keywords }}>
							{({ loading, error, data, refetch, fetchMore }) => {
								if (!(data && data.users)) return null;
								return (
									<FlatList
										data={data.users}
										keyExtractor={(item, index) => index.toString()}
										renderItem={this._renderFriendItem}
										onEndReached={() => {
											fetchMore({
												variables: {
													offset: data.users.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.users && fetchMoreResult.users.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														users: [...prev.users, ...fetchMoreResult.users]
													});
												}
											});
										}}
										getItemLayout={(data, index) => ({
											length: 77,
											offset: 77 * index,
											index
										})}
									/>
								);
							}}
						</Query>
					) : (
						<Query query={userFriendsQuery}>
							{({ loading, error, data, refetch, fetchMore }) => {
								if (error) return <LoadingError reload={() => refetch()} />;
								if (!(data && data.user && data.user.friends)) return <SpinnerLoading />;
								if (data.user.friends.length < 1) return <BlankContent />;
								return (
									<FlatList
										ListHeaderComponent={this.listHeader}
										data={data.user.friends}
										keyExtractor={(item, index) => index.toString()}
										renderItem={this._renderFriendItem}
										getItemLayout={(data, index) => ({
											length: 77,
											offset: 77 * index,
											index
										})}
										onEndReachedThreshold={0.3}
										onEndReached={() => {
											fetchMore({
												variables: {
													offset: data.user.friends.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.users && fetchMoreResult.users.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														user: Object.assign({}, prev.user, {
															friends: [...prev.user.friends, ...fetchMoreResult.user.friends]
														})
													});
												}
											});
										}}
									/>
								);
							}}
						</Query>
					)}
				</View>
			</Screen>
		);
	}

	_renderFriendItem = ({ item }) => {
		let { navigation } = this.props;
		let user = item;
		return (
			<View style={styles.friendItem}>
				<UserGroup
					navigation={navigation}
					user={user}
					rightButton={
						<View style={{ width: 56, height: 28 }}>
							<Button
								outline
								fontSize={13}
								name="写信"
								handler={() =>
									navigation.navigate("聊天页", {
										withUser: user
									})
								}
							/>
						</View>
					}
				/>
			</View>
		);
	};

	listHeader() {
		return (
			<View style={styles.follows}>
				<Text
					style={{
						fontSize: 13,
						color: Colors.lightFontColor
					}}
				>
					你关注的人
				</Text>
			</View>
		);
	}

	changeKeywords(keywords) {
		this.keywords = keywords;
		if (this.keywords.length < 1) {
			this.setState({ search: false });
		}
	}

	handleSearch(keywords) {
		this.keywords = keywords;
		if (this.keywords.length > 0) {
			this.setState({
				search: true
			});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	follows: {
		paddingLeft: 15,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	friendItem: {
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({ follows: store.users.follows }))(NewChatScreen);
