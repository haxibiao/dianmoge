import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
// import FastImage from "react-native-fast-image";
import PropTypes from 'prop-types';

import { Iconfont } from '../../utils/Fonts';

class PlaceholderImage extends Component {
	constructor() {
		super();
		this.state = {
			contentDidLoad: false
		};
	}
	render() {
		const { style, source, resizeMode, ...props } = this.props;
		return (
			<View style={[style, { overflow: 'hidden' }]} {...props}>
				{!this.state.contentDidLoad && <View style={styles.content} />}
				{source && (
					<Image
						source={source}
						resizeMode="cover"
						style={styles.content}
						onLoadStart={this._onLoadStart}
						onProgress={this._onProgress}
						onLoad={this._onLoad}
						onError={this._onError}
						onLoadEnd={this._onLoadEnd}
						onLayout={this._onLayout}
					/>
				)}
			</View>
		);
	}

	_onLoadStart = () => {
		const { onLoadStart } = this.props;
		onLoadStart && onLoadStart();
	};

	_onProgress = () => {
		const { onProgress } = this.props;
		onProgress && onProgress();
	};

	_onLoad = () => {
		this.setState({
			contentDidLoad: true
		});
		const { onLoad } = this.props;
		onLoad && onLoad();
	};

	_onError = () => {
		this.setState({
			contentDidLoad: false
		});
		const { onError } = this.props;
		onError && onError();
	};

	_onLoadEnd = () => {
		const { onLoadEnd } = this.props;
		onLoadEnd && onLoadEnd();
	};

	_onLayout = () => {
		const { onLayout } = this.props;
		onLayout && onLayout();
	};
}

const styles = StyleSheet.create({
	content: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}
});

export default PlaceholderImage;
