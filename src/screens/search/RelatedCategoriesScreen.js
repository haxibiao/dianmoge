import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../constants";
import { Header } from "../../components/Header";
import { CategoryGroup } from "../../components/MediaGroup";
import { ContentEnd, LoadingMore } from "../../components/Pure";
import Screen from "../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../store/actions";

class RelatedCategoriesScreen extends Component {
	render() {
		let { search_detail, navigation } = this.props;
		let { categories } = navigation.state.params;
		return (
			<Screen>
				<View style={styles.container}>
					<FlatList
						style={{ paddingHorizontal: 15 }}
						data={categories}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderItem.bind(this)}
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
			<View style={styles.categoryItem}>
				<CategoryGroup category={item} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	categoryItem: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(RelatedCategoriesScreen);
