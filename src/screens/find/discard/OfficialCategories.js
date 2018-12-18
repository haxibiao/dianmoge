import React from "react";

import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import OfficialColumn from "../../components/Category/OfficialColumn";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods } from "../../constants";
import { official_categories } from "../../constants/AppData";

class OfficialCategories extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		const { navigation } = this.props;

		return (
			<View style={styles.officialWrap}>
				<View style={styles.officialList}>
					{official_categories.slice(0, 5).map((elem, index) => {
						return this._renderColumnItem({
							item: elem,
							index
						});
					})}
				</View>
				<View style={styles.officialList}>
					{official_categories.slice(5, 10).map((elem, index) => {
						return this._renderColumnItem({
							item: elem,
							index
						});
					})}
				</View>
				<View style={styles.officialList}>
					{official_categories.slice(10, 15).map((elem, index) => {
						return this._renderColumnItem({
							item: elem,
							index
						});
					})}
				</View>
			</View>
		);
	}

	_renderColumnItem = ({ item, index }) => {
		return (
			<TouchableWithoutFeedback key={index} onPress={() => this.onPress(item)}>
				<View style={{ flex: 1 }}>
					<OfficialColumn data={item} />
				</View>
			</TouchableWithoutFeedback>
		);
	};

	onPress(item) {
		const { navigation } = this.props;
		let params = { category: item };
		let routeName = item.type;
		let key = routeName + item.id;
		navigation.dispatch(Methods.navigationAction({ routeName, params, key }));
	}
}

const styles = StyleSheet.create({
	officialWrap: {
		backgroundColor: Colors.skinColor,
		paddingBottom: 15,
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	officialList: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 20
	}
});

export default OfficialCategories;
