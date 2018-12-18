import React from "react";
import { StyleSheet, View, FlatList, RefreshControl, BackHandler } from "react-native";
import Toast from "react-native-root-toast";
import { detect_local_image } from "../../utils/qrcode";

import Screen from "../Screen";
import { Colors, Config, Divice } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { Header, RecommendUser } from "../../components/Header";
import { SearchBar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from "../../components/Pure";
import VideoItem from "../../components/Article/VideoItem";
import ListHeader from "./ListHeader";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { Query, Mutation, withApollo } from "react-apollo";
import { recommendArticlesQuery } from "../../graphql/article.graphql";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      //当前tab页，点击tabbar跳转到顶部并刷新页面
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        let scrollToTop = navigation.getParam("scrollToTop", null);
        if (scene.focused && scrollToTop) {
          scrollToTop();
        } else {
          jumpToIndex(scene.index);
        }
      }
    };
  };

  constructor(props) {
    super(props);
    this.continuous = true;
    this.state = {
      fetchingMore: true
    };
  }

  componentWillMount() {
    let { users, navigation } = this.props;

    detect_local_image().then(result => {
      console.log("detect_local_image:", result);
      console.log("saved qrcode user id: ", users.user);
      let qrcode_user_id = result;
      if (qrcode_user_id != users.user.qrcode_user_id) {
        this.props.dispatch(actions.qrcodeToUser(qrcode_user_id));
        navigation.navigate("用户详情", { qrcode_user_id });
      }
    });

    navigation.setParams({
      scrollToTop: this._scrollToTop
    });
  }

  // 首页监听物理返回、连续两次才可退出APP；同时保证聚焦在首页
  componentDidMount() {
    let { navigation } = this.props;
    if (!Divice.isIos) {
      this.didFocusSubscription = navigation.addListener("didFocus", payload => {
        BackHandler.addEventListener("hardwareBackPress", this.toast);
      });
      this.willBlurSubscription = navigation.addListener("willBlur", payload => {
        BackHandler.removeEventListener("hardwareBackPress", this.toast);
      });
    }
  }

  componentWillUnmount() {
    if (!Divice.isIos) {
      this.didFocusSubscription.remove();
      this.willBlurSubscription.remove();
    }
  }

  articles = [];

  render() {
    const { navigation } = this.props;
    return (
      <Screen header>
        <View style={styles.container}>
          <Header
            leftComponent={<RecommendUser navigation={navigation} />}
            centerComponent={
              <View style={{ flex: 1 }}>
                <SearchBar navigation={navigation} height={30} iconSize={18} textStyle={{ marginLeft: 10, fontSize: 15 }} />
              </View>
            }
          />
          <Query query={recommendArticlesQuery}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.articles)) return <SpinnerLoading />;
              return (
                <FlatList
                  ref={scrollview => {
                    this.scrollview = scrollview;
                  }}
                  numColumns={2}
                  refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
                  data={data.articles}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => <VideoItem post={item} />}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    if (data.articles) {
                      fetchMore({
                        variables: {
                          offset: data.articles.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (
                            !(
                              fetchMoreResult &&
                              fetchMoreResult.articles &&
                              fetchMoreResult.articles instanceof Array &&
                              fetchMoreResult.articles.length > 0
                            )
                          ) {
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

  _scrollToTop = () => {
    if (this.scrollview) {
      this.scrollview.scrollToOffset({ x: 0, y: 0, animated: true });
      this.props.client.query({
        query: recommendArticlesQuery,
        fetchPolicy: "network-only"
      });
    }
  };

  toast = () => {
    if (this.continuous) {
      //确保在1.5s内连续点击两次
      this.continuous = false;
      let toast = Toast.show("再次点击退出" + Config.AppDisplayName, {
        duration: Toast.durations.LONG,
        position: 100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 100,
        backgroundColor: Colors.nightColor
      });
      setTimeout(() => {
        Toast.hide(toast);
        this.continuous = true;
      }, 1500);
      return true;
    }
    return false;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default connect(store => ({ ...store }))(withApollo(HomeScreen));
