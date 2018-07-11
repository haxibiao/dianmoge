import React, { Component } from "react";
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { Header } from "../../../components/Header";
import NoteItem from "../../../components/Article/NoteItem";
import { ContentEnd, LoadingMore, BlankContent, SpinnerLoading, LoadingError } from "../../../components/Pure";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { userArticlesQuery } from "../../../graphql/user.graphql";
import { Mutation, Query } from "react-apollo";

class PaidContentScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchingMore: true
		};
	}

	render() {
		const { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<Query query={userArticlesQuery}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <BlankContent />;
							if (!(data && data.articles)) return <SpinnerLoading />;
							if (data.articles.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.articles}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => <NoteItem post={item} />}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.articles) {
											fetchMore({
												variables: {
													offset: data.articles.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!(fetchMoreResult && fetchMoreResult.articles && fetchMoreResult.articles.length > 0)) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														articles: [...prev.articles, ...fetchMoreResult.articles]
													});
												}
											});
										} else {
											this.setState({
												fetchingMore: false
											});
										}
									}}
									ListFooterComponent={() => {
										return this.state.fetchingMore ? <LoadingMore /> : <ContentEnd />;
									}}
								/>
							);
						}}
					</Query>
				</View>
			</Screen>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default connect(store => ({
	open_articles: store.users.open_articles
}))(PaidContentScreen);
