import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { SearchHeader } from "../../components/Header";
import { RefreshControl } from "../../components/Pure";
import Screen from "../Screen";

import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";

const QUERY = gql`
  query hot_search($offset: Int!, $limit: Int!) {
    hotKeywords(offset: $offset, limit: $limit) {
      id
      keywords
    }
  }
`;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.changeKeywords = this.changeKeywords.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeHistory = this.closeHistory.bind(this);
    this.clearHistories = this.clearHistories.bind(this);
    this.state = {
      keywords: "",
      histories: this.props.histories
    };
  }

  render() {
    let { keywords, histories } = this.state;
    let { navigation, hot_search } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <SearchHeader changeKeywords={this.changeKeywords} keywords={keywords} navigation={navigation} handleSearch={this.handleSearch} />
          <ScrollView style={styles.container} bounces={false} removeClippedSubviews={true}>
            <View style={{ paddingHorizontal: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("推荐专题")}>
                <View style={styles.searchItem}>
                  <View style={styles.verticalCenter}>
                    <Iconfont name={"category-rotate"} size={19} color={Colors.themeColor} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 16, color: "#666" }}>热门专题</Text>
                  </View>
                  <Iconfont name={"right"} size={20} color={Colors.primaryFontColor} style={{ marginRight: 8 }} />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.lightBorderColor
                }}
              >
                <View style={[styles.searchItem, { borderBottomColor: "transparent" }]}>
                  <View style={styles.verticalCenter}>
                    <Iconfont name={"hot"} size={21} color={Colors.weiboColor} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 16, color: "#666" }}>热门搜索</Text>
                  </View>
                  <RefreshControl size={16} refresh={() => null} />
                </View>
                {hot_search && this._renderHotKeywords(hot_search)}
              </View>
              {histories.length > 0 && (
                <View style={styles.historyWrap}>
                  {this._renderHistories(histories)}
                  <TouchableOpacity onPress={this.clearHistories}>
                    <View style={[styles.searchItem, { justifyContent: "center" }]}>
                      <Text style={{ fontSize: 16, color: Colors.tintFontColor }}>清除搜索记录</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Screen>
    );
  }

  _renderHotKeywords = data => {
    let { navigation } = this.props;
    let searchList = data.map((elem, index) => {
      return (
        <TouchableOpacity key={elem.id} style={styles.hotSearchItemWrap} onPress={() => this.handleSearch(elem.keywords)}>
          <Text style={styles.hotSearchItem}>{elem.keywords}</Text>
        </TouchableOpacity>
      );
    });
    return <View style={styles.hotSearchList}>{searchList}</View>;
  };

  _renderHistories = data => {
    let { navigation } = this.props;
    let histories = data.map((elem, index) => {
      return (
        <TouchableOpacity key={elem.id} onPress={() => this.handleSearch(elem.keywords)}>
          <View style={styles.searchItem}>
            <View style={styles.verticalCenter}>
              <Iconfont name={"time-outline"} size={21} color={Colors.lightFontColor} style={{ marginRight: 20 }} />
              <Text style={{ fontSize: 16, color: "#666" }}>{elem.keywords}</Text>
            </View>
            <TouchableOpacity onPress={() => this.closeHistory(elem.id)}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Iconfont name={"close"} size={20} color={Colors.lightFontColor} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
    return <View>{histories}</View>;
  };

  changeKeywords(keywords) {
    this.setState({ keywords });
  }

  handleSearch(keywords) {
    let { navigation } = this.props;
    let navigateAction = NavigationActions.replace({
      key: navigation.state.key,
      routeName: "搜索详情",
      params: { keywords }
    });
    navigation.dispatch(navigateAction);
  }

  closeHistory(id) {
    this.setState(prevState => {
      if (prevState.histories.length == 1) {
        return { histories: "" };
      }
      return {
        histories: prevState.histories.filter((elem, index) => elem.id != id)
      };
    });
  }

  clearHistories() {
    this.setState({ histories: [] });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  searchItem: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  verticalCenter: {
    flexDirection: "row",
    alignItems: "center"
  },
  hotSearchList: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 125,
    overflow: "hidden"
  },
  hotSearchItemWrap: {
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.tintBorderColor,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10
  },
  hotSearchItem: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.tintFontColor
  },
  historyWrap: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.tintBorderColor
  }
});

export default connect(store => ({
  hot_search: store.search.hot_search,
  histories: store.search.histories
}))(HomeScreen);
