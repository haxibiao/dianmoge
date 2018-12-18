import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../constants";
import { CollectionGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../store/actions";

class RelatedCollectionsScreen extends Component {
	render() {
		let { navigation } = this.props;
		let collections = navigation.getParam("collections", []);
		return (
			<Screen>
				<View style={styles.container}>
					<FlatList
						style={{ paddingHorizontal: 15 }}
						data={collections}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderItem.bind(this)}
						getItemLayout={(data, index) => ({
							length: 76,
							offset: 76 * index,
							index
						})}
						ListFooterComponent={() => {
							return <ContentEnd />;
						}}
					/>
				</View>
			</Screen>
		);
	}

	_renderItem({ item }) {
		let { navigation } = this.props;
		return (
			<TouchableOpacity
				style={styles.collectionItem}
				onPress={() =>
					navigation.navigate("文集详情", {
						collection: item
					})
				}
			>
				<CollectionGroup collection={item} navigation={navigation} showCreator customStyle={{ logo: 44, nameSize: 17, mateSize: 13 }} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	collectionItem: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(RelatedCollectionsScreen);
