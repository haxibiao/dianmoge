import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Platform, Dimensions } from "react-native";
import Modal from "react-native-modal";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import { SearchTypeHeader } from "../../components/Header";
import { UserMetaGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore } from "../../components/Pure";

import { Query } from "react-apollo";
import { userFollowingsQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

const { width, height } = Dimensions.get("window");

class SearchUserModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchingMore: false,
			complete: false,
			keywords: ""
		};
	}

	render() {
		let { keywords, fetchingMore, complete } = this.state;
		let { user, navigation, visible, toggleVisible } = this.props;
		return (
			<Modal
				animationIn="slideInLeft"
				animationOut="slideOutRight"
				isVisible={visible}
				onBackButtonPress={toggleVisible}
				onBackdropPress={toggleVisible}
				backdropOpacity={0.4}
				style={{ justifyContent: "flex-end", margin: 0 }}
			>
				<View style={styles.container}>
					<SearchTypeHeader
						placeholder="搜索用户"
						navigation={navigation}
						backHandler={toggleVisible}
						keywords={keywords}
						changeKeywords={this.changeKeywords.bind(this)}
						handleSearch={() => null}
					/>
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
										if (complete) return null;
										this.setState({
											fetchingMore: true
										});
										fetchMore({
											variables: {
												offset: data.users.length
											},
											updateQuery: (prev, { fetchMoreResult }) => {
												this.setState({
													fetchingMore: false
												});
												if (fetchMoreResult.users.length < 10) {
													this.setState({
														complete: true
													});
												}
												if (!(fetchMoreResult && fetchMoreResult.users)) return prev;
												return Object.assign({}, prev, {
													users: [...prev.users, ...fetchMoreResult.users]
												});
											}
										});
									}}
									getItemLayout={(data, index) => ({
										length: 86,
										offset: 86 * index,
										index
									})}
									ListFooterComponent={() => (fetchingMore ? <LoadingMore /> : <ContentEnd />)}
								/>
							);
						}}
					</Query>
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
					我关注的用户
				</Text>
			</View>
		);
	}

	_renderUserItem = ({ item }) => {
		let { navigation, handleSelectedUser } = this.props;
		let user = item;
		return (
			<TouchableOpacity style={styles.friendItem} onPress={() => handleSelectedUser(user)}>
				<UserMetaGroup hideButton navigation={navigation} user={user} />
			</TouchableOpacity>
		);
	};

	changeKeywords(keywords) {
		this.setState({
			keywords
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor,
		paddingTop: Platform.OS === "ios" ? 20 : 0
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

export default connect(store => ({ user: store.users.user }))(SearchUserModal);
