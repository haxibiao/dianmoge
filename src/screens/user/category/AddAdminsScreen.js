import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, StatusBar } from "react-native";

import { Colors } from "../../../constants";
import { Iconfont } from "../../../utils/Fonts";
import { Header } from "../../../components/Header";
import { UserMetaGroup } from "../../../components/MediaGroup";
import { SearchUserModal } from "../../../components/Modal";
import { ContentEnd, LoadingMore, SpinnerLoading, BlankContent } from "../../../components/Pure";
import Screen from "../../Screen";

import { Query, Mutation, graphql } from "react-apollo";
import { editCategoryAdminsMutation, categoryAdminsQuery } from "../../../graphql/category.graphql";
import { connect } from "react-redux";
import actions from "../../../store/actions";

class AddAdminsScreen extends Component {
  constructor(props) {
    super(props);
    let { category } = this.props.navigation.state.params;
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.admin_uids = [];
    this.state = {
      category: category,
      modalVisible: false,
      admin_users: []
    };
  }

  render() {
    let { modalVisible, category, admin_users } = this.state;
    let { navigation } = this.props;
    return (
      <Screen header={this.renderHeader()}>
        <View style={styles.container}>
          {category.id ? (
            <Query query={categoryAdminsQuery} variables={{ id: category.id }}>
              {({ loading, error, data }) => {
                if (error) return <LoadingError reload={() => refetch()} />;
                if (!(data && data.users)) return <SpinnerLoading />;
                if (data.users.length < 1) return <BlankContent />;
                //mutation接收一个user id的数组
                this.admin_uids = data.users.map((elem, index) => {
                  return elem.id;
                });
                return (
                  <FlatList
                    data={data.users}
                    keyExtractor={(item, index) => index.toString()}
                    getItemLayout={(data, index) => ({
                      length: 86,
                      offset: 86 * index,
                      index
                    })}
                    renderItem={this._renderUserItem}
                    ListFooterComponent={() => <ContentEnd />}
                  />
                );
              }}
            </Query>
          ) : admin_users.length > 0 ? (
            <FlatList
              data={admin_users}
              keyExtractor={(item, index) => index.toString()}
              getItemLayout={(data, index) => ({
                length: 86,
                offset: 86 * index,
                index
              })}
              renderItem={this._renderUserItem}
              ListFooterComponent={() => <ContentEnd />}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <BlankContent />
            </View>
          )}
          <SearchUserModal
            navigation={navigation}
            visible={modalVisible}
            toggleVisible={this.toggleVisible}
            handleSelectedUser={user => {
              if (category.id) {
                this.admin_uids.push(user.id);
                this.props.editCategoryAdmins({
                  variables: {
                    id: category.id,
                    admin_uids: this.admin_uids.toString()
                  },
                  refetchQueries: mutationResult => [
                    {
                      query: categoryAdminsQuery,
                      variables: {
                        id: category.id
                      }
                    }
                  ]
                });
                this.toggleVisible();
              } else {
                this.handleSelectedUser(user);
                //首次创建专题，选择的管理员先存在redux中，待确认创建的时候一起返回给服务端
                this.props.dispatch(actions.editCategoryAdmins(this.admin_uids));
              }
            }}
          />
        </View>
      </Screen>
    );
  }

  renderHeader = () => {
    return (
      <Header
        rightComponent={
          <TouchableOpacity onPress={this.toggleVisible}>
            <Text
              style={{
                fontSize: 17,
                color: Colors.weixinColor
              }}
            >
              添加
            </Text>
          </TouchableOpacity>
        }
      />
    );
  };

  _renderUserItem = ({ item }) => {
    let { navigation } = this.props;
    return (
      <TouchableOpacity style={[styles.friendItem, styles.layout]} onPress={() => navigation.navigate("用户详情", { user: item })}>
        <View style={{ flex: 1 }}>
          <UserMetaGroup user={item} />
        </View>
        <TouchableOpacity onPress={() => this.deleteUser(item.id)}>
          <Iconfont name={"chacha"} size={23} color={"#666"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  deleteUser(id) {
    let { category, admin_users } = this.state;
    admin_users = admin_users.filter((elem, i) => {
      return elem.id !== id;
    });
    this.admin_uids.splice(this.admin_uids.indexOf(id), 1);
    if (category.id) {
      this.props.editCategoryAdmins({
        variables: {
          id: category.id,
          admin_uids: this.admin_uids.toString()
        },
        refetchQueries: mutationResult => [
          {
            query: categoryAdminsQuery,
            variables: {
              id: category.id
            }
          }
        ]
      });
    } else {
      this.setState({ admin_users });
      this.props.dispatch(actions.editCategoryAdmins(this.admin_uids));
    }
  }

  toggleVisible() {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  }

  handleSelectedUser(user = {}) {
    let { admin_users } = this.state;
    admin_users.push(user);
    this.admin_uids.push(user.id);
    this.setState({ admin_users });
    this.toggleVisible();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  },
  friendItem: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  layout: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connect(store => ({
  userIds: store.categories.userIds
}))(graphql(editCategoryAdminsMutation, { name: "editCategoryAdmins" })(AddAdminsScreen));
