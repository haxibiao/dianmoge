import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import { RefreshControl, LoadingError } from "../../components/Pure";
import AuthorCard from "./AuthorCard";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query } from "react-apollo";
import { recommendAuthors } from "../../graphql/user.graphql";

class ScrollCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      page: 1
    };
  }

  render() {
    let { navigation } = this.props;
    let { page, refreshing } = this.state;
    return (
      <Query query={recommendAuthors}>
        {({ loading, error, data, refetch, fetchMore }) => {
          if (error) return <LoadingError reload={() => refetch()} />;
          if (!(data && data.users)) return null;
          return (
            <View style={styles.recommendAuthor}>
              {/*
                <View style={styles.title}>
                  <View>
                    <Text style={styles.titleText}>推荐作者</Text>
                  </View>
                  <RefreshControl
                    refreshing={refreshing}
                    refresh={() => {
                      this.setState({
                        refreshing: true
                      });
                      if (data.users) {
                        fetchMore({
                          variables: {
                            offset: page * 10
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            this.setState(prevState => ({
                              refreshing: false,
                              page: ++prevState.page
                            }));
                            if (!(fetchMoreResult && fetchMoreResult.users && fetchMoreResult.users.length > 0)) {
                              return prev;
                            }
                            return fetchMoreResult;
                          }
                        });
                      }
                    }}
                  />
                </View>
                **/}
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <FlatList
                  data={data.users}
                  horizontal={true}
                  keyExtractor={this._keyExtractor}
                  getItemLayout={(data, index) => ({
                    length: 178.5,
                    offset: 178.5 * index,
                    index
                  })}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("用户详情", { user: item })}>
                      <AuthorCard user={item} />
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }

  _keyExtractor = (item, index) => (item.key ? item.key : index.toString());
}

const styles = StyleSheet.create({
  recommendAuthor: {
    paddingVertical: 15,
    paddingLeft: 9,
    backgroundColor: Colors.tintGray
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 16,
    marginLeft: 3,
    paddingLeft: 5,
    paddingRight: 20,
    paddingBottom: 15,
    borderLeftWidth: 2,
    borderColor: Colors.themeColor
  },
  titleText: {
    fontSize: 12,
    marginTop: -2,
    color: Colors.tintFontColor
  }
});

export default ScrollCard;
