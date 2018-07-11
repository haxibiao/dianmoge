import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import ContentEnd from "../../../components/Pure/ContentEnd";
import LoadingMore from "../../../components/Pure/LoadingMore";
import TransactionRecordItem from "./TransactionRecordItem";
import Screen from "../../Screen";

import { connect } from "react-redux";
import actions from "../../../store/actions";

class TransactionRecordScreen extends Component {
	render() {
		let { account, navigation } = this.props;
		let { transaction_record } = account;
		return (
			<Screen>
				<View style={styles.container}>
					<Header navigation={navigation} />
					<FlatList
						style={{ paddingHorizontal: 15 }}
						data={transaction_record}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderItem}
						ListFooterComponent={() => {
							return <ContentEnd />;
						}}
					/>
				</View>
			</Screen>
		);
	}

	_renderItem = ({ item, index }) => {
		switch (item.type) {
			case "recharge":
				return <TransactionRecordItem type={"充值"} money={item.money} time={item.time_ago} status={item.status} />;
				break;
			case "receive_reward":
				return (
					<TransactionRecordItem type={"收到赞赏"} money={item.money} time={item.time_ago} status={item.status}>
						<Text style={styles.recordText}>
							<Text style={styles.linkText}>{item.user.name + " "}</Text>
							向你的文章
							<Text style={styles.linkText}>{" 《" + item.article.title + "》 "}</Text>
							送了{item.money}颗糖
						</Text>
					</TransactionRecordItem>
				);
				break;
			case "reward":
				return (
					<TransactionRecordItem type={"赞赏"} money={item.money} time={item.time_ago} status={item.status}>
						<Text style={styles.recordText}>
							你向
							<Text style={styles.linkText}>{item.user.name + " "}</Text>
							的文章
							<Text style={styles.linkText}>{" 《" + item.article.title + "》 "}</Text>
							送了{item.money}颗糖
						</Text>
					</TransactionRecordItem>
				);
				break;
			case "receive_award":
				return (
					<TransactionRecordItem type={"奖励"} money={item.money} time={item.time_ago} status={item.status}>
						<Text style={styles.recordText}>
							<Text style={styles.linkText}>{item.user.name + " "}</Text>
							送了你{item.money}颗糖
						</Text>
					</TransactionRecordItem>
				);
				break;
			case "award":
				return (
					<TransactionRecordItem type={"收到奖励"} money={item.money} time={item.time_ago} status={item.status}>
						<Text style={styles.recordText}>
							你送了
							<Text style={styles.linkText}>{" " + item.user.name + " "}</Text>
							{item.money}颗糖
						</Text>
					</TransactionRecordItem>
				);
				break;
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.skinColor
	},
	recordText: {
		fontSize: 15,
		lineHeight: 23,
		color: Colors.primaryFontColor
	},
	linkText: {
		color: Colors.linkColor,
		lineHeight: 23
	}
});

export default connect(store => ({ account: store.users.account }))(TransactionRecordScreen);
