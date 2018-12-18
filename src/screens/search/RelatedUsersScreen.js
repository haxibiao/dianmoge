import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../constants";
import Header from "../../components/Header/Header";
import UserMetaGroup from "../../components/MediaGroup/UserMetaGroup";
import ContentEnd from "../../components/Pure/ContentEnd";
import LoadingMore from "../../components/Pure/LoadingMore";
import Screen from "../Screen";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import actions from "../../store/actions";

class RelatedUsersScreen extends Component {
	render() {
		let { search_detail, navigation } = this.props;
		let { users } = navigation.state.params;
		return (
			<Screen>
				<View style={styles.container}>
					<FlatList
						style={{ paddingHorizontal: 15 }}
						data={users}
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
			<View style={styles.userItem}>
				<UserMetaGroup user={item} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	userItem: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	}
});

export default connect(store => ({
	search_detail: store.search.search_detail
}))(RelatedUsersScreen);
