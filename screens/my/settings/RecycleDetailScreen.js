import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import { Header, HeaderLeft } from "../../../components/Header";
import { DialogModal } from "../../../components/Modal";
import { LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import HTML from "react-native-render-html";
import Screen from "../../Screen";

import { Query, graphql, compose } from "react-apollo";
import { trashQuery } from "../../../graphql/article.graphql";
import { restoreArticleMutation, deleteArticleMutation, userTrashQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

const { width, height } = Dimensions.get("window");

let css_fix = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    </head>
    <body>
    <style>
    article {
      word-break: break-all!important;
      font-size: 16px;
      line-height: 26px;
    }
    article img {
      max-width: 100%;
      height: auto;
    }
    </style>`;

//必须用onload, 不然计算图片高度不准确
let js_fix = `
  <script>
      window.onload = function() {
        document.title = document.body.offsetHeight;
        window.location.hash = 1;
      }
  </script>
  </body>
  </html>`;

class RecycleDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			promotModalVisible: false
		};
	}

	render() {
		const { article } = this.props.navigation.state.params;
		const { navigation } = this.props;
		let { promotModalVisible } = this.state;
		return (
			<Screen>
				<Header navigation={navigation} routeName />
				<Query query={trashQuery} variables={{ id: article.id }}>
					{({ loading, error, data, refetch }) => {
						if (error) return <LoadingError reload={() => refetch()} />;
						if (loading) return <SpinnerLoading />;
						if (!(data && data.article)) return <BlankContent />;
						let article = data.article;
						return (
							<View style={styles.container}>
								<ScrollView style={[styles.container, { paddingBottom: 20 }]} removeClippedSubviews={true}>
									<View style={{ paddingHorizontal: 15 }}>
										<Text style={styles.articleTitle}>{article.title}</Text>
									</View>
									<View style={{ paddingHorizontal: 15 }}>
										<HTML
											html={article.body}
											imagesMaxWidth={width}
											renderers={{
												img: (htmlAttribs, children, passProps) => {
													return (
														<Image
															key={htmlAttribs.src}
															source={{
																uri: htmlAttribs.src
															}}
															style={{
																marginLeft: -15,
																width, //TODO: will use htmlAttribs.width
																height: 200, //TODO:图片的宽高比例可以由后台api计算好返回，这里先固定, will use htmlAttribs.height
																resizeMode: "cover"
															}}
															{...passProps}
														/>
													);
												}
											}}
										/>
									</View>
								</ScrollView>
								<View style={styles.articleBottom}>
									<TouchableOpacity
										onPress={() => {
											this.handlePromotModalVisible();
										}}
										style={[styles.articleOperation, { borderRightColor: Colors.lightBorderColor, borderRightWidth: 1 }]}
									>
										<Iconfont name={"close"} size={18} color={Colors.tintFontColor} />
										<Text style={styles.operationName}>彻底删除</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											this.props.restoreArticleMutation({
												variables: {
													id: article.id
												},
												refetchQueries: result => [
													{
														query: userTrashQuery
													}
												]
											});
											navigation.goBack();
										}}
										style={styles.articleOperation}
									>
										<Iconfont name={"fresh"} size={18} color={Colors.tintFontColor} />
										<Text style={styles.operationName}>恢复文章</Text>
									</TouchableOpacity>
								</View>
								<DialogModal
									title="彻底删除"
									dialog={`是否彻底删除文章${article.title}，删除后无法找回，该操作不可逆`}
									visible={promotModalVisible}
									handleVisible={this.handlePromotModalVisible}
									confirm={() => {
										this.props.deleteArticleMutation({
											variables: {
												id: article.id
											},
											refetchQueries: result => [
												{
													query: userTrashQuery
												}
											]
										});
										this.handlePromotModalVisible();
										navigation.goBack();
									}}
								/>
							</View>
						);
					}}
				</Query>
			</Screen>
		);
	}

	handlePromotModalVisible = () => {
		this.setState(prevState => ({
			promotModalVisible: !prevState.promotModalVisible
		}));
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	articleTitle: {
		marginVertical: 30,
		fontSize: 20,
		lineHeight: 25,
		fontWeight: "700",
		color: Colors.darkFontColor
	},
	articleBottom: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: Colors.lightBorderColor
	},
	articleOperation: {
		flex: 1,
		height: 45,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	operationName: {
		fontSize: 15,
		color: "#666",
		marginLeft: 10
	}
});

export default compose(
	graphql(deleteArticleMutation, { name: "deleteArticleMutation" }),
	graphql(restoreArticleMutation, { name: "restoreArticleMutation" })
)(RecycleDetailScreen);
