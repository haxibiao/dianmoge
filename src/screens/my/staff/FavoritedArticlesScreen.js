import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import Screen from "../../Screen";

import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import { OperationModal } from "../../../components/Modal";
import NoteItem from "../../../components/Article/NoteItem";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { favoritedArticlesQuery } from "../../../graphql/user.graphql";
import { favoriteArticleMutation } from "../../../graphql/article.graphql";
import { Mutation, Query } from "react-apollo";

const { width, height } = Dimensions.get("window");

class FavoritedArticlesScreen extends Component {
	constructor(props) {
		super(props);
		this.handleModal = this.handleModal.bind(this);
		this.article = {};
		this.state = {
			modalVisible: false,
			fetchingMore: true
		};
	}

	render() {
		let { modalVisible } = this.state;
		let { navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<Query query={favoritedArticlesQuery} fetchPolicy="network-only">
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.articles)) return <SpinnerLoading />;
							if (data.user.articles.length < 1) return <BlankContent />;
							return (
								<FlatList
									data={data.user.articles}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => (
										<NoteItem
											post={item}
											longPress={() => {
												this.article = item;
												this.handleModal();
											}}
										/>
									)}
									onEndReachedThreshold={0.3}
									onEndReached={() => {
										if (data.user.articles) {
											fetchMore({
												variables: {
													offset: data.user.articles.length
												},
												updateQuery: (prev, { fetchMoreResult }) => {
													if (
														!(
															fetchMoreResult &&
															fetchMoreResult.user.articles &&
															fetchMoreResult.user.articles.length > 0
														)
													) {
														this.setState({
															fetchingMore: false
														});
														return prev;
													}
													return Object.assign({}, prev, {
														user: Object.assign({}, prev.user, {
															articles: [...prev.user.articles, ...fetchMoreResult.user.articles]
														})
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
					<Mutation mutation={favoriteArticleMutation}>
						{favoriteArticle => {
							return (
								<OperationModal
									operation={["取消收藏"]}
									visible={modalVisible}
									handleVisible={this.handleModal}
									handleOperation={index => {
										favoriteArticle({
											variables: {
												article_id: this.article.id
											},
											refetchQueries: result => [{ query: favoritedArticlesQuery }]
										});
										this.handleModal();
									}}
								/>
							);
						}}
					</Mutation>
				</View>
			</Screen>
		);
	}

	handleModal() {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible
		}));
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	}
});

export default FavoritedArticlesScreen;
