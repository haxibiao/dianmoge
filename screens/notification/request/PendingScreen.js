import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { Header } from "../../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../../components/Pure";
import NotificationItem from "./NotificationItem";
import Screen from "../../Screen";

import { Query } from "react-apollo";
import { pendingArticlesQuery } from "../../../graphql/notification.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class PendingScreen extends Component {
  render() {
    let { pendingRequests, navigation } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <Header navigation={navigation} />
          <Query query={pendingArticlesQuery}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.user)) return <SpinnerLoading />;
              if (data.user.articles.length < 1) return <BlankContent />;
              return (
                <FlatList
                  data={data.user.articles}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <NotificationItem post={item} navigation={navigation} />}
                  ListFooterComponent={() => <ContentEnd />}
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

export default connect(store => ({
  pendingRequests: store.categories.all_pending_contribute
}))(PendingScreen);
