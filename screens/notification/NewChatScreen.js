import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { SearchTypeHeader } from "../../components/Header";
import { Button } from "../../components/Button";
import { UserGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { userFriendsQuery } from "../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class NewChatScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keywords: "",
			fetchingMore: true
		};
	}

	render() {
		let { keywords } = this.state;
		let { follows, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<SearchTypeHeader
						placeholder="搜索好友"
						navigation={navigation}
						keywords={keywords}
						changeKeywords={value => this.setState({ keywords: value })}
						handleSearch={() => null}
					/>
					<Query query={userFriendsQuery}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.friends)) return <SpinnerLoading />;
							if (data.user.friends.length < 1) return <BlankContent />;
							return (
								<FlatList
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
										if (data.user.friends.length < 10) {
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
									})}
							/>
						</View>
					}
				/>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	friendItem: {
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({ follows: store.users.follows }))(NewChatScreen);
