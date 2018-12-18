'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';

import { Colors, Methods, Divice } from '../../constants';
import { Query, withApollo } from 'react-apollo';
import { topArticleWithImagesQuery } from '../../graphql/article.graphql';

class Carousel extends Component {
	render() {
		return (
			<View style={styles.swiperContainer}>
				<Query query={topArticleWithImagesQuery}>
					{({ loading, error, data }) => {
						if (!(data && data.articles)) return null;
						return (
							<Swiper
								autoplay={true}
								autoplayTimeout={5}
								paginationStyle={styles.paginationStyle}
								dotStyle={styles.dotStyle}
								activeDotStyle={styles.dotStyle}
								activeDotColor="#fff"
							>
								{this._renderSwiperImage(data.articles)}
							</Swiper>
						);
					}}
				</Query>
			</View>
		);
	}

	_renderSwiperImage = poster => {
		let { navigation } = this.props;
		var posterList = [];
		poster.forEach((article, index) => {
			posterList.push(
				<TouchableWithoutFeedback key={index} onPress={() => Methods.goContentScreen(navigation, article)}>
					<Image style={styles.posterImage} source={{ uri: article.top_image }} />
				</TouchableWithoutFeedback>
			);
		});
		return posterList;
	};
}

const styles = StyleSheet.create({
	swiperContainer: {
		height: Divice.wp('44%')
	},
	paginationStyle: {
		bottom: 6
	},
	dotStyle: {
		width: 6,
		height: 6
	},
	posterImage: {
		marginHorizontal: 10,
		width: Divice.wp('100%') - 20,
		height: Divice.wp('44%'),
		resizeMode: 'cover',
		borderRadius: 6
	}
});

export default withApollo(Carousel);
