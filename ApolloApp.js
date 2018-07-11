import React, { Component } from "react";
import RootNavigation from "./navigation/RootNavigation";
import Config from "./constants/Config";
import { connect } from "react-redux";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import { recommendAuthors } from "./graphql/user.graphql";
import { unreadsQuery } from "./graphql/notification.graphql";
import { chatsQuery } from "./graphql/chat.graphql";
import { recommendArticlesQuery, topArticleWithImagesQuery, hotArticlesQuery } from "./graphql/article.graphql";
import { topCategoriesQuery } from "./graphql/category.graphql";
import { userFollowedCategoriesQuery } from "./graphql/user.graphql";

class ApolloApp extends Component {
	_makeClient(user) {
		let { token } = user;
		this.client = new ApolloClient({
			uri: Config.ServerRoot + "/graphql",
			request: async operation => {
				operation.setContext({
					headers: {
						token
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
		}, 6000);
		this._makeClient(user);
		let { query } = this.client;
		let promises = [
			query({ query: hotArticlesQuery }),
			query({ query: topArticleWithImagesQuery }),
			query({ query: recommendAuthors }),
			query({ query: topCategoriesQuery })
		];
		if (user.token) {
			promises.concat([
				query({ query: unreadsQuery }),
				query({ query: chatsQuery }),
				query({ query: userFollowedCategoriesQuery, variables: { user_id: user.id } })
			]);
		}
		Promise.all(promises)
			.then(fulfilled => {
				this.props.onReady();
			})
			.catch(rejected => {
				return null;
			});
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.user !== this.props.user) {
			this._makeClient(nextProps.user);
		}
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		return (
			<ApolloProvider client={this.client}>
				<RootNavigation />
			</ApolloProvider>
		);
	}
}

export default connect(store => {
	return { user: store.users.user };
})(ApolloApp);
