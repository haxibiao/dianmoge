import React from "react";
import ReactNative from "react-native";
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableHighlight,
  Image,
  Platform
} from "react-native";

import Screen from "../Screen";
import UploadMedia from "./UploadMedia";
import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import { Iconfont } from "../../utils/Fonts";
import { Header } from "../../components/Header";
import MediaModal from "../../components/Modal/MediaModal";
import DialogSelected from '../../components/Pure/AlertSelected';


import Upload from "react-native-background-upload";
import ImagePicker from "react-native-image-crop-picker";
import { throttle } from "lodash";

import { connect } from "react-redux";
import actions from "../../store/actions";
import { draftsQuery } from "../../graphql/user.graphql";
import { articleContentQuery, createdArticleMutation, editArticleMutation } from "../../graphql/article.graphql";
import { withApollo, compose, graphql, Query } from "react-apollo";
import { Mutation } from "react-apollo";


const selectedArr = ["图片", "视频"];

class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.showAlertSelected = this.showAlertSelected.bind(this);
    this.callbackSelected = this.callbackSelected.bind(this);
    this.state = {
      uploadId: null,
      progress: null,
      completed: false,
      covers: [],
      routeName: "　",
      selectMedia: false,
      uri:'',
      isImagePickerShowing: false,
      retype:''
    };
  }

  render() {
    let { covers, routeName, selectMedia, completed, progress, uploadId,retype,uri } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={navigation}
          routeName={routeName}
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
                发表
              </Text>
            </TouchableOpacity>
          }
        />
        <UploadMedia
          navigation={navigation}
          selectMedia={selectMedia}
          covers={covers}
          showAlertSelected={() => {this.showAlertSelected()}}
          progress={progress}
          cancelUpload={this.cancelUpload}
          completed={completed}
          uploadId={uploadId}
          retype={retype}
          uri={uri}
          onPressPhotoUpload={() =>
            this.onPressPhotoUpload({
              url: "https://www.ainicheng.com/video",
              field: "uploaded_media",
              type: "multipart"
            })
          }
        />
        <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} /> 
      </View>
    );
  }
 
   onPressVideoUpload=options=> {    //打开视频库
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "video"
    }).then(image => {
          let { covers ,uri}=this.state;
          covers.push(image.path); //图片资源
          this.setState({
            covers
          });
          console.log(image.mime);
          if (Platform.OS === "android") {
              this.startUpload(Object.assign({ path:image.path.substr(7)}, options));
          }else{
              this.startUpload(Object.assign({ path:image.path}, options));
          }
          this.setState(prevState => ({ selectMedia: !prevState.selectMedia }));
      },
      error => {
        console.log(error);
        add;
      }
    );
  };


  onPressPhotoUpload=options=> {    //打开相册
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
    }).then(
      images => {
        let { covers,uri,retype } = this.state;
        images.map(image => {
          //optmistic update
          covers.push(image.path);
          //upload ..
          if (Platform.OS === "android") {
              this.setState({
                  uri:image.path.substr(7)
              });
          }else{
              this.setState({
                 uri:image.path
              });
          }
        });
        this.setState({
          covers
        });
        console.log(this.state.uri);
        console.log(this.state.retype);

        this.startUpload(Object.assign({ path:this.state.uri}, options));
      },
      error => {
        console.log(error);
        add;
      }
    );
  };


  handleProgress = throttle(progress => {
    this.setState({ progress });
  }, 200);

  startUpload = opts => {
    Upload.getFileInfo(opts.path).then(metadata => {
      const options = Object.assign(
        {
          method: "POST",
          headers: {
            "content-type": metadata.mimeType, // server requires a content-type header
          }
        },
        opts
      );
      let uploadtype= metadata.mimeType.indexOf("image");
      this.setState({
             retype:uploadtype
          });

      Upload.startUpload(options)    //上传
        .then(uploadId => {
          console.log(`Upload started with options: ${JSON.stringify(options)}`);
          this.setState({ uploadId, progress: 0, completed: false }); //获取上传ID,进度归０,上传未完成
          Upload.addListener("progress", uploadId, data => {
            this.handleProgress(+data.progress); //上传进度
            console.log(`Progress: ${data.progress}%`);
          });
          Upload.addListener("error", uploadId, data => {
            console.log(`Error: ${data.error}%`);
          });
          Upload.addListener("completed", uploadId, data => {
            this.setState({
              completed: true
            }); //上传完成
          });
        })
        .catch((err)=> {
          this.setState({ uploadId: null, progress: null });
          console.log("上传错误!", err);
        });
    });
  };

  cancelUpload = () => {
    let { covers } = this.state;
    if (!this.state.uploadId) {
      return; //没有上传的文件ＩＤ
    }

    Upload.cancelUpload(this.state.uploadId).then(props => {
      console.log(`Upload ${this.state.uploadId} canceled`);
      this.setState({ uploadId: null, progress: null }); //取消上传,移除上传文件的ID与进度
      covers.pop();
      this.setState({
        covers
      }); //取消上传时移除数组的最后一个
    });
  };

  showAlertSelected(){
        this.dialog.show("请选择上传内容", selectedArr, '#333333', this.callbackSelected);
    }
    // 回调
    callbackSelected(i){
        switch (i){
            case 0: //图库
                this.onPressPhotoUpload({
                  url: "https://www.ainicheng.com/video",
                  field: "uploaded_media",
                  type: "multipart"
                });
                break;
            case 1: // 视频库
                this.onPressVideoUpload({
                  url: "https://www.ainicheng.com/video",
                  field: "uploaded_media",
                  type: "multipart"
                });
                break;
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skinColor,
    paddingTop: 24
  }
});
export default connect(store => store)(CreatePostScreen);
