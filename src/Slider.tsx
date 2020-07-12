import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Slide from "./Slide";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: 0.61 * height,
  },
  footer: {
    flex: 1,
  },
});

const Slider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <Slide label="#*!?" />
          <Slide label="@&!*" right />
          <Slide label="**!@" />
          <Slide label="@$*!#" right />
        </ScrollView>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default Slider;
