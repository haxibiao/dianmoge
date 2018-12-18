import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";

import Screen from "../../Screen";
import { Colors } from "../../../constants";
import { Iconfont } from "../../../utils/Fonts";
import { Header } from "../../../components/Header";
import { DivisionLine, ContentEnd, LoadingError } from "../../../components/Pure";
import { Button } from "../../../components/Button";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { Query, Mutation, graphql } from "react-apollo";
import { querySubmitedArticles, submitArticleMutation } from "../../../graphql/user.graphql";

class ContributeManageScreen extends React.Component {
	render() {
		let { article, navigation } = this.props;
		return (
			<Screen>
				<View style={styles.container}>
					<DivisionLine />
					<Query query={querySubmitedArticles}>
						{({ loading, error, data, refetch, fetchMore }) => {
							if (error) return <LoadingError reload={() => refetch()} />;
							if (!(data && data.user && data.user.submitedArticles)) return null;
							let { submitedArticles } = data.user;
							return (
								<FlatList
									data={submitedArticles}
									keyExtractor={(item, index) => index.toString()}
									renderItem={this.renderContributeItem}
									ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
								/>
							);
						}}
					</Query>
					<ContentEnd />
				</View>
			</Screen>
		);
	}

	renderContributeItem = ({ item, index }) => {
		return (
			<View style={styles.categoryItem}>
				<View style={styles.itemInfo}>
					<View>
						<Text style={styles.darkText}>
							向<Text style={styles.title}>《{item.submitedCategory.name}》</Text>
							投稿
						</Text>
					</View>
					<View>
						<Text style={styles.grayText}>{item.submited_status}</Text>
					</View>
				</View>
				<View style={styles.button}>
					<Mutation mutation={submitArticleMutation}>
						{submitArticle => {
							return (
								<Button
									outline
									name={item.submit_status}
									fontSize={12}
									handler={() => {
										submitArticle({
											variables: {
												category_id: item.submitedCategory.id,
												article_id: item.id
											}
										});
									}}
								/>
							);
						}}
					</Mutation>
				</View>
			</View>
		);
	};

	renderBeSelectedItem = ({ item, index }) => {
		return (
			<Mutation mutation={removeContributeMutation}>
				{removeContribute => {
					<View style={styles.categoryItem}>
						<View style={styles.itemInfo}>
							<View>
								<Text style={styles.darkText}>
									被<Text style={styles.title}>《{category.name}》</Text>
									收入
								</Text>
							</View>
							<View>
								<Text style={styles.grayText}>已收入</Text>
							</View>
						</View>
						<View style={styles.button}>
							<Button
								outline
								name={"移除"}
								fontSize={12}
								handler={() => {
									removeContribute({
										variables: {
											category_id: category.id,
											article_id: article.id
										}
									});
								}}
							/>
						</View>
					</View>;
				}}
			</Mutation>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	categoryItem: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center"
	},
	ItemSeparator: {
		height: 1,
		backgroundColor: Colors.tintGray
	},
	title: {
		color: Colors.linkColor,
		marginHorizontal: 5
	},
	darkText: {
		fontSize: 16,
		color: Colors.primaryFontColor
	},
	grayText: {
		fontSize: 13,
		color: Colors.tintFontColor,
		marginTop: 6
	},
	itemInfo: {
		flex: 1,
		marginRight: 20
	},
	button: {
		width: 58,
		height: 27
	}
});

export default ContributeManageScreen;
