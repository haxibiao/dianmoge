import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { Colors, Divice } from '../../constants';
import { Iconfont } from '../../utils/Fonts';
import { Header, HeaderLeft } from '../../components/Header';
import { Avatar } from '../../components/Pure';
import { FollowButton } from '../../components/Button';
import { CustomPopoverMenu, ShareCard } from '../../components/Modal';

import { Query, Mutation, compose, graphql } from 'react-apollo';
import { favoriteArticleMutation } from '../../graphql/article.graphql';
import { connect } from 'react-redux';
import actions from '../../store/actions';

class PostHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModalVisible: false
    };
  }

  render() {
    let { shareModalVisible } = this.state;
    let { navigation, post, lightBar } = this.props;
    let { user } = post;
    return (
      <Mutation mutation={favoriteArticleMutation}>
        {favoriteArticle => {
          return (
            <View>
              <Header
                lightBar
                leftComponent={
                  <HeaderLeft color={lightBar ? '#fff' : Colors.font1}>
                    <TouchableOpacity style={{ marginRight: 6 }} onPress={() => navigation.navigate('用户详情', { user })}>
                      <Avatar size={30} uri={user.avatar} />
                    </TouchableOpacity>
                    <Text style={[styles.name, lightBar && { color: '#fff' }]}>{user.name}</Text>
                    <FollowButton
                      id={user.id}
                      type={'user'}
                      customStyle={lightBar ? styles.transparentButton : styles.fillButton}
                      fontColor={lightBar ? '#fff' : null}
                      theme={lightBar ? 'transparent' : Colors.weixinColor}
                      under={lightBar ? 'transparent' : Colors.darkGray}
                      status={user.followed_status}
                    />
                  </HeaderLeft>
                }
                centerComponent
                rightComponent={
                  <TouchableOpacity onPress={() => this.setState({ shareModalVisible: true })} style={{ padding: 10 }}>
                    <Iconfont name={'more'} size={23} color={lightBar ? '#fff' : Colors.font1} />
                  </TouchableOpacity>
                }
              />
              <ShareCard visible={shareModalVisible} toggleVisible={() => this.setState({ shareModalVisible: false })} post={post} type={post.type} />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.font1,
    marginLeft: 6
  },
  fillButton: {
    width: 66,
    height: 28,
    marginLeft: 15,
    borderRadius: 15
  },
  transparentButton: {
    width: 66,
    height: 28,
    marginLeft: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff'
  }
});

export default PostHeader;
