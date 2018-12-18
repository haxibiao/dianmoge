import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { SearchHeader } from "../../components/Header";
import { RefreshControl, LoadingError, SpinnerLoading } from "../../components/Pure";
import Screen from "../Screen";
import SearchResult from "./SearchResult";

import { connect } from "react-redux";
import { graphql, Query, Mutation, compose, withApollo } from "react-apollo";
import { hotSearchAndLogsQuery, deleteQueryLogMutation } from "../../graphql/user.graphql";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeHistory = this.closeHistory.bind(this);
    this.deleteHistories = this.deleteHistories.bind(this);
    this.hotsearchs = 0;
    this.keywords = "";
    this.state = {
      switchResult: true,
      order: "LATEST",
      fetchMore: true
    };
  }

  render() {
    let { switchResult } = this.state;
    let { navigation, hot_search, deleteQuery, login } = this.props;
    // 未登录没有搜索记录，所以要排除该条件检测
    return (
      <Screen header>
        <View style={styles.container}>
          <SearchHeader
            onChangeText={this.onChangeText}
            handleSearch={() => this.handleSearch(this.keywords)}
            headerRef={ref => (this.inputText = ref)}
            navigation={navigation}
          />
          {switchResult ? (
            <Query query={hotSearchAndLogsQuery}>
              {({ loading, error, data, fetchMore, refetch }) => {
                let histories = [];
                if (error) return <LoadingError reload={() => refetch()} />;
                if (login) {
                  if (!(data && data.queries && data.queryLogs)) return <SpinnerLoading />;
                  histories = data.queryLogs;
                } else {
                  if (!(data && data.queries)) return <SpinnerLoading />;
                }
                let hotsearch = data.queries;
                this.hotsearchs += hotsearch.length;
                return (
                  <ScrollView style={styles.container} bounces={false}>
                    <View style={{ paddingHorizontal: 15 }}>
                      <TouchableOpacity style={styles.searchItem} onPress={() => navigation.navigate("全部专题")}>
                        <View style={styles.verticalCenter}>
                          <Iconfont name={"category-rotate"} size={19} color={Colors.themeColor} style={{ marginRight: 8 }} />
                          <Text style={{ fontSize: 16, color: "#666" }}>热门专题</Text>
                        </View>
                        <Iconfont name={"right"} size={20} color={Colors.primaryFontColor} style={{ marginRight: 8 }} />
                      </TouchableOpacity>
                      {hotsearch.length > 0 && (
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
                            <RefreshControl
                              size={16}
                              refresh={() => {
                                fetchMore({
                                  variables: {
                                    offset: this.hotsearchs
                                  },
                                  updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!(fetchMoreResult && fetchMoreResult.queries && fetchMoreResult.queries.length > 0)) {
                                      return prev;
                                    }
                                    return Object.assign({}, prev, {
                                      queries: [...fetchMoreResult.queries]
                                    });
                                  }
                                });
                              }}
                            />
                          </View>
                          {this._renderHotKeywords(hotsearch)}
                        </View>
                      )}
                      {histories.length > 0 && (
                        <View style={styles.historyWrap}>
                          {this._renderHistories(histories)}
                          <TouchableOpacity
                            onPress={() =>
                              deleteQuery({
                                update: (cache, { data: { deleteQueryLog } }) => {
                                  let { queries } = cache.readQuery({
                                    query: hotSearchAndLogsQuery
                                  });
                                  cache.writeQuery({
                                    query: hotSearchAndLogsQuery,
                                    data: { queries, queryLogs: [] }
                                  });
                                }
                              })
                            }
                          >
                            <View style={[styles.searchItem, { justifyContent: "center" }]}>
                              <Text style={{ fontSize: 16, color: Colors.tintFontColor }}>清除搜索记录</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </ScrollView>
                );
              }}
            </Query>
          ) : (
            <SearchResult keywords={this.keywords} navigation={navigation} />
          )}
        </View>
      </Screen>
    );
  }

  // 热搜关键字
  _renderHotKeywords = data => {
    let { navigation } = this.props;
    let searchList = data.map((elem, index) => {
      return (
        <TouchableOpacity key={elem.id} style={styles.hotSearchItemWrap} onPress={() => this.handleSearch(elem.query)}>
          {elem.query && <Text style={styles.hotSearchItem}>{elem.query}</Text>}
        </TouchableOpacity>
      );
    });
    return <View style={styles.hotSearchList}>{searchList}</View>;
  };

  // 搜索记录
  _renderHistories = data => {
    let { navigation, deleteQuery } = this.props;
    let histories = data.map((elem, index) => {
      return (
        <TouchableOpacity key={elem.id} onPress={() => this.handleSearch(elem.query)}>
          <View style={styles.searchItem}>
            <View style={styles.verticalCenter}>
              <Iconfont name={"time"} size={21} color={Colors.lightFontColor} style={{ marginRight: 20 }} />
              {elem.query && <Text style={{ fontSize: 16, color: "#666" }}>{elem.query}</Text>}
            </View>
            <TouchableOpacity
              onPress={() =>
                deleteQuery({
                  variables: {
                    id: elem.id
                  },
                  update: (cache, { data: { deleteQueryLog } }) => {
                    let { queryLogs, queries } = cache.readQuery({
                      query: hotSearchAndLogsQuery
                    });
                    queryLogs = queryLogs.filter((query, index) => {
                      return query.id !== elem.id;
                    });
                    cache.writeQuery({
                      query: hotSearchAndLogsQuery,
                      data: { queries, queryLogs }
                    });
                  }
                })
              }
            >
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

  handleSearch = keywords => {
    this.keywords = keywords;
    if (this.keywords.length > 0) {
      this.setState({ switchResult: false });
    }
  };

  onChangeText = value => {
    this.keywords = value;
    if (this.keywords.length < 1) {
      this.setState({ switchResult: true });
    }
  };

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

  deleteHistories(id) {
    this.setState({ histories: [] });
    variables: {
      id;
    }
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
    marginTop: 5
  }
});

export default compose(
  withApollo,
  connect(store => ({
    hot_search: store.search.hot_search,
    histories: store.search.histories,
    login: store.users.login
  })),
  graphql(deleteQueryLogMutation, { name: "deleteQuery" })
)(HomeScreen);
