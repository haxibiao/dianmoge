import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";

import { ContentEnd, LoadingMore, BlankContent, SpinnerLoading, LoadingError } from "../../components/Pure";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { CustomPopoverMenu } from "../../components/Modal";
import NoteItem from "../../components/Article/NoteItem";

import { userArticlesQuery } from "../../graphql/user.graphql";
import { Mutation, Query } from "react-apollo";

class ArticlesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingMore: true
    };
  }

  render() {
    let { scrollEnabled, navigation, onScroll, user, gotArticleLength } = this.props;
    return (
      <View style={styles.container}>
        <Query
          query={userArticlesQuery}
          variables={{
            user_id: user.id
          }}
        >
          {({ loading, data, error, refresh, fetchMore }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (!(data && data.articles)) return <SpinnerLoading />;
            gotArticleLength(data.articles.length);
            if (data.articles.length < 1) return <BlankContent />;
            return (
              <FlatList
                onScroll={onScroll}
                scrollEnabled={scrollEnabled}
                ListHeaderComponent={() => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        marginTop: 20
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 14, color: Colors.themeColor }}>
                          文章(
                          {data.articles.length})
                        </Text>
                      </View>
                      <View>
                        <CustomPopoverMenu
                          width={110}
                          selectHandler={() => null}
                          triggerComponent={
                            <Text
                              style={{
                                fontSize: 14,
                                color: Colors.tintFontColor
                              }}
                            >
                              最新文章 <Iconfont name={"downward-arrow"} size={12} />
                            </Text>
                          }
                          options={["最新文章", "热门文章"]}
                        />
                      </View>
                    </View>
                  );
                }}
                data={data.articles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate("文章详情", { article: item })}>
                    <NoteItem post={item} />
                  </TouchableOpacity>
                )}
                getItemLayout={(data, index) => ({
                  length: 130,
                  offset: 130 * index,
                  index
                })}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default ArticlesTab;
