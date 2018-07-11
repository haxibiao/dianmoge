import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Iconfont } from "../../../utils/Fonts";
import Colors from "../../../constants/Colors";
import Header from "../../../components/Header/Header";
import Screen from "../../Screen";

import { connect } from "react-redux";
import { Query } from "react-apollo";
import actions from "../../../store/actions";

import { queryIncomeHistory } from "../../../graphql/user.graphql";

class AnnualIncomeScreen extends Component {
  render() {
    let { account, navigation } = this.props;
    let { general_income, monthly_income } = account.annual_income;
    return (
      <Screen>
        <View style={styles.container}>
          <Header navigation={navigation} />
          <View style={styles.accumulative}>
            <Text style={{ fontSize: 17, color: Colors.primaryFontColor }}>累计收入</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Iconfont name={"RMB"} size={26} color={Colors.primaryFontColor} />
              <Text style={{ fontSize: 26, color: Colors.darkFontColor }}>{general_income}.00</Text>
            </View>
          </View>
          <View style={styles.withdrawDeposit}>
            <Text style={{ fontSize: 14, color: Colors.tintFontColor }}>
              可提现余额{account.balance}.00，
              <Text style={{ color: Colors.linkColor }} onPress={() => navigation.navigate("提现")}>
                提现
              </Text>
            </Text>
          </View>
          <Query query={queryIncomeHistory}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (!(data && data.user && data.user.incomeHistory)) return null;
              let { incomeHistory } = data.user;
              return <FlatList data={monthly_income} keyExtractor={(item, index) => index.toString()} renderItem={this._renderItem} />;
            }}
          </Query>
        </View>
      </Screen>
    );
  }

  _renderItem = ({ item, index }) => {
    let date = new Date();
    let year = date.getFullYear();
    return (
      <View style={styles.monthlyIncome}>
        <Text style={{ fontSize: 16, color: Colors.primaryFontColor }}>{year + `年${item.month}月收入`}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Iconfont name={"RMB"} size={14} color={Colors.tintFontColor} />
          <Text style={{ fontSize: 16, color: Colors.tintFontColor }}>{item.income}.00</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBorderColor
  },
  accumulative: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  withdrawDeposit: {
    alignItems: "center",
    marginVertical: 15
  },
  monthlyIncome: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default connect(store => ({ account: store.users.account }))(AnnualIncomeScreen);
