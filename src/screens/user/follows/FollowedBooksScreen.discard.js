import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { Colors } from "../../../constants";
import { Header } from "../../../components/Header";
import { CustomScrollTabBar, ContentEnd, LoadingMore, BlankContent, LoadingError, SpinnerLoading } from "../../../components/Pure";
import { CategoryGroup, CollectionGroup } from "../../../components/MediaGroup";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { userFollowedCategoriesQuery, userFollowedCollectionsQuery } from "../../../graphql/user.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class FollowedBooksScreen extends Component {
  render() {
    let { user } = this.props.navigation.state.params;
    let { navigation, followed_categories, followed_collections } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <ScrollableTabView
            renderTabBar={() => (
              <CustomScrollTabBar
                tabNames={["专题", "文集"]}
                tabBarStyle={{ borderTopColor: "transparent" }}
                tabItemWrapStyle={{
                  paddingHorizontal: 10,
                  marginHorizontal: 20
                }}
              />
            )}
          >
            <View tabLabel="专题" style={{ flex: 1 }}>
              <Query query={userFollowedCategoriesQuery} variables={{ user_id: user.id }}>
                {({ loading, error, data, refetch }) => {
                  if (error) return <LoadingError reload={() => refetch()} />;
                  if (!(data && data.categories)) return <SpinnerLoading />;
                  if (data.categories.length < 1) return <BlankContent />;
                  return (
                    <FlatList
                      data={data.categories}
                      keyExtractor={item => item.id.toString()}
                      getItemLayout={(data, index) => ({
                        length: 85,
                        offset: 85 * index,
                        index
                      })}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.categoryItem}
                          onPress={() =>
                            navigation.navigate("专题详情", {
                              category: item
                            })
                          }
                        >
                          <CategoryGroup navigation={navigation} category={item} showCreator customStyle={{ logo: 44, mateSize: 13 }} plain />
                        </TouchableOpacity>
                      )}
                      ListFooterComponent={() => <ContentEnd />}
                    />
                  );
                }}
              </Query>
            </View>
            <View tabLabel="文集" style={{ flex: 1 }}>
              <Query query={userFollowedCollectionsQuery} variables={{ user_id: user.id }}>
                {({ loading, error, data, refetch }) => {
                  if (error) return <LoadingError reload={() => refetch()} />;
                  if (!(data && data.collections)) return <SpinnerLoading />;
                  if (data.collections.length < 1) return <BlankContent />;
                  return (
                    <FlatList
                      data={data.collections}
                      keyExtractor={item => item.id.toString()}
                      getItemLayout={(data, index) => ({
                        length: 85,
                        offset: 85 * index,
                        index
                      })}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.categoryItem}
                          onPress={() =>
                            navigation.navigate("文集详情", {
                              collection: item
                            })
                          }
                        >
                          <CollectionGroup navigation={navigation} collection={item} customStyle={{ logo: 44, mateSize: 13 }} plain />
                        </TouchableOpacity>
                      )}
                      ListFooterComponent={() => <ContentEnd />}
                    />
                  );
                }}
              </Query>
            </View>
          </ScrollableTabView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  categoryItem: {
    marginHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  }
});

export default connect(store => ({
  followed_categories: store.categories.followed_categories,
  followed_collections: store.categories.followed_collections
}))(FollowedBooksScreen);
