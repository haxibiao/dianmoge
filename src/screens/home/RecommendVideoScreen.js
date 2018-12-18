import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Dimensions, BackHandler } from 'react-native';

import { Header, LoadingError, SpinnerLoading } from '../../components';
import FullScreenVideo from '../../components/Media/FullScreenVideo';
import { Colors, Divice, Methods } from '../../constants';

import { Query, Mutation, withApollo } from 'react-apollo';
import { videosQuery } from '../../graphql/article.graphql';

import Screen from '../Screen';

class HotVideoScreen extends Component {
	constructor(props) {
		super(props);
		this.initVideo = props.navigation.getParam('video', {});
		this.activeIndex = 0;
		this.state = {
			finished: true,
			activeIndex: 0,
			width: Divice.width,
			height: Divice.height
		};
	}

	componentDidMount() {
		let { navigation } = this.props;
		this.didFocusSubscription = navigation.addListener('willFocus', payload => {
			this.setState({ activeIndex: this.activeIndex });
		});
		this.willBlurSubscription = navigation.addListener('willBlur', payload => {
			this.activeIndex = this.state.activeIndex;
			this.setState({ activeIndex: null });
		});
	}

	componentWillUnmount() {
		this.didFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}

	render() {
		let { activeIndex, width, height } = this.state;
		let { navigation } = this.props;
		return (
			<Screen header>
				<Query query={videosQuery} variables={{ limit: 6, category_id: this.initVideo.category_id }}>
					{({ loading, error, data, refetch, fetchMore }) => {
						let videos = [this.initVideo]; //拼接初始视频
						if (error) return <LoadingError reload={() => refetch()} />;
						if (data && data.articles) {
							new Array().push.apply(videos, data.articles);
						}
						return (
							<View style={styles.container} onLayout={this._onLayout}>
								<FlatList
									style={[styles.videosWrap, { width: height }]}
									horizontal={true}
									bounces={false}
									pagingEnabled
									removeClippedSubviews
									data={videos}
									extraData={this.state}
									keyExtractor={(item, index) => 'video_' + item.id + '_' + index}
									renderItem={({ item, index }) => (
										<FullScreenVideo
											width={width}
											height={height}
											video={item}
											index={index}
											active={index == activeIndex}
											isLoad={index <= activeIndex + 1 && index >= activeIndex - 1} //只预加载当前视频的后两个
										/>
									)}
									getItemLayout={(data, index) => ({
										length: height,
										offset: height * index,
										index
									})}
									onMomentumScrollEnd={e => this.onMomentumScrollEnd(e, videos, fetchMore, height)}
								/>
							</View>
						);
					}}
				</Query>
				<Header customStyle={styles.header} routeName lightBar />
			</Screen>
		);
	}

	_onLayout = event => {
		// 在小米max3发现的隐藏bug,Divice获取的宽高不一定等于真实渲染的宽高
		let { width, height } = event.nativeEvent.layout;
		console.log('_onLayout', width, height);
		this.setState({
			width,
			height
		});
	};

	// 计算当前item的index
	onMomentumScrollEnd = (e, videos, fetchMore, height) => {
		let activeIndex = Math.floor(e.nativeEvent.contentOffset.x / height);
		this.activeIndex = activeIndex;
		this.setState({ activeIndex });
		let offset = videos.length - 1;
		//只剩下2个才加载数据
		if (activeIndex + 2 > offset) {
			this.onLoadMore(fetchMore, offset);
		}

		//TODO:: 需要更友好的提示本类视频已看完，返回首页
		if (activeIndex >= offset && this.state.finished) {
			this.props.navigation.pop();
		}
	};

	onLoadMore = (fetchMore, offset) => {
		fetchMore({
			variables: {
				offset
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult && fetchMoreResult.articles && fetchMoreResult.articles instanceof Array && fetchMoreResult.articles.length > 0) {
					console.log('fetchMoreResult.articles:', fetchMoreResult.articles);
					return Object.assign({}, prev, {
						articles: [...prev.articles, ...fetchMoreResult.articles]
					});
				} else {
					this.setState({
						finished: true
					});

					return prev;
				}
			}
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000'
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	videosWrap: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		// width: height,
		// height,
		position: 'relative',
		transform: [{ rotateZ: '90deg' }],
		backgroundColor: '#000',
		padding: 0
	}
});

export default HotVideoScreen;
