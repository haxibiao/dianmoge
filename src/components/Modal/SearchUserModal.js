import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal';

import { Colors, Divice } from '../../constants';
import { Iconfont } from '../../utils/Fonts';
import { SearchTypeHeader } from '../../components/Header';
import { UserMetaGroup } from '../../components/MediaGroup';
import { Avatar, ContentEnd, LoadingMore } from '../../components/Pure';

import { graphql, Query, compose } from 'react-apollo';
import { userFollowingsQuery, SearchUsersQuery } from '../../graphql/user.graphql';
import { connect } from 'react-redux';
import actions from '../../store/actions';

class SearchUserModal extends Component {
	constructor(props) {
		super(props);
		this.keywords = '';
		this.state = {
			fetchingMore: false,
			search: false
		};
	}

	render() {
		let { fetchingMore, search } = this.state;
		let { user, navigation, visible, toggleVisible } = this.props;
		return (
			<Modal
				animationIn="slideInRight"
				animationOut="slideOutRight"
				isVisible={visible}
				onBackButtonPress={toggleVisible}
				onBackdropPress={toggleVisible}
				backdropOpacity={0.4}
				style={{ justifyContent: 'flex-end', margin: 0 }}
			>
				<View style={styles.container}>
					<SearchTypeHeader
						placeholder="搜索用户"
						backHandler={toggleVisible}
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
										renderItem={this._renderUserItem}
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
											length: 89,
											offset: 89 * index,
											index
										})}
									/>
								);
							}}
						</Query>
					) : (
						<Query query={userFollowingsQuery} variables={{ user_id: user.id }}>
							{({ loading, error, data, refetch, fetchMore }) => {
								if (!(data && data.users)) return null;
								return (
									<FlatList
										ListHeaderComponent={this.listHeader}
										data={data.users}
										keyExtractor={(item, index) => index.toString()}
										renderItem={this._renderUserItem}
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
											length: 89,
											offset: 89 * index,
											index
										})}
									/>
								);
							}}
						</Query>
					)}
				</View>
			</Modal>
		);
	}

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

	_renderUserItem = ({ item }) => {
		let { handleSelectedUser } = this.props;
		let user = item;
		return (
			<TouchableOpacity style={styles.friendItem} onPress={() => handleSelectedUser(user)}>
				<View style={styles.groupWrap}>
					<Avatar size={48} uri={user.avatar} />
					<View style={styles.userInfo}>
						<Text numberOfLines={1} style={styles.userName}>
							<Text>{user.name || ' '}</Text>
						</Text>
						<Text numberOfLines={1} style={styles.userIntro}>
							{user.introduction ? user.introduction : '本宝宝暂时还没想到个性签名~'}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

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
		backgroundColor: Colors.skinColor,
		marginTop: Platform.OS === 'ios' ? 0 : -20
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
	},
	groupWrap: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	userInfo: {
		flex: 1,
		marginHorizontal: 15
	},
	userName: {
		fontSize: 15,
		color: Colors.primaryFontColor
	},
	userIntro: {
		fontSize: 13,
		color: Colors.tintFontColor,
		marginTop: 6
	}
});

export default connect(store => ({ user: store.users.user }))(SearchUserModal);
