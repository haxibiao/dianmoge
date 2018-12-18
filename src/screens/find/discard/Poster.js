import React, { Component } from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
import Carousel, { getInputRangeFromIndexes, Pagination } from "react-native-snap-carousel";
import SliderEntry, { sliderWidth, itemWidth } from "./SliderEntry";

// animation
function scrollInterpolator(index, carouselProps) {
  const range = [2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
}

function animatedStyles(index, animatedValue, carouselProps) {
  const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? "translateY" : "translateX";

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1, 2],
      outputRange: [1, 1, 0.75, 0.5],
      extrapolate: "clamp"
    }),
    transform: [
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0, 0, -sizeRef * 2, -sizeRef],
          extrapolate: "clamp"
        })
      }
    ]
  };
}

export default class Poster extends Component {
  _renderItem({ item, index }) {
    return <SliderEntry data={item} />;
  }

  render() {
    let { data } = this.props;
    return (
      <View style={styles.posterContainer}>
        <Carousel
          useScrollView
          enableSnap
          autoplay
          loop
          loopClonesPerSide={Math.floor(data.length / 2)}
          layout="default"
          data={data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          // containerCustomStyle={styles.slider}
          // contentContainerCustomStyle={styles.sliderContentContainer}
          // scrollInterpolator={scrollInterpolator}
          // slideInterpolatedStyle={animatedStyles}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  posterContainer: {
    paddingTop: 15,
    backgroundColor: "white"
  },
  slider: {
    overflow: "visible"
  },
  sliderContentContainer: {
    paddingVertical: 10
  }
});
