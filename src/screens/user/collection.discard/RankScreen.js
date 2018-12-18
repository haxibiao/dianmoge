import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, FlatList, Text } from "react-native";
import SortableListView from "react-native-sortable-listview";

import Screen from "../../Screen";
import { Iconfont } from "../../../utils/Fonts";
import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";

import { Query } from "react-apollo";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import { userCollectionsQuery } from "../../../graphql/user.graphql";

class RankScreen extends React.Component {
	constructor(props) {
		super(props);

		let data = props.navigation.getParam("collections", []);
		this.state = {
			data,
			order: Object.keys(data)
		};
	}

	render() {
		let { data, order } = this.state;
		let { navigation } = this.props;
		return (
			<Screen header>
				<View style={styles.container}>
					<Header
						routeName="文集排序"
						rightComponent={
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Text
									style={{
										fontSize: 17,
										color: Colors.weixinColor
									}}
								>
									完成
								</Text>
							</TouchableOpacity>
						}
					/>
					<View style={styles.remind}>
						<Text
							style={{
								fontSize: 12,
								color: Colors.tintFontColor
							}}
						>
							温馨提示：第一个文集将作为你新建文章的默认文集
						</Text>
					</View>
					<SortableListView
						style={{ flex: 1 }}
						data={data}
						order={order}
						onRowMoved={e => {
							order.splice(e.to, 0, order.splice(e.from, 1)[0]);
							this.setState({
								order
							});
						}}
						renderRow={row => this.collectionItem(row)}
					/>
				</View>
			</Screen>
		);
	}

	collectionItem(data) {
		return (
			<TouchableOpacity style={styles.collectionItem} {...this.props.sortHandlers}>
				<Text style={styles.collectionName}>{data.name}</Text>
				<Iconfont name={"more-rail"} size={25} color={Colors.tintFontColor} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	remind: {
		paddingLeft: 15,
		paddingVertical: 12,
		backgroundColor: Colors.lightGray,
		borderBottomWidth: 1,
		borderColor: Colors.lightBorderColor
	},
	collectionItem: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor,
		backgroundColor: Colors.skinColor,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	collectionName: {
		fontSize: 16,
		color: Colors.primaryFontColor
	}
});

export default connect(store => ({
	collections: store.categories.collections
}))(RankScreen);
