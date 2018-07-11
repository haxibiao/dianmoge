import React from "react";
import { FlatList, StyleSheet, ScrollView, Text, View, Image, Dimensions, TouchableOpacity, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";

import Color from "../../constants/Colors";
import NoteItem from "../../components/Article/NoteItem";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";
import ScrollCard from "./ScrollCard";
import Screen from "../Screen";

import { recommendArticlesQuery, topArticleWithImagesQuery } from "../../graphql/article.graphql";
import { Mutation, Query } from "react-apollo";
import { connect } from "react-redux";
import actions from "../../store/actions";

const { width, height } = Dimensions.get("window");

class RecommendScreen extends React.Component {
  state = {
    fetchingMore: true
  };

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query query={recommendArticlesQuery}>
          {({ loading, error, data, refetch, fetchMore }) => {
            if (error) return <LoadingError reload={() => refetch()} />;
            if (!(data && data.articles)) return <SpinnerLoading />;
            return (
              <FlatList
                removeClippedSubviews
                ListHeaderComponent={() => {
                  return (
                    <View>
                      <View style={styles.swiperContainer}>
                        <Query query={topArticleWithImagesQuery}>
                          {({ loading, error, data }) => {
                            if (!(data && data.articles)) return null;
                            return (
                              <Swiper autoplay={true} autoplayTimeout={5} paginationStyle={{ bottom: 10 }} activeDotColor="#fff">
                                {this._renderSwiperImage(data.articles)}
                              </Swiper>
                            );
                          }}
                        </Query>
                      </View>
                      <ScrollCard navigation={navigation} />
                    </View>
                  );
                }}
                refreshing={loading}
                onRefresh={() => {
                  refetch();
                }}
                data={data.articles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <NoteItem post={item} recommend />}
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

  _renderSwiperImage(poster) {
    var posterList = [];
    poster.forEach((article, index) => {
      posterList.push(
        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("文章详情", { article: article })}>
          <Image style={styles.posterImage} source={{ uri: article.top_image }} />
        </TouchableOpacity>
      );
    });
    return posterList;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  swiperContainer: {
    height: width * 0.5
  },
  posterImage: {
    width,
    height: width * 0.5,
    resizeMode: "cover"
  }
});

export default connect(store => ({ articles: store.articles.articles }))(RecommendScreen);
