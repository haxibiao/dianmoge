import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Iconfont } from "../../utils/Fonts";

class SmartImage extends Component {
	constructor() {
		super();
		this.state = {
			width: null,
			height: null
		};
	}

	componentWillMount() {
		Image.getSize(this.props.uri, (width, height) => {
			if (this.props.width && !this.props.height) {
				this.setState({
					width: this.props.width,
					height: height * (this.props.width / width)
				});
			} else if (!this.props.width && this.props.height) {
				this.setState({
					width: width * (this.props.height / height),
					height: this.props.height
				});
			} else if (this.props.maximum) {
				if (width >= height) {
					this.setState({
						width: this.props.maximum,
						height: height * (this.props.maximum / width)
					});
				} else {
					this.setState({
						width: width * (this.props.maximum / height),
						height: this.props.maximum
					});
				}
			} else {
				this.setState({ width: width, height: height });
			}
		});
	}

	render() {
		const { uri, style, resizeMode = "cover" } = this.props;
		let { width, height } = this.state;
		return (
			<View style={style ? style : { width, height, backgroundColor: "#f0f0f0" }}>
				<Image source={{ uri }} style={[{ width, height }, style && style]} resizeMode={resizeMode} />
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default SmartImage;
