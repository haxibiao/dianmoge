import React from "react";
import { FlatList, StyleSheet, Text, Platform, Dimensions, View, TouchableOpacity, YellowBox, BackHandler, Keyboard } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { RichTextEditor, RichTextToolbar } from "react-native-zss-rich-text-editor";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Toast from "react-native-root-toast";

import Screen from "../Screen";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import { Iconfont } from "../../utils/Fonts";
import { Header } from "../../components/Header";
import { ContentEnd, LoadingMore, LoadingError, Waiting } from "../../components/Pure";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { draftsQuery } from "../../graphql/user.graphql";
import { articleContentQuery, createdArticleMutation, editArticleMutation } from "../../graphql/article.graphql";
import { withApollo, compose, graphql, Query } from "react-apollo";

let { width, height } = Dimensions.get("window");

class CreationScreen extends React.Component {
  constructor(props) {
    super(props);
    let article = props.navigation.getParam("article", {});
    this.publishing = false;
    this.state = {
      article,
      waitingVisible: false
    };
  }

  backHandlerAction = () => {
    if (!this.publishing) {
      this.backAction();
      return true;
    }
    return false;
  };

  componentDidMount() {
    YellowBox.ignoreWarnings(["Warning: RichTextToolbar has a method called componentDidReceiveProps()"]);
    //监听安卓back
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.backHandlerAction);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.backHandlerAction);
    }
  }

  onEditorInitialized() {}

  render() {
    const { navigation } = this.props;
    let { article, waitingVisible } = this.state;
    return (
      <Screen header>
        <View style={styles.container}>
          <Header
            navigation={navigation}
            backHandler={() => {
              this.backAction();
            }}
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  if (!this.publishing) {
                    this.publish();
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.themeColor
                  }}
                >
                  {article.id ? "发布更新" : "发布"}
                </Text>
              </TouchableOpacity>
            }
          />
          {article.id ? (
            <Query query={articleContentQuery} variables={{ id: article.id }}>
              {({ loading, error, data, refetch }) => {
                if (error) return <LoadingError reload={() => refetch()} />;
                if (!(data && data.article)) return null;
                this.gotArticle = data.article;
                return this.renderEditor(data.article);
              }}
            </Query>
          ) : (
            this.renderEditor()
          )}
          {Platform.OS == "ios" && <KeyboardSpacer />}
        </View>
        <Waiting isVisible={waitingVisible} />
      </Screen>
    );
  }

  // this.gotArticle用来保存获取到的article
  renderEditor = (article = this.state.article) => {
    this.gotArticle = article;
    return (
      <View style={{ flex: 1 }}>
        <RichTextEditor
          ref={r => (this.richtext = r)}
          initialTitleHTML={article.title}
          titlePlaceholder={"请输入标题"}
          initialContentHTML={article.body}
          contentPlaceholder={"请输入正文"}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar
          getEditor={() => this.richtext}
          iconTint={Colors.tintFontColor}
          selectedIconTint={Colors.themeColor}
          selectedButtonStyle={{ backgroundColor: Colors.tintGray }}
          onPressAddImage={() => {
            ImagePicker.openPicker({
              cropping: Platform.OS == "android" ? true : false,
              freeStyleCropEnabled: true
            })
              .then(image => {
                this.saveImage(image.path);
              })
              .catch(error => {});
          }}
        />
      </View>
    );
  };

  //插入图片
  saveImage = imagePath => {
    const { token } = this.props.user;
    var data = new FormData();
    data.append("photo", {
      uri: imagePath,
      name: "image.jpg",
      type: "image/jpg"
    });

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: data
    };

    fetch(Config.ServerRoot + "/api/image/save?api_token=" + token, config)
      .then(response => {
        return response.text();
      })
      .then(photo => {
        //TODO:: server return photo.width/height
        this.richtext.insertImage({
          src: photo,
          width: imagePath.width,
          height: imagePath.height,
          resizeMode: "cover"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //判断article内容是否change
  isChange(prevACont, currentCont) {
    if (prevACont.title != currentCont.title || prevACont.body != currentCont.body) {
      return true;
    }
    return false;
  }

  // 安卓返回处理
  backAction = () => {
    this.publishing = true;
    const { createArticle, editArticle, navigation } = this.props;
    // 异步获取编辑器内容
    Promise.all([this.richtext.getContentHtml(), this.richtext.getTitleText()])
      .then(([body, title]) => {
        //内容有改动
        if (body && title && this.isChange(this.gotArticle, { title, body })) {
          this.setState({
            waitingVisible: true
          });
          //文章已经创建
          if (this.gotArticle.id) {
            editArticle({
              variables: {
                id: this.gotArticle.id,
                title,
                body
              }
            })
              .then(({ data }) => {
                this.setState({
                  waitingVisible: false
                });
                //文章发布状态
                this.publishing = false;
                if (this.gotArticle.status > 0) {
                  navigation.replace("文章详情", { article: data.editArticle });
                } else {
                  navigation.goBack();
                }
              })
              .catch(error => {
                this.setState({
                  waitingVisible: false
                });
                navigation.goBack();
                this.publishing = false;
              });
          } else {
            createArticle({
              variables: {
                title,
                body
              },
              refetchQueries: result => [
                {
                  query: draftsQuery
                }
              ]
            })
              .then(({ data }) => {
                this.setState({
                  waitingVisible: false
                });
                this.publishing = false;
                navigation.replace("私密作品");
              })
              .catch(error => {
                this.setState({
                  waitingVisible: false
                });
                navigation.goBack();
                this.publishing = false;
              });
          }
        } else {
          this.publishing = false;
          navigation.goBack();
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  //点击发布
  publish = () => {
    Keyboard.dismiss();
    //更改发布状态（防止点击发布两次）
    this.publishing = true;
    const { createArticle, editArticle, navigation } = this.props;
    //异步获取编辑器内容
    Promise.all([this.richtext.getContentHtml(), this.richtext.getTitleText()])
      .then(([body, title]) => {
        if (!(body && title)) {
          this.toast();
        }
        this.setState({
          waitingVisible: true
        });
        //文章已经创建=>更新发布（或者发布更新）
        if (this.gotArticle.id) {
          //这里是保存第一次query的article（因为editArticleMutation后会使query重新fetch给gotArticle赋值），之后的status是1
          let flag = { ...this.gotArticle };
          // 先提交编辑后的文章
          editArticle({
            variables: {
              id: this.gotArticle.id,
              title,
              body,
              is_publish: this.gotArticle.status == 0
            }
          })
            .then(({ data }) => {
              this.setState({
                waitingVisible: false
              });
              this.publishing = false;
              //如果没有发布就发布更新否则更新发布
              if (flag.status < 1) {
                navigation.replace("发布分享", { article: data.editArticle });
              } else {
                navigation.replace("文章详情", { article: data.editArticle });
              }
            })
            .catch(error => {
              this.toast("出错啦，请检查网络设置");
              this.setState({
                waitingVisible: false
              });
              this.publishing = false;
            });
        } else {
          //创建并发布
          createArticle({
            variables: {
              title,
              body,
              is_publish: true
            }
          })
            .then(({ data }) => {
              this.setState({
                waitingVisible: false
              });
              this.publishing = false;
              navigation.replace("发布分享", { article: data.createArticle });
            })
            .catch(error => {
              this.toast("出错啦，请检查网络设置");
              this.setState({
                waitingVisible: false
              });
              this.publishing = false;
            });
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  toast(message = "标题或者内容不能为空哦") {
    let toast = Toast.show(message, {
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
    }, 2000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor
  }
});

export default compose(
  withApollo,
  graphql(createdArticleMutation, { name: "createArticle" }),
  graphql(editArticleMutation, { name: "editArticle" }),
  connect(store => ({ user: store.users.user }))
)(CreationScreen);
