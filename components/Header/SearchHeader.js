import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationActions } from 'react-navigation';

import Header from "./Header";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";

class SearchHeader extends Component {
  render() {
  	let {navigation,keywords,handleSearch=()=>null,changeKeywords=()=>null,placeholder="搜索文章、专题、用户、文集"} = this.props;
    return (
     	<Header
     	  routeName={true}
     	  navigation={navigation}
     	  rightComponent={
     	    <View style={styles.searchWrap}>
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
     	      <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
     	        <Iconfont
     	          name={"search"}
     	          size={22}
     	          color={Colors.tintFontColor}
     	          style={{ marginRight: 8 }}
     	        />
     	      </TouchableOpacity>
     	    </View>
     	  }
     	/>
    );
  }


}

const styles = StyleSheet.create({
	searchWrap: {
	  flex: 1,
	  height: 36,
	  borderRadius: 18,
	  backgroundColor: Colors.lightGray,
	  flexDirection: "row",
	  alignItems: "center",
	  paddingHorizontal: 12
	},
	textInput: {
	  flex: 1,
	  fontSize: 16,
	  height: 22,
	  lineHeight: 22,
	  padding: 0,
	  color: Colors.primaryFontColor
	},
	searchIcon: {
	  paddingLeft: 10,
	  borderLeftWidth: 1,
	  borderLeftColor: Colors.lightBorderColor
	},
});


export default SearchHeader;