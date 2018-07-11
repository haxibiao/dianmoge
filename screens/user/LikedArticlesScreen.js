import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
import { Header } from "../../components/Header";
import NoteItem from "../../components/Article/NoteItem";
import { ContentEnd, LoadingMore, LoadingError, SpinnerLoading, BlankContent } from "../../components/Pure";
import { OperationModal } from "../../components/Modal";
import Screen from "../Screen";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { userLikedArticlesQuery } from "../../graphql/user.graphql";
import { Mutation, Query } from "react-apollo";

const { width, height } = Dimensions.get("window");

class LikedArticlesScreen extends Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      modalVisible: false,
      fetchingMore: true
    };
  }

  render() {
    let { modalVisible } = this.state;
    const { user = {} } = this.props.navigation.state.params;
    let { navigation, currentUser } = this.props;
    let is_self = false;
    if (user.id == currentUser.id) {
      is_self = true;
    }
    return (
      <Screen>
        <View style={styles.container}>
          <Header navigation={navigation} />
          <Query query={userLikedArticlesQuery} variables={{ user_id: user.id }}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.articles)) return <SpinnerLoading />;
              if (data.articles.length < 1) return <BlankContent />;
              return (
                <FlatList
                  data={data.articles}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <NoteItem post={item} longPress={this.handleModal} />}
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
          {is_self && (
            <OperationModal
              operation={["取消喜欢"]}
              visible={modalVisible}
              handleVisible={this.handleModal}
              handleOperation={index => {
                this.handleModal();
              }}
            />
          )}
        </View>
      </Screen>
    );
  }

  handleModal() {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default connect(store => ({
  currentUser: store.users.user
}))(LikedArticlesScreen);
