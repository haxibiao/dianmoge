import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, TouchableWithoutFeedback, FlatList, Dimensions } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import { Header } from "../../components/Header";
import { DivisionLine, SearchBar, LoadingError, SpinnerLoading, BlankContent, LoadingMore, ContentEnd } from "../../components/Pure";
import { OperationModal } from "../../components/Modal";
import FollowItem from "./FollowItem";
import Screen from "../Screen";

import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import { recommendFollowsQuery } from "../../graphql/user.graphql";

const { width, height } = Dimensions.get("window");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMore: true,
      modalVisible: false,
      operation: []
    };
  }

  render() {
    let { navigation, user } = this.props;
    let { modalVisible, operation } = this.state;
    return (
      <Screen>
        <View style={styles.container}>
          <Query query={recommendFollowsQuery} variables={{ recommend_for_user_id: user.id }}>
            {({ loading, error, data, fetchMore, fetch }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.follows)) return <SpinnerLoading />;
              if (data.follows.length < 1) return <BlankContent />;
              return (
                <FlatList
                  ListHeaderComponent={this._renderHeader}
                  data={data.follows}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    if (data.follows) {
                      fetchMore({
                        variables: {
                          offset: data.follows.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!(fetchMoreResult && fetchMoreResult.follows && fetchMoreResult.follows.length > 0)) {
                            this.setState({
                              fetchingMore: false
                            });
                            return prev;
                          }
                          return Object.assign({}, prev, {
                            follows: [...prev.follows, ...fetchMoreResult.follows]
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
          <OperationModal handleOperation={index => index} operation={operation} visible={modalVisible} handleVisible={this.toggleModalVisible} />
        </View>
      </Screen>
    );
  }

  _renderHeader = () => {
    let { navigation } = this.props;
    return (
      <View>
        <View style={styles.recommendClassify}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("推荐作者")}>
            <View style={{ alignItems: "center" }}>
              <Iconfont name={"recommend-user"} size={29} color={Colors.skyBlue} />
              <View style={{ marginTop: 10 }}>
                <Text style={styles.classify}>推荐作者</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("推荐专题")}>
            <View style={{ alignItems: "center" }}>
              <Iconfont name={"category-rotate"} size={28} color="#FF9D23" />
              <View style={{ marginTop: 10 }}>
                <Text style={styles.classify}>推荐专题</Text>
              </View>
            </View>
          </TouchableOpacity>
          {
            // 隐藏第三方social
            // <TouchableOpacity
            //   style={{ flex: 1 }}
            //   onPress={() => {
            //     this.setState({
            //       operation: ["微信好友", "微信朋友圈"],
            //       modalVisible: true
            //     });
            //   }}
            // >
            //   <View style={{ alignItems: "center" }}>
            //     <Iconfont name={"weixin"} size={31} color={Colors.weixinColor} />
            //     <View style={{ marginTop: 10 }}>
            //       <Text style={styles.classify}>添加微信好友</Text>
            //     </View>
            //   </View>
            // </TouchableOpacity>
            // <TouchableOpacity
            //   style={{ flex: 1 }}
            //   onPress={() => {
            //     this.setState({
            //       operation: ["QQ好友", "QQ空间"],
            //       modalVisible: true
            //     });
            //   }}
            // >
            //   <View style={{ alignItems: "center" }}>
            //     <Iconfont name={"qq"} size={29} color={Colors.qqColor} />
            //     <View style={{ marginTop: 10 }}>
            //       <Text style={styles.classify}>添加QQ好友</Text>
            //     </View>
            //   </View>
            // </TouchableOpacity>
          }
        </View>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    let { navigation } = this.props;
    let follow = item;
    return (
      <View>
        <DivisionLine height={18} />
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.officialRecommend}>
            <Iconfont name={follow.user ? "followed" : "ranking"} size={17} color={Colors.themeColor} />
            <Text
              style={{
                fontSize: 15,
                color: Colors.themeColor,
                marginLeft: 5
              }}
            >
              {Config.AppDisplayName}
              推荐
              {follow.user ? "作者" : "专题"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() =>
              navigation.navigate(follow.user ? "用户详情" : "专题详情", follow.user ? { user: follow.user } : { category: follow.category })
            }
          >
            <FollowItem follow={follow} navigation={navigation} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  toggleModalVisible = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible
    }));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  recommendClassify: {
    height: 90,
    flexDirection: "row",
    alignItems: "center"
  },
  classify: {
    fontSize: 13,
    color: "#969696"
  },
  officialRecommend: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  }
});

export default connect(store => {
  return { user: store.users.user };
})(HomeScreen);
