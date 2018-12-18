import React from "react";
import ReactNative from "react-native";
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
  Platform,
  Keyboard
} from "react-native";

import Screen from "../Screen";
import UploadBody from "./UploadBody";
import CreatePostBottom from "./CreatePostBottom";
import { Colors } from "../../constants";
import Config from "../../constants/Config";
import { Iconfont } from "../../utils/Fonts";
import { Header } from "../../components/Header";
import MediaModal from "../../components/Modal/MediaModal";

// import Upload from "react-native-background-upload";
import uploader from "../../native/VodUploader";

import Toast from "react-native-root-toast";
import KeyboardSpacer from "react-native-keyboard-spacer";
import ImagePicker from "react-native-image-crop-picker";
import { throttle } from "lodash";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { Waiting } from "../../components/Pure";

import { withApollo, compose, graphql, Query } from "react-apollo";
import { Mutation } from "react-apollo";
import { draftsQuery, userArticlesQuery } from "../../graphql/user.graphql";
import { createPostMutation } from "../../graphql/article.graphql";

const selectedArr = ["图片", "视频"];

class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.image_urls = [];
    // this.selectCategories = [];
    this.body = "";
    this.publishing = false;
    let category = props.navigation.getParam("category", {});

    this.state = {
      video_id: null,
      uploadId: null,
      progress: null,
      completed: false,
      body: "",
      covers: [],
      uri: "",
      uploadType: 1,
      selectCategories: category.name == null ? [] : [category],
      category_ids: [],
      waitingVisible: false,
      ok: true
    };
  }

  render() {
    let {
      covers,
      completed,
      progress,
      uploadId,
      uploadType,
      uri,
      selectCategories,
      category_ids,
      waitingVisible,
      body
    } = this.state;
    const { navigation } = this.props;
    return (
      <Screen header>
        <View style={styles.container}>
          <Header
            routeName
            lightBar
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Iconfont name={"chacha"} size={24} />
              </TouchableOpacity>
            }
          />
          <UploadBody
            navigation={navigation}
            covers={covers}
            progress={progress}
            completed={completed}
            uploadId={uploadId}
            uploadType={uploadType}
            changeBody={this.changeBody}
            body={this.body}
            selectCategories={selectCategories}
            selectCategory={this.selectCategory}
            removeMedia={this.removeMedia}
            category_ids={category_ids}
          />
          <CreatePostBottom
            navigation={navigation}
            uploadType={uploadType}
            completed={completed}
            uploadId={uploadId}
            covers={covers}
            selectCategories={selectCategories}
            selectCategory={this.selectCategory}
            onPressPhotoUpload={this.onPressPhotoUpload}
            onPressVideoUpload={this.onPressVideoUpload}
            publish={this.publish}
            publishing={this.publishing}
            body={body}
            image_urls={this.image_urls}
          />
          {Platform.OS == "ios" && <KeyboardSpacer />}
        </View>
        <Waiting isVisible={waitingVisible} />
      </Screen>
    );
  }

  selectCategory = selectCategories => {
    // let { category_ids } = this.state;
    this.setState({ selectCategories });
  };

  publish = () => {
    let { navigation, createPost, user } = this.props;
    let { uploadType, video_id, selectCategories } = this.state;
    let category_ids = selectCategories.map((elem, i) => {
      return elem.id;
    });
    console.log("category_ids", category_ids);
    Keyboard.dismiss();
    this.publishing = true;
    if (!this.state.body) {
      this.toast();
    }
    this.setState({
      waitingVisible: true
    });

    //TODO:这里找后端核实下，这个统一的发布动态接口应该是可以兼容所有发布动态的场景的，前端也应该简化选择上传内容那的操作，
    //简化到和朋友圈一样，和雷坤做的web发布动态一样，无需用户选择图片还是视频这个模态框，直接选择了发布，或者是拍摄。
    console.log("createPost", category_ids);
    createPost({
      variables: {
        body: this.state.body,
        image_urls: this.image_urls,
        a_cids: category_ids,
        video_id: video_id
      },
      refetchQueries: addComment => [
        {
          query: userArticlesQuery,
          variables: {
            user_id: user.id
          }
        }
      ]
    })
      .then(({ data }) => {
        console.log("published");
        console.log("createPost", data.createPost);
        this.setState({
          waitingVisible: false
        });
        this.publishing = false;

        navigation.replace("动态详情", { post: data.createPost });
      })
      .catch(error => {
        this.publishing = false;
        this.setState({
          waitingVisible: false
        });
        this.toast("出错啦，请检查网络是否正常");
      });
  };

  changeBody = body => {
    this.setState({
      body: body
    });
    this.body = body;
  };

  onPressVideoUpload = () => {
    //打开视频库
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "video"
    }).then(
      video => {
        let { covers, uri } = this.state;
        covers.push(video.path); //视频资源
        this.setState({
          covers
        });
        console.log("covers:", covers);
        let path = video.path.substr(7);
        console.log("video path:", path);
        this.startUploadVideo({ path });
      },
      error => {
        console.log(error);
        add;
      }
    );
  };

  onPressPhotoUpload = options => {
    //打开相册
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo"
    }).then(
      images => {
        let { covers, uri, uploadType } = this.state;
        this.imgs = [];
        images.map(image => {
          //optmistic update
          covers.push(image.path);
          console.log("地址", covers);
          this.setState({
            waitingVisible: true
          });
          this.startUploadImage(image.path);
        });
        this.setState({
          covers
        });
      },
      error => {
        console.log(error);
        add;
      }
    );
  };

  startUploadImage = imagePath => {
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
    console.log("config", config);
    fetch(Config.ServerRoot + "/api/image/save?api_token=" + token, config)
      .then(response => {
        console.log("response", response);
        return response.text();
      })
      .then(photo => {
        this.image_urls.push(photo);
        console.log("this.image_urls", this.image_urls);
        this.setState({
          ok: this.image_urls.length == this.state.covers.length
        });
        if (this.state.ok) {
          this.setState({
            waitingVisible: false
          });
        }
      })
      .catch(err => {
        this.toast("出错啦，请检查网络是否正常");
        this.setState({
          waitingVisible: false
        });
        console.log("网络错误".err);
      });
  };

  handleProgress = throttle(progress => {
    this.setState({ progress });
  }, 200);

  startUploadVideo = opts => {
    let _this = this;
    uploader.getFileInfo(opts.path).then(metadata => {
      const options = Object.assign(
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": metadata.mimeType
          }
        },
        opts
      );
      console.log("metadata:", metadata);
      let uploadtype = metadata.mimeType.indexOf("image");
      this.setState({
        uploadType: uploadtype
      });

      let __this = _this;
      uploader
        .startUpload(options) //上传
        .then(uploadId => {
          // console.log(`Upload started with options: ${JSON.stringify(options)}`);
          this.setState({ uploadId, progress: 0, completed: false }); //获取上传ID,进度归０,上传未完成
          uploader.addListener("progress", uploadId, data => {
            this.handleProgress(+parseInt(data.progress)); //上传进度
            console.log(`Progress: ${data.progress}%`);
          });
          uploader.addListener("error", uploadId, data => {
            console.log(`Error: ${data.error}%`);
          });
          uploader.addListener("completed", uploadId, data => {
            this.setState({
              completed: true
            });
            //上传完成,
            console.log("上传完成 data:", data);
            console.log(data.fileId); //数据库里的 vod fileid
            console.log(data.videoUrl); //云上的视频url

            let ___this = __this;
            const { token } = __this.props.user;
            fetch(Config.ServerRoot + "/api/video/save?from=qcvod&api_token=" + token, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                fileId: data.fileId,
                videoUrl: data.videoUrl
              })
            })
              .then(response => response.json())
              .then(video => {
                console.log("video:", video);
                ___this.setState({
                  video_id: video.id
                });
              });
          });
        })
        .catch(err => {
          this.setState({ uploadId: null, progress: null });
        });
    });
  };

  removeMedia = i => {
    let { uploadType, video_id, covers } = this.state;
    covers.splice(i, 1);
    this.setState({ covers });
    if (uploadType > 0) {
      this.image_urls.splice(i, 1);
    } else {
      this.setState({ video_id: null });
    }
  };

  toast(message = "内容不能为空哦~") {
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
  connect(store => ({ user: store.users.user, login: store.users.login })),
  graphql(createPostMutation, { name: "createPost" })
)(CreatePostScreen);
