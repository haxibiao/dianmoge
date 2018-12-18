import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";
import { UserGroup } from "../../../components/MediaGroup";
import { LoadingError, LoadingMore, ContentEnd, BlankContent, SpinnerLoading } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, graphql } from "react-apollo";
import { blockedUsersQuery, blockUserMutation } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class BlacklistScreen extends Component {
	render() {
		let { follows, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={blockedUsersQuery} fetchPolicy={"network-only"}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.blockedUsers)) return <SpinnerLoading />;
							if (!data.user.blockedUsers.length > 0) return <BlankContent />;
							let blockedUsers = data.user.blockedUsers;
							return (
								<FlatList
									data={blockedUsers}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => {
										return (
											<View style={styles.blackUserItem}>
												<UserGroup
													user={item}
													rightButton={
														<BlockedButton
															onPress={() => {
																this.props.blockUserMutation({
																	variables: {
																		user_id: item.id
																	}
																});
															}}
														/>
													}
												/>
											</View>
										);
									}}
									ListFooterComponent={() => <ContentEnd />}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}
}

class BlockedButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: true
		};
	}

	toggleStatus = () => {
		this.setState(prevState => ({
			status: !prevState.status
		}));
	};

	render() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.onPress();
					this.toggleStatus();
				}}
				style={styles.buttonWrap}
			>
				<Text style={styles.btnText}>{this.state.status ? "移除黑名单" : "加入黑名单"}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	blackUserItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	buttonWrap: {
		width: 80,
		height: 26,
		borderWidth: 1,
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
		borderColor: Colors.themeColor
	},
	btnText: {
		textAlign: "center",
		color: Colors.themeColor,
		fontSize: 13
	}
});

export default connect(store => ({
	follows: store.users.follows
}))(graphql(blockUserMutation, { name: "blockUserMutation" })(BlacklistScreen));
