import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { interpolateColor, useScrollHandler } from "react-native-redash";
import Animated, { multiply, divide } from "react-native-reanimated";
import { Audio } from "expo-av";

import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";

import { slides } from "./store";

const { width } = Dimensions.get("window");

const soundObject = new Audio.Sound();

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

const Slider = () => {
  const [playingStatus, setPlayingStatus] = useState("stop");
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
          // pinchGestureEnabled
          onScrollEndDrag={async () => {
            try {
              if (playingStatus === "playing") {
                await soundObject.stopAsync();
                await soundObject.unloadAsync();
                setPlayingStatus("stop");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide
              key={index}
              {...{ title, picture }}
              onPress={async () => {
                try {
                  if (playingStatus === "playing") {
                    await soundObject.stopAsync();
                    await soundObject.unloadAsync();
                    setPlayingStatus("stop");
                  } else {
                    let source = slides[index].sound;
                    await soundObject.loadAsync(source);
                    setPlayingStatus("playing");
                    await soundObject
                      .playAsync()
                      .then(async (playbackStatus) => {
                        setTimeout(() => {
                          soundObject.unloadAsync();
                          setPlayingStatus("stop");
                        }, playbackStatus.durationMillis);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            />
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
                next={() => {
                  if (scroll.current) {
                    scroll.current.getNode().scrollTo({
                      x: width * (index + 1),
                      animated: true,
                    });
                  }
                }}
                previous={() => {
                  if (scroll.current) {
                    scroll.current.getNode().scrollTo({
                      x: width * (index - 1),
                      animated: true,
                    });
                  }
                }}
                first={index === 0}
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
