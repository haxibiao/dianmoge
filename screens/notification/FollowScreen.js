import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { Header } from "../../components/Header";
import { UserMetaGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import { followersNotificationsQuery, unreadsQuery } from "../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

class FollowScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let { currentUser, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<Query query={followersNotificationsQuery}>
						{({ loading, error, data, refetch, fetchMore, client }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user)) return <SpinnerLoading />;
							if (data.user.notifications.length < 1) return <BlankContent />;
							//retech unreadsQuery ...
							client.query({
								query: unreadsQuery,
								fetchPolicy: "network-only"
							});
							return (
								<FlatList
									data={data.user.notifications}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem.bind(this)}
									ListFooterComponent={() => <ContentEnd />}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}

	_renderItem({ item, index }) {
		let { navigation } = this.props;
		let notification = item;
		return (
			<TouchableOpacity
				style={styles.followerItem}
				onPress={() =>
					navigation.navigate("用户详情", {
						user: notification.user
					})}
			>
				<UserMetaGroup
					navigation={navigation}
					plain
					customStyle={{
						avatar: 42,
						nameSize: 17,
						metaSize: 13
					}}
					user={notification.user}
					topInfo={notification.user.name + " 关注了你"}
					bottomInfo={notification.time_ago}
				/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	followerItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	currentUser: store.users.user
}))(FollowScreen);
