import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Colors } from "../../../constants";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import { Header, CustomTabBar } from "../../../components/Header";
import NotificationItem from "./NotificationItem";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { categoryPendingArticlesQuery } from "../../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class CategoryScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keywords: "",
			fetchingMore: true
		};
	}

	render() {
		let { fetchingMore } = this.state;
		let { user, navigation } = this.props;
		let category = navigation.getParam("category", {});
		return (
			<Screen header={<Header routeName={category.name} />}>
				<View style={styles.container}>
					<ScrollableTabView renderTabBar={() => <CustomTabBar tabUnderlineWidth={40} />}>
						<View style={styles.container} tabLabel="全部">
							<Query query={categoryPendingArticlesQuery} variables={{ category_id: category.id, filter: "ALL" }}>
								{({ loading, error, data, refetch, fetchMore }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.category)) return <SpinnerLoading />;
									if (data.category.articles.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.category.articles}
											keyExtractor={(item, index) => index.toString()}
											renderItem={({ item }) => <NotificationItem article={item} navigation={navigation} />}
											ListFooterComponent={() => {
												return <ContentEnd />;
											}}
										/>
									);
								}}
							</Query>
						</View>
						<View style={styles.container} tabLabel="未处理">
							{/*PEDING（pending） 后端参数单词错误**/}
							<Query query={categoryPendingArticlesQuery} variables={{ category_id: category.id, filter: "PEDING" }}>
								{({ loading, error, data, refetch, fetchMore }) => {
									if (error) return <LoadingError reload={() => refetch()} />;
									if (!(data && data.category)) return <SpinnerLoading />;
									if (data.category.articles.length < 1) return <BlankContent />;
									return (
										<FlatList
											data={data.category.articles}
											keyExtractor={(item, index) => index.toString()}
											renderItem={({ item }) => <NotificationItem article={item} navigation={navigation} />}
											ListFooterComponent={() => {
												return <ContentEnd />;
											}}
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default connect(store => ({
	user: store.users.user
}))(CategoryScreen);
