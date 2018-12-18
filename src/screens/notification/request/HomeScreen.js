import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header, Avatar, Badge, ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { newRequestedCategoriesQuery } from "../../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class HomeScreen extends Component {
	render() {
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={newRequestedCategoriesQuery}>
						{({ loading, error, data, fetchMore, refetch }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user)) return <SpinnerLoading />;
							if (data.user.categories.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.user.categories}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this._renderItem}
									ListHeaderComponent={this._allRequests}
									ListFooterComponent={() => <ContentEnd />}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}
	_allRequests = () => {
		let { navigation } = this.props;
		return (
			<TouchableOpacity style={styles.contributeItem} onPress={() => navigation.navigate("全部未处理请求")}>
				<View style={styles.allRequests}>
					<Iconfont name={"contribute"} size={30} color={Colors.themeColor} />
				</View>
				<View>
					<Text style={styles.contributeItemName}>查看全部未处理请求</Text>
				</View>
			</TouchableOpacity>
		);
	};

	_renderItem = ({ item }) => {
		let { navigation } = this.props;
		let category = item;
		return (
			<TouchableOpacity style={styles.contributeItem} onPress={() => navigation.navigate("专题投稿管理", { category })}>
				<View>
					<Avatar type="category" uri={category.logo} size={50} />
				</View>
				<View style={styles.contributeItemInfo}>
					<View>
						<Text numberOfLines={1} style={styles.contributeItemName}>
							{category.name}
						</Text>
					</View>
					{
						// <View style={{ marginTop: 12 }}>
						// 	<Text numberOfLines={1} style={styles.contributeInfo}>{`有新投稿 《${category.latestArticle.title}》`}</Text>
						// </View>
					}
					{item.new_requests > 0 && (
						<View style={{ marginTop: 12 }}>
							<Text numberOfLines={1} style={styles.contributeInfo}>
								还有
								{item.new_requests}
								个投稿未处理，快去处理吧:)
							</Text>
						</View>
					)}
				</View>
				{item.new_requests ? (
					<View>
						<Badge count={item.new_requests} />
					</View>
				) : null}
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	allRequests: {
		width: 50,
		height: 50,
		marginRight: 10,
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center"
	},
	contributeItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		flexDirection: "row",
		alignItems: "center"
	},
	contributeItemInfo: {
		flex: 1,
		justifyContent: "space-between",
		marginHorizontal: 10
	},
	contributeItemName: {
		fontSize: 17,
		color: Colors.primaryFontColor
	},
	contributeInfo: {
		fontSize: 13,
		color: Colors.tintFontColor
	}
});

export default connect(store => ({
	contribute_request: store.categories.contribute_request
}))(HomeScreen);
