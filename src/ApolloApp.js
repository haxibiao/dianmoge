import React, { Component } from 'react';
import { Platform } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import Config from './constants/Config';
import { connect } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { recommendAuthors } from './graphql/user.graphql';
import { unreadsQuery } from './graphql/notification.graphql';
import { chatsQuery } from './graphql/chat.graphql';
import { recommendArticlesQuery, topArticleWithImagesQuery, recommandDynamicQuery } from './graphql/article.graphql';

import { DownloadProgress, LoadingSpinner } from './components/Modal';

import DeviceInfo from 'react-native-device-info';

class ApolloApp extends Component {
	toast: DownloadProgress;
	_makeClient(user) {
		let { token } = user;

		let deviceHeaders = {};
		deviceHeaders.os = Platform.OS;
		const isEmulator = DeviceInfo.isEmulator();
		if (!isEmulator) {
			deviceHeaders.brand = DeviceInfo.getBrand();
			deviceHeaders.build = DeviceInfo.getBuildNumber();
			deviceHeaders.deviceCountry = DeviceInfo.getDeviceCountry(); // "US"
			deviceHeaders.referrer = DeviceInfo.getInstallReferrer(); //能分析出来哪个商店安装的
			deviceHeaders.version = DeviceInfo.getReadableVersion();
			deviceHeaders.systemVersion = DeviceInfo.getSystemVersion();
			deviceHeaders.uniqueId = DeviceInfo.getUniqueID();
		}

		this.client = new ApolloClient({
			uri: Config.ServerRoot + '/graphql',
			request: async operation => {
				operation.setContext({
					headers: {
						token,
						...deviceHeaders
					}
				});
			},
			cache: new InMemoryCache()
		});
	}

	componentWillMount() {
		let { user = {} } = this.props;
		this.timer = setTimeout(() => {
			this.props.onReady();
		}, 5000);
		this._makeClient(user);
		let { query } = this.client;
		let promises = [query({ query: recommendArticlesQuery }), query({ query: topArticleWithImagesQuery }), query({ query: recommendAuthors })];
		if (user.token) {
			promises.concat([
				query({ query: unreadsQuery }),
				query({ query: chatsQuery }),
				query({ query: recommandDynamicQuery, variables: { user_id: user.id } })
			]);
		}
		Promise.all(promises)
			.then(fulfilled => {
				this.promiseTimer = setTimeout(() => {
					this.props.onReady();
				}, 1000);
			})
			.catch(rejected => {
				return null;
			});
	}

	componentDidMount() {
		global.LoadingProgress = this.loadProgress;
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.user !== this.props.user) {
			this._makeClient(nextProps.user);
		}
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
		this.promiseTimer && clearTimeout(this.promiseTimer);
	}

	render() {
		return (
			<ApolloProvider client={this.client}>
				<RootNavigation />
				<DownloadProgress ref={ref => (this.loadProgress = ref)} />
				<LoadingSpinner />
			</ApolloProvider>
		);
	}
}

export default connect(store => {
	return { user: store.users.user };
})(ApolloApp);
