import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
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
					<Query query={followersNotificationsQuery} fetchPolicy="network-only">
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
		let { user, time_ago } = item;
		if (!user) {
			return null;
		}
		return (
			<View style={styles.followerItem}>
				<UserMetaGroup user={user} topInfo={user.name + " 关注了你"} bottomInfo={time_ago} />
			</View>
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
