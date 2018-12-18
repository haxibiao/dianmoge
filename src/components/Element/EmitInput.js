import React, { Component } from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import EventEmitter from "EventEmitter";

import { Colors } from "../../constants";

const emiter = new EventEmitter();

const ANDROID = Platform.OS == "android";

class EmitInput extends Component {
	constructor(props) {
		super(props);
		this.text = props.defaultValue;
		this.state = {
			changes: 0
		};
	}

	componentWillMount() {
		let { onEmitterReady } = this.props;
		if (onEmitterReady) {
			onEmitterReady(emiter);
		}
	}

	render() {
		let {
			placeholder = "说点什么呗~",
			placeholderText = Colors.lightFontColor,
			selectionColor = Colors.theme1,
			textAlignVertical = "top",
			multiline,
			autoFocus,
			onFocus,
			style = {},
			name,
			words = true
		} = this.props;
		return (
			<TextInput
				words={words}
				placeholder={placeholder}
				placeholderText={placeholderText}
				textAlignVertical={textAlignVertical}
				underlineColorAndroid="transparent"
				selectionColor={selectionColor}
				multiline={multiline}
				autoFocus={autoFocus}
				onFocus={onFocus}
				style={style}
				onChangeText={text => {
					this.text = text;
					emiter.emit(name + "Changed", text);
				}}
				defaultValue={this.text}
				ref={ref => {
					this.input = ref;
				}}
			/>
		);
	}

	// getText() {
	// 	return this.text;
	// }

	changeText(text) {
		this.text = text;
		this.setState({
			changes: this.state.changes++
		});
	}
}

const styles = StyleSheet.create({});

export default EmitInput;
