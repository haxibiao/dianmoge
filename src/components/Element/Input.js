import React, { Component } from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";

import { Colors } from "../../constants";

class Input extends Component {
	render() {
		let {
			inputRef,
			onChangeText,
			onFocus,
			defaultValue,
			value,
			style = {},
			placeholder = "说点什么呗~",
			placeholderText = Colors.font4,
			selectionColor = Colors.theme1,
			textAlignVertical = "top",
			keyboardType = "default",
			multiline,
			maxLength,
			autoFocus,
			words = true
		} = this.props;
		return (
			<TextInput
				words={words}
				placeholder={placeholder}
				placeholderText={placeholderText}
				textAlignVertical={textAlignVertical}
				keyboardType={keyboardType}
				underlineColorAndroid="transparent"
				selectionColor={selectionColor}
				multiline={multiline}
				maxLength={maxLength}
				autoFocus={autoFocus}
				onFocus={onFocus}
				style={style}
				onChangeText={onChangeText}
				defaultValue={defaultValue}
				value={value}
				ref={inputRef}
			/>
		);
	}
}

const styles = StyleSheet.create({});

export default Input;
