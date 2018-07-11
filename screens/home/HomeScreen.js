import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, RefreshControl } from "react-native";

import Screen from "../Screen";
import Colors from "../../constants/Colors";
import { Header, RecommendFollow } from "../../components/Header";
import { SearchBar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";
import CoverItem from "../../components/Article/CoverItem";
import ListHeader from "./ListHeader";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation } from "react-apollo";
import { hotArticlesQuery } from "../../graphql/article.graphql";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMore: true
    };
  }

  articles = [];

  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <Header
            navigation={navigation}
            leftComponent={<RecommendFollow navigation={navigation} />}
            rightComponent={
              <View style={{ flex: 1, marginLeft: 15, marginTop: 3 }}>
                <SearchBar navigation={navigation} height={28} iconSize={18} textStyle={{ marginLeft: 10, fontSize: 15 }} />
              </View>
            }
          />
          <Query query={hotArticlesQuery}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.articles)) return <SpinnerLoading />;
              return (
                <FlatList
                  removeClippedSubviews
                  ListHeaderComponent={() => <ListHeader navigation={navigation} />}
                  refreshing={loading}
                  onRefresh={() => {
                    refetch();
                  }}
                  data={data.articles}
                  keyExtractor={(item, index) => (item.key ? item.key : index.toString())}
                  renderItem={({ item, index }) => <CoverItem post={item} />}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    if (data.articles) {
                      fetchMore({
                        variables: {
                          offset: data.articles.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!(fetchMoreResult && fetchMoreResult.articles && fetchMoreResult.articles.length > 0)) {
                            this.setState({
                              fetchingMore: false
                            });
                            return prev;
                          }
                          return Object.assign({}, prev, {
                            articles: [...prev.articles, ...fetchMoreResult.articles]
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
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default HomeScreen;
