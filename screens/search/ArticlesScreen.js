import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";

import Screen from "../Screen";
import { Iconfont } from "../../utils/Fonts";
import Colors from "../../constants/Colors";
import { SearchTypeHeader } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import SearchArticleItem from "../../components/Article/SearchArticleItem";
import { CustomPopoverMenu } from "../../components/Modal";

import { connect } from "react-redux";
import { graphql, Query } from "react-apollo";
import { hotArticlesQuery } from "../../graphql/article.graphql";

// 搜索不同集合下的article
class ArticlesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      fetching: false,
      fetchingMore: true
    };
  }

  render() {
    let { renderItem, search_detail, navigation } = this.props;
    let { keywords, fetching, fetchingMore } = this.state;
    // 把type传递给query的variable 获取不同集合下的article
    let type = navigation.getParam("type", "user");
    return (
      <Screen>
        <View style={styles.container}>
          <SearchTypeHeader
            navigation={navigation}
            placeholder={"搜索文章的内容或标题"}
            keywords={keywords}
            changeKeywords={this.changeKeywords.bind(this)}
            handleSearch={this.handleSearch.bind(this)}
          />
          {fetching && (
            <Query query={hotArticlesQuery}>
              {({ loading, error, data, refetch, fetchMore }) => {
                if (error) return <LoadingError reload={() => refetch()} />;
                if (!(data && data.articles)) return <SpinnerLoading />;
                if (data.articles.length < 0) return <BlankContent />;
                return (
                  <FlatList
                    ListHeaderComponent={this._renderSearchHeader.bind(this)}
                    data={data.articles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return <SearchArticleItem navigation={navigation} keywords={keywords} post={item} />;
                    }}
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
                      return fetchingMore ? <LoadingMore /> : <ContentEnd />;
                    }}
                  />
                );
              }}
            </Query>
          )}
        </View>
      </Screen>
    );
  }

  _renderSearchHeader() {
    return (
      <View style={styles.listHeader}>
        <View>
          <Text style={{ fontSize: 14, color: Colors.tintFontColor }}>相关文章</Text>
        </View>
        <View>
          <CustomPopoverMenu
            width={100}
            selectHandler={() => null}
            triggerComponent={
              <Text style={{ fontSize: 14, color: Colors.tintFontColor }}>
                综合排序 <Iconfont name={"downward-arrow"} size={12} />
              </Text>
            }
            options={["综合排序", "最新排序", "最新评论", "热度排行"]}
            customOptionStyle={{
              customOptionStyle: { optionText: { fontSize: 14 } }
            }}
          />
        </View>
      </View>
    );
  }

  changeKeywords(keywords) {
    this.setState({
      keywords
    });
  }

  handleSearch() {
    this.setState({
      fetching: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  }
});

export default connect(store => ({
  search_detail: store.search.search_detail
}))(ArticlesScreen);
