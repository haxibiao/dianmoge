import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import Header from "./Header";
import HeaderLeft from "./HeaderLeft";
import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";

class SearchTypeHeader extends Component {
	render() {
		let { placeholder, keywords, changeKeywords, handleSearch, backHandler = null } = this.props;
		return (
			<Header
				backHandler={backHandler}
				centerComponent={
					<View style={styles.searchBar}>
						<TextInput
							words={false}
							autoFocus
							underlineColorAndroid="transparent"
							textAlignVertical="top"
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							placeholder={placeholder}
							placeholderText={Colors.tintFontColor}
							onChangeText={changeKeywords}
							defaultValue={keywords}
						/>
						<TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
							<Iconfont name={"search"} size={22} color={Colors.tintFontColor} />
						</TouchableOpacity>
					</View>
				}
			/>
		);
	}
}

const styles = StyleSheet.create({
	searchBar: {
		flex: 1,
		height: 32,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 40
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		height: 22,
		lineHeight: 22,
		paddingVertical: 0,
		paddingHorizontal: 10,
		color: Colors.primaryFontColor
	},
	searchButton: {
		paddingHorizontal: 10,
		borderLeftWidth: 1,
		borderLeftColor: Colors.lightBorderColor
	}
});

export default SearchTypeHeader;
