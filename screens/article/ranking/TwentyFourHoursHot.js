import React, { Component } from "react";
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";
import NoteItem from "../../../components/Article/NoteItem";
import { ContentEnd, LoadingMore, LoadingError } from "../../../components/Pure";

import { connect } from "react-redux";
import actions from "../../../store/actions";
import { RankingArticleQuery } from "../../../graphql/article.graphql";
import { graphql, Query } from "react-apollo";

class TwentyFourHoursHot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingMore: true
    };
  }

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query
          query={RankingArticleQuery}
          variables={{
            in_days: 1
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (!(data && data.articles)) return null;
            return (
              <FlatList
                data={data.articles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <NoteItem post={item} />}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default TwentyFourHoursHot;
