import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { Colors } from "../../constants";
import { goContentScreen } from "../../constants/Methods";
import { Header, TabBarHeader } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, BlankContent, SpinnerLoading } from "../../components/Pure";

import Screen from "../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { visitsQuery, myReadsQuery } from "../../graphql/user.graphql";

class HistoryScreen extends Component {
	render() {
		let { today, earlier, navigation } = this.props;
		return (
			<Screen header>
				<View style={styles.container}>
					<ScrollableTabView renderTabBar={props => <TabBarHeader {...props} width={160} />}>
						<View tabLabel="今日" style={{ flex: 1 }}>
							<Query query={visitsQuery} variables={{ visit: "TODAY" }}>
								{({ error, loading, data, fetchMore, refetch }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.visits)) return <SpinnerLoading />;
									if (data.visits.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.visits}
											keyExtractor={(item, index) => index.toString()}
											renderItem={this._historyItem}
											ListFooterComponent={() => <ContentEnd />}
										/>
									);
								}}
							</Query>
						</View>
						<View tabLabel="更早" style={{ flex: 1 }}>
							<Query query={visitsQuery} variables={{ visit: "EARLY" }}>
								{({ error, loading, data, fetchMore, refetch }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.visits)) return <SpinnerLoading />;
									if (data.visits.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.visits}
											keyExtractor={(item, index) => index.toString()}
											renderItem={this._historyItem}
											ListFooterComponent={() => <ContentEnd />}
										/>
									);
								}}
							</Query>
						</View>
					</ScrollableTabView>
				</View>
			</Screen>
		);
	}

	_historyItem = ({ item, index }) => {
		let { navigation } = this.props;
		return (
			<TouchableOpacity style={styles.historyItem} onPress={() => goContentScreen(navigation, { ...item.visited, type: item.type })}>
				<View style={{ flex: 1, marginRight: 20 }}>
					<Text style={styles.title} numberOfLines={3}>
						{item.visited.title ? item.visited.title : item.visited.description}
					</Text>
				</View>
				<Text style={styles.timeAgo}>{item.time_ago}</Text>
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	historyItem: {
		height: 100,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontSize: 16,
		lineHeight: 22,
		color: Colors.primaryFontColor
	},
	timeAgo: {
		fontSize: 13,
		color: Colors.lightFontColor
	}
});

export default connect(store => ({
	today: store.articles.browsing_history.today,
	earlier: store.articles.browsing_history.earlier
}))(HistoryScreen);
