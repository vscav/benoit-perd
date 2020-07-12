import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
});

const slides = [
  { label: "#*!?", color: "#f89e4c" },
  { label: "@&!*", color: "#f46e38" },
  { label: "**!@", color: "#f04647" },
  { label: "@$*!#", color: "#582841" },
];

const Slider = () => {
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {slides.map(({ label }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ label }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        ></Animated.View>
        <View
          style={{ flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 75 }}
        ></View>
      </View>
    </View>
  );
};

export default Slider;
