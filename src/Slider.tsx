import React, { useRef } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from "react-native-redash";
import Animated, { multiply, divide } from "react-native-reanimated";

import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";

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
    backgroundColor: "#fff",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const slides = [
  {
    title: "#*!?",
    subtitle: "Terre battue dans les chaussettes",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus.",
    color: "#f89e4c",
    picture: require("../assets/1.png"),
  },
  {
    title: "@&!*",
    subtitle: "Soleil dans les yeux",
    description:
      "Donec porttitor ligula id condimentum imperdiet. Nullam consequat molestie risus in rutrum.",
    color: "#f46e38",
    picture: require("../assets/2.png"),
  },
  {
    title: "**!@",
    subtitle: "Spectateur bavard",
    description:
      "Proin ut turpis a orci ultricies dictum. Nunc posuere libero quis diam euismod, eu aliquam risus egestas.",
    color: "#f04647",
    picture: require("../assets/3.png"),
  },
  {
    title: "@$*!#",
    subtitle: "Faux rebond",
    description:
      "Morbi sem erat, pretium vel fermentum quis, tincidunt sit amet neque.",
    color: "#582841",
    picture: require("../assets/4.png"),
  },
];

const Slider = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title, picture }} />
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
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {slides.map(({ subtitle, description }, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  }
                }}
                last={index === slides.length - 1}
                {...{ subtitle, description }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Slider;
