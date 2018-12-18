import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, FlatList } from "react-native";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { SpinnerLoading, LoadingError } from "../../components/Pure";
import { Button } from "../../components/Button";
import AuthorItem from "./AuthorItem";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query } from "react-apollo";
import { recommendAuthors } from "../../graphql/user.graphql";

class RecommendAuthors extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.refreshing = false;
  }

  render() {
    let { navigation } = this.props;
    return (
      <Query query={recommendAuthors}>
        {({ loading, error, data, refetch, fetchMore }) => {
          if (error) return <LoadingError reload={() => refetch()} />;
          if (!(data && data.users)) return <SpinnerLoading />;
          let users = data.users;
          return (
            <View>
              <View style={styles.recommendTitle}>
                <View style={styles.line} />
                <Text style={styles.tintText}>推荐作者</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.userList}>
                {users.slice(0, 3).map((elem, index) => {
                  return <AuthorItem user={elem} key={index} navigation={navigation} />;
                })}
              </View>
              <View style={styles.userList}>
                {users.slice(3, 6).map((elem, index) => {
                  return <AuthorItem user={elem} key={index} navigation={navigation} />;
                })}
              </View>
              <View style={styles.fresh}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (this.refreshing) return;
                    this.refreshing = true;
                    if (data.users) {
                      fetchMore({
                        variables: {
                          offset: this.page * 6
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.refreshing = false;
                          ++this.page;
                          if (!(fetchMoreResult && fetchMoreResult.users && fetchMoreResult.users.length > 0)) {
                            return prev;
                          }
                          return fetchMoreResult;
                        }
                      });
                    }
                  }}
                >
                  <View style={styles.freshButton}>
                    <Text style={styles.freshText}>换一批</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          );
        }}
      </Query>
    );
  }

  _keyExtractor = (item, index) => (item.key ? item.key : index.toString());
}

const styles = StyleSheet.create({
  recommendTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  line: {
    width: 60,
    height: 1,
    backgroundColor: Colors.tintGray
  },
  userList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30
  },
  fresh: {
    marginTop: 10,
    alignItems: "center"
  },
  freshButton: {
    width: 100,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: Colors.lightBorderColor,
    justifyContent: "center",
    alignItems: "center"
  },
  tintText: {
    fontSize: 12,
    marginHorizontal: 5,
    color: Colors.tintFontColor
  },
  freshText: {
    fontSize: 15,
    color: Colors.themeColor
  }
});

export default RecommendAuthors;
