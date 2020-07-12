import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";
import Animated, { multiply } from "react-native-reanimated";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";

const BORDER_RADIUS = 75;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

const slides = [
  {
    title: "#*!?",
    subtitle: "Terre battue dans les chaussettes",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus et, aliquam felis.",
    color: "#f89e4c",
  },
  {
    title: "@&!*",
    subtitle: "Soleil dans les yeux",
    description:
      "Donec porttitor ligula id condimentum imperdiet. Nullam consequat molestie risus in rutrum.",
    color: "#f46e38",
  },
  {
    title: "**!@",
    subtitle: "Spectateur bavard",
    description:
      "Proin ut turpis a orci ultricies dictum. Nunc posuere libero quis diam euismod, eu aliquam risus egestas.",
    color: "#f04647",
  },
  {
    title: "@$*!#",
    subtitle: "Faux rebond",
    description:
      "Morbi sem erat, pretium vel fermentum quis, tincidunt sit amet neque.",
    color: "#582841",
  },
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
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            },
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              key={index}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Slider;
