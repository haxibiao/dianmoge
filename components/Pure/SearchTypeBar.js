import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import { Header } from "../Header";

class SearchTypeBar extends Component {
	render() {
		let { placeholder, navigation, type } = this.props;
		return (
			<Header
				routeName={true}
				navigation={navigation}
				rightComponent={
					<TouchableWithoutFeedback onPress={() => navigation.navigate(type)}>
						<View style={styles.searchBar}>
							<Text style={styles.placeholder}>{placeholder}</Text>
							<View style={styles.searchButton}>
								<Iconfont name={"search"} size={22} color={Colors.tintFontColor} />
							</View>
						</View>
					</TouchableWithoutFeedback>
				}
			/>
		);
	}
}

const styles = StyleSheet.create({
	searchBar: {
		flex: 1,
		paddingLeft: 10,
		height: 33,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.lightBorderColor,
		backgroundColor: Colors.lightGray,
		borderRadius: 4
	},
	placeholder: {
		fontSize: 16,
		color: Colors.tintFontColor
	},
	searchButton: {
		paddingHorizontal: 10,
		borderLeftWidth: 1,
		borderLeftColor: Colors.tintBorderColor
	}
});

export default SearchTypeBar;
