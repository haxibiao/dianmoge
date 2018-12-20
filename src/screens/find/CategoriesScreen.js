import React from 'react';
import { FlatList, StyleSheet, ScrollView, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Screen from '../Screen';
import Carousel from './Carousel';
import { Iconfont } from '../../utils/Fonts';
import { Colors, Methods } from '../../constants';
import { Avatar, ContentEnd, LoadingMore, LoadingError, SpinnerLoading } from '../../components/Pure';
import RecommendCategory from './RecommendCategory';

import { connect } from 'react-redux';
import actions from '../../store/actions';
import { topCategoriesQuery } from '../../graphql/category.graphql';
import { followCategoryMutation, userFollowedCategoriesQuery } from '../../graphql/user.graphql';
import { Query, Mutation, compose, withApollo } from 'react-apollo';

const { width, height } = Dimensions.get('window');

class CategoriesScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     //当前tab页，点击tabbar跳转到顶部并刷新页面
  //     tabBarOnPress: ({ scene, previousScene, jumpToIndex }) => {
  //       let scrollToTop = navigation.getParam("scrollToTop", null);
  //       if (scene.focused && scrollToTop) {
  //         scrollToTop();
  //       } else {
  //         jumpToIndex(scene.index);
  //       }
  //     }
  //   };
  // };

  constructor(props) {
    super(props);
    this.state = {
      fetchingMore: true
    };
    this.valve = true;
  }

  componentWillMount() {
    this.props.navigation.setParams({
      scrollToTop: this._scrollToTop
    });
  }

  render() {
    let { navigation, user } = this.props;
    if (!user.id) {
      return this._renderEmpty(navigation);
    }
    return (
      <View style={styles.container}>
        <Query query={userFollowedCategoriesQuery} variables={{ user_id: user.id }}>
          {({ loading, error, data, fetchMore, refetch }) => {
            let categories;
            if (error || !(data && data.categories) || data.categories.length < 1) {
              categories = [];
            }
            if (data && data.categories) {
              categories = data.categories;
            }
            if (categories.length < 1) {
              return this._renderEmpty(navigation);
            }
            return (
              <FlatList
                ref={scrollview => {
                  this.scrollview = scrollview;
                }}
                data={categories}
                ListHeaderComponent={() => this._renderListHeader(navigation)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderCategoryItem}
                refreshing={loading}
                onRefresh={() => {
                  refetch();
                }}
                onEndReached={() => {
                  if (categories && this.valve) {
                    this.valve = false;
                    fetchMore({
                      variables: {
                        offset: categories.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        this.valve = true;
                        if (!(fetchMoreResult && fetchMoreResult.categories && fetchMoreResult.categories.length > 0)) {
                          this.setState({
                            fetchingMore: false
                          });
                          return prev;
                        }
                        return Object.assign({}, prev, {
                          categories: [...prev.categories, ...fetchMoreResult.categories]
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
                  if (this.state.fetchingMore) {
                    return <LoadingMore />;
                  }
                  return (
                    <TouchableWithoutFeedback onPress={() => Methods.navigationDispatch(navigation, { routeName: '全部专题', key: '全部专题' })}>
                      <View style={styles.refresh}>
                        <Iconfont name="fresh" size={15} color={Colors.themeColor} />
                        <Text style={styles.refreshText}>关注更多专题</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
              />
            );
          }}
        </Query>
      </View>
    );
  }

  _renderListHeader = navigation => {
    return (
      <View style={styles.listHeader}>
        <Carousel navigation={navigation} />
        <View style={styles.flexRowCenter}>
          <TouchableWithoutFeedback onPress={() => Methods.navigationDispatch(navigation, { routeName: '全部专题', key: '全部专题' })}>
            <View style={styles.entry}>
              <View style={styles.flexRowCenter}>
                <View style={[styles.entryLabel, styles.center, { backgroundColor: Colors.themeColor }]}>
                  <Iconfont name="category" size={22} color="#fff" style={{ marginLeft: 2, marginTop: 2 }} />
                </View>
                <Text style={styles.entryName}>全部专题</Text>
              </View>
              <View>
                <Iconfont name="right" size={22} color={Colors.tintFontColor} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  _renderCategoryItem = ({ item, index }) => {
    let category = item;
    let { navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Methods.goContentScreen(navigation, { ...category, type: 'category' })}>
        <View style={styles.recommendItem}>
          <Avatar size={50} type="category" uri={category.logo} />
          <View style={styles.followInfo}>
            <Text numberOfLines={1} style={styles.drakText}>
              {category.name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _renderEmpty = navigation => {
    return (
      <ScrollView style={styles.container}>
        {this._renderListHeader(navigation)}
        <RecommendCategory navigation={navigation} />
      </ScrollView>
    );
  };

  navigateMiddlewear = routeName => {
    let { navigation, login } = this.props;
    if (login) {
      Methods.navigationDispatch(navigation, { routeName, key: routeName });
    } else {
      Methods.navigationDispatch(navigation, { routeName: '登录注册', key: '登录注册', params: { login: true } });
    }
  };

  _scrollToTop = () => {
    if (this.scrollview) {
      this.scrollview.scrollToOffset({ x: 0, y: 0, animated: true });
      // this.props.client.query({
      //   query: topCategoriesQuery,
      //   fetchPolicy: "network-only"
      // });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listHeader: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.lightBorderColor
  },
  entry: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15
  },
  entryLabel: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.orange
  },
  entryName: {
    fontSize: 15,
    color: Colors.darkFontColor,
    marginLeft: 15
  },
  recommendItem: {
    height: 74,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  followInfo: {
    marginHorizontal: 15,
    flex: 1
  },
  drakText: {
    fontSize: 15,
    color: Colors.darkFontColor
  },
  refresh: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 10
  },
  refreshText: {
    fontSize: 14,
    color: Colors.themeColor,
    marginLeft: 4
  }
});

export default compose(
  withApollo,
  connect(store => ({ categories: store.categories, user: store.users.user, login: store.users.login }))
)(CategoriesScreen);
