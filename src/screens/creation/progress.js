import React, { Component } from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../constants";
import * as Progress from "react-native-progress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  circles: {
    alignItems: "center"
  },
  progress: {
    margin: 10
  },
  nocomplete: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  complete: {
    display: "none"
  }
});

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Progress Example</Text>
        <Progress.Bar style={styles.progress} progress={this.state.progress} indeterminate={this.state.indeterminate} />
        <View style={styles.circles}>
          <View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: "https://ainicheng.com/storage/img/71958.top.jpg" }} />
            <Progress.Circle
              style={this.state.progress >= 1 ? styles.complete : styles.nocomplete}
              size={100}
              progress={this.state.progress}
              indeterminate={this.state.indeterminate}
              color={Colors.themeColor}
              showsText={true}
            />
          </View>
          <Progress.Circle
            style={styles.progress}
            size={80}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            showsText={true}
          />
          <Image style={{ width: 100, height: 100 }} source={{ uri: "https://ainicheng.com/storage/img/71958.top.jpg" }} />
          <Progress.Pie style={styles.progress} progress={this.state.progress} indeterminate={this.state.indeterminate} />
          <Progress.Circle
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            direction="counter-clockwise"
          />
        </View>
        <View style={styles.circles}>
          <Progress.CircleSnail style={styles.progress} />
          <Progress.CircleSnail style={styles.progress} color={["#F44336", "#2196F3", "#009688"]} />
        </View>
      </View>
    );
  }
}
