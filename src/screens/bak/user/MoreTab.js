import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { DivisionLine } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";

class MoreTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { scrollEnabled, user, navigation } = this.props;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} scrollEnabled={scrollEnabled} bounces={false} removeClippedSubviews={true}>
					<View>
						<View style={styles.userMetaWrap}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("个人文集", {
										user
									})
								}
							>
								<View style={{ alignItems: "center" }}>
									<Iconfont name={"collection-two"} size={18} color={"#aaa"} />
									<View style={{ marginTop: 10 }}>
										<Text style={styles.metaCount}>文集 {user.count_collections}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("个人专题", {
										user
									})
								}
							>
								<View style={{ alignItems: "center" }}>
									<Iconfont name={"category-rotate"} size={20} color={"#aaa"} />
									<View style={{ marginTop: 10 }}>
										<Text style={styles.metaCount}>专题 {user.count_categories}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("关注", { user })}>
								<View style={{ alignItems: "center" }}>
									<Iconfont name={"add-person"} size={20} color={"#aaa"} />
									<View style={{ marginTop: 10 }}>
										<Text style={styles.metaCount}>关注 {user.count_followings}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("粉丝", { user })}>
								<View style={{ alignItems: "center" }}>
									<Iconfont name={"friends"} size={22} color={"#aaa"} />
									<View style={{ marginTop: 10 }}>
										<Text style={styles.metaCount}>粉丝 {user.count_followers}</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						<DivisionLine height={16} />
						<View style={styles.userQuantityWrap}>
							<TouchableOpacity onPress={() => null}>
								<TouchableOpacity
									style={styles.userQuantityItem}
									onPress={() =>
										navigation.navigate("喜欢", {
											user
										})
									}
								>
									<View style={styles.userQuantityLeft}>
										<Iconfont name={"like-fill"} size={19} color={"#aaa"} style={{ marginRight: 10 }} />
										<Text
											style={{
												fontSize: 16,
												color: "#666"
											}}
										>
											喜欢
										</Text>
									</View>
									<Text style={{ fontSize: 16, color: "#666" }}>{user.count_likes}</Text>
								</TouchableOpacity>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => null}>
								<TouchableOpacity
									style={styles.userQuantityItem}
									onPress={() =>
										navigation.navigate("关注的专题和文集", {
											user
										})
									}
								>
									<View style={styles.userQuantityLeft}>
										<Iconfont name={"collection"} size={19} color={"#aaa"} style={{ marginRight: 10 }} />
										<Text
											style={{
												fontSize: 16,
												color: "#666"
											}}
										>
											关注的专题/文集
										</Text>
									</View>
								</TouchableOpacity>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => null}>
								<View style={[styles.userQuantityItem, { borderBottomColor: "transparent" }]}>
									<View style={styles.userQuantityLeft}>
										<Iconfont name={"user"} size={19} color={"#aaa"} style={{ marginRight: 10 }} />
										<Text
											style={{
												fontSize: 16,
												color: "#666"
											}}
										>
											社交账号
										</Text>
									</View>
									{
										<View
											style={{
												flexDirection: "row",
												alignItems: "center"
											}}
										>
											{user.email && (
												<TouchableOpacity style={{ marginRight: 15 }} onPress={() => null}>
													<Iconfont name={"email-fill"} size={19} color={Colors.linkColor} />
												</TouchableOpacity>
											)}
										</View>
									}
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	userMetaWrap: {
		height: 100,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	metaCount: {
		fontSize: 15,
		color: Colors.primaryFontColor
	},
	userQuantityWrap: {
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	userQuantityItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightBorderColor
	},
	userQuantityLeft: {
		flexDirection: "row",
		alignItems: "center"
	}
});

export default MoreTab;
