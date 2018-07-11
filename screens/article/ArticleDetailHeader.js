import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import Modal from "react-native-modal";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import Colors from "../../constants/Colors";
import { Iconfont } from "../../utils/Fonts";
import { Header, HeaderLeft } from "../../components/Header";
import { Avatar, ContentEnd } from "../../components/Pure";
import { CustomPopoverMenu, ReportModal } from "../../components/Modal";

import { Query, Mutation, compose, graphql } from "react-apollo";
import { favoriteArticleMutation } from "../../graphql/article.graphql";
import { connect } from "react-redux";
import actions from "../../store/actions";

// menu options样式
const popoverOption = {
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  }
};

class ArticleDetailHeader extends Component {
  constructor(props) {
    super(props);
    this.toggleReportModal = this.toggleReportModal.bind(this);
    this.state = {
      reportModalVisible: false
    };
  }

  render() {
    let { reportModalVisible } = this.state;
    let { navigation, article, share, personal, login } = this.props;
    let { user } = article;
    let self = personal.id == user.id ? true : false;
    return (
      <Mutation mutation={favoriteArticleMutation}>
        {favoriteArticle => {
          return (
            <View>
              <Header
                navigation={navigation}
                leftComponent={
                  <HeaderLeft navigation={navigation} routeName={true}>
                    <TouchableOpacity style={{ marginRight: 6 }} onPress={() => navigation.navigate("用户详情", { user })}>
                      <Avatar size={28} uri={user.avatar} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, color: Colors.tintFontColor }}>{user.name}</Text>
                  </HeaderLeft>
                }
                rightComponent={
                  <View>
                    <CustomPopoverMenu
                      width={140}
                      selectHandler={index => {
                        switch (index) {
                          case 0:
                            //收藏
                            if (login) {
                              favoriteArticle({
                                variables: {
                                  article_id: article.id
                                }
                              });
                            } else {
                              navigation.navigate("登录注册");
                            }
                            break;
                          case 1:
                            //分享
                            share();
                            break;
                          case 2:
                            //举报
                            if (login) {
                              this.toggleReportModal();
                            } else {
                              navigation.navigate("登录注册");
                            }
                            break;
                        }
                      }}
                      triggerComponent={<Iconfont name={"more-vertical"} size={23} color={Colors.tintFontColor} />}
                    >
                      {self ? (
                        <View>
                          <MenuOption value={0} customStyles={popoverOption}>
                            <Iconfont name={article.favorited ? "star" : "star-outline"} size={22} color={"#717171"} style={{ marginRight: 16 }} />
                            <Text style={styles.optionText}>{article.favorited ? "取消收藏" : "收藏"}</Text>
                          </MenuOption>
                          <MenuOption value={1} customStyles={popoverOption}>
                            <Iconfont name={"share"} size={19} color={"#717171"} style={{ marginRight: 16 }} />
                            <Text style={styles.optionText}>分享</Text>
                          </MenuOption>
                        </View>
                      ) : (
                        <View>
                          <MenuOption value={0} customStyles={popoverOption}>
                            <Iconfont name={article.favorited ? "star" : "star-outline"} size={22} color={"#717171"} style={{ marginRight: 16 }} />
                            <Text style={styles.optionText}>{article.favorited ? "取消收藏" : "收藏"}</Text>
                          </MenuOption>
                          <MenuOption value={1} customStyles={popoverOption}>
                            <Iconfont name={"share"} size={19} color={"#717171"} style={{ marginRight: 16 }} />
                            <Text style={styles.optionText}>分享</Text>
                          </MenuOption>
                          <MenuOption value={2} customStyles={popoverOption}>
                            <Iconfont name={"hint-fill"} size={22} color={"#717171"} style={{ marginRight: 16 }} />
                            <Text style={styles.optionText}>举报</Text>
                          </MenuOption>
                        </View>
                      )}
                    </CustomPopoverMenu>
                  </View>
                }
              />
              <ReportModal visible={reportModalVisible} handleVisible={this.toggleReportModal} report={article} type={"article"} />
            </View>
          );
        }}
      </Mutation>
    );
  }

  toggleReportModal() {
    this.setState(prevState => ({
      reportModalVisible: !prevState.reportModalVisible
    }));
  }
}

const styles = StyleSheet.create({});

export default connect(store => ({ personal: store.users.user }))(ArticleDetailHeader);
