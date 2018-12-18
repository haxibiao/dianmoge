import React, { Component } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import utils from '../../utils';
import Toast from 'react-native-root-toast';
import VideoItem from './VideoItem';
import Screen from '../Screen';
import { Iconfont } from '../../utils/Fonts';
import { Colors, Divice, Methods } from '../../constants';
import { MasonryList, LoadingError, SpinnerLoading, LoadingMore, ContentEnd } from '../../components';

import { connect } from 'react-redux';
import actions from '../../store/actions';

import { Query, Mutation, withApollo } from 'react-apollo';
import { recommendVideosQuery } from '../../graphql/article.graphql';

const itemWidth = (Divice.width - 20) / 2;
const minVideoHidth = (itemWidth * 2) / 3;
const maxVideoHidth = (itemWidth * 3) / 2;

function calculatorHeight({ item }) {
  if (item.video && item.video.info && item.video.info.width) {
    if (item.video.info.width >= item.video.info.height) {
      return Math.max(minVideoHidth, (itemWidth / item.video.info.width) * item.video.info.height);
    } else {
      return Math.min(maxVideoHidth, (itemWidth / item.video.info.width) * item.video.info.height);
    }
  } else {
    return Math.min(maxVideoHidth, itemWidth);
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fetchValve = true;
    this.state = {
      finished: false
    };
  }

  async componentWillMount() {
    let { users, navigation } = this.props;

    // await this.detectQrcodes();

    navigation.setParams({
      scrollToTop: this._scrollToTop
    });
  }

  async detectQrcodes() {
    //检查相册权限
    await utils.Permissions.check();

    //优先检测视频分享痕迹
    console.log('检测视频二维码ing...');
    let video_info = await utils.QRCode.detectVideos();
    console.log('检测视频二维码结果:', video_info);
    if (video_info) {
      if (video_info.type == 'video' || video_info.type == 'post') {
        let toast = Toast.show('在本地视频，发现视频分享...', {
          duration: Toast.durations.LONG,
          position: 100,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 100,
          backgroundColor: Colors.nightColor
        });
        setTimeout(function() {
          Toast.hide(toast);
          navigation.navigate('动态详情', { qrcode_post_id: video_info.id });
        }, 2000);
      }
    } else {
      //没有检测到视频分享的时候,检查图片
      console.log('检测图片二维码ing...');
      let pic_info = await utils.QRCode.detectPhotos();
      console.log('检测图片二维码结果:', pic_info);
      if (pic_info) {
        if (pic_info.type == 'video' || pic_info.type == 'post') {
          let toast = Toast.show('在相册里，发现视频分享...', {
            duration: Toast.durations.LONG,
            position: 100,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 100,
            backgroundColor: Colors.nightColor
          });
          setTimeout(function() {
            Toast.hide(toast);
            navigation.navigate('动态详情', { qrcode_post_id: pic_info.id });
          }, 2000);
        }
        if (pic_info.type == 'user') {
          let toast = Toast.show('在相册里，发现用户分享...', {
            duration: Toast.durations.LONG,
            position: 100,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 100,
            backgroundColor: Colors.nightColor
          });
          setTimeout(function() {
            Toast.hide(toast);
            navigation.navigate('用户详情', { qrcode_user_id: pic_info.id });
          }, 2000);
        }
      }
    }

    //因为只检查相册第一个视频或者图片，就每次检测到分享就跳转,下载的 redux排重逻辑就不需要了

    // if (info && info.type == 'user' && info.id != users.user.qrcode_user_id) {
    //   this.props.dispatch(actions.qrcodeToUser(qrcode_user_id));
    //   navigation.navigate('用户详情', { qrcode_user_id });
    // }
  }

  render() {
    let { navigation } = this.props;
    return (
      <Screen leftComponent>
        <View style={styles.container}>
          <Query query={recommendVideosQuery}>
            {({ loading, error, data, refetch, fetchMore }) => {
              if (error) return <LoadingError reload={() => refetch()} />;
              if (!(data && data.articles)) return <SpinnerLoading />;
              // console.log("data.articles", data.articles);
              return (
                <MasonryList
                  numColumns={2}
                  data={data.articles}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <VideoItem video={item} navigation={navigation} calculatorHeight={calculatorHeight} itemWidth={itemWidth} />
                  )}
                  getHeightForItem={calculatorHeight}
                  // refreshing={refreshing}
                  // onRefresh={refetch()}
                  initialNumToRender={10}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => {
                    if (data.articles && this.fetchValve) {
                      this.fetchValve = false;
                      fetchMore({
                        variables: {
                          offset: data.articles.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.fetchValve = true;
                          if (
                            !(
                              fetchMoreResult &&
                              fetchMoreResult.articles &&
                              fetchMoreResult.articles instanceof Array &&
                              fetchMoreResult.articles.length > 0
                            )
                          ) {
                            this.setState({
                              finished: true
                            });
                            return prev;
                          }
                          return Object.assign({}, prev, {
                            articles: [...prev.articles, ...fetchMoreResult.articles]
                          });
                        }
                      });
                    }
                  }}
                  ListFooterComponent={() => {
                    return (
                      <View
                        style={{
                          height: 50,
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {this.state.finished ? <ContentEnd /> : <LoadingMore />}
                      </View>
                    );
                  }}
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
    backgroundColor: '#f0f0f0'
  }
});

export default connect(store => ({ ...store }))(withApollo(HomeScreen));
