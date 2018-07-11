import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import Header from "./Header";
import HeaderLeft from "./HeaderLeft";
import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";

class SearchTypeHeader extends Component {
	render() {
		let { placeholder, keywords, changeKeywords, handleSearch, navigation, leftComponent = false, backHandler = null } = this.props;
		return (
			<Header
				routeName={true}
				navigation={navigation}
				backHandler={backHandler}
				rightComponent={
					<View style={styles.searchBar}>
						<TextInput
							words={false}
							underlineColorAndroid="transparent"
							selectionColor={Colors.themeColor}
							style={styles.textInput}
							autoFocus={true}
							placeholder={placeholder}
							placeholderText={Colors.tintFontColor}
							onChangeText={changeKeywords}
							value={keywords}
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
		flexDirection: "row",
		alignItems: "center"
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		height: 25,
		lineHeight: 25,
		padding: 0,
		paddingLeft: 10,
		color: Colors.primaryFontColor
	},
	searchButton: {
		paddingHorizontal: 10,
		borderLeftWidth: 1,
		borderLeftColor: Colors.lightBorderColor
	}
});

export default SearchTypeHeader;
