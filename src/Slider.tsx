import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import { interpolateColor, useScrollHandler } from "react-native-redash";
import Animated, {
  multiply,
  divide,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Audio } from "expo-av";

import Slide, { SLIDE_HEIGHT } from "./Slide";

import Subslide from "./Subslide";
import Dot from "./Dot";

import { slides } from "./store";
import { theme, IconButton } from "./components";

const { width } = Dimensions.get("window");

const soundObject = new Audio.Sound();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  navigation: {
    ...StyleSheet.absoluteFillObject,
    height: 175,
    width: width / 1.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Slider = () => {
  const [playingStatus, setPlayingStatus] = useState("stop");
  const [disabled, setDisabled] = useState(true);

  const scroll = useRef<Animated.ScrollView>(null);

  const { scrollHandler, x } = useScrollHandler();

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [
              (index - 0.5) * width,
              index * width,
              (index + 0.5) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View key={index} style={[styles.underlay, { opacity }]}>
              <Image
                source={picture.src}
                style={{
                  width: width,
                  height: width,
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
          onScrollEndDrag={async () => {
            try {
              if (playingStatus === "playing") {
                await soundObject.stopAsync();
                await soundObject.unloadAsync();
                setPlayingStatus("stop");
                setDisabled(true);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {slides.map(({ title }, index) => (
            <Slide
              key={index}
              {...{ title }}
              active={disabled}
              start={async () => {
                try {
                  const source = slides[index].sound;
                  await soundObject.loadAsync(source);
                  setPlayingStatus("playing");
                  setDisabled(false);
                  await soundObject
                    .playAsync()
                    .then(async (playbackStatus) => {
                      setTimeout(() => {
                        soundObject.unloadAsync();
                        setPlayingStatus("stop");
                        setDisabled(true);
                      }, playbackStatus.durationMillis);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } catch (error) {
                  console.log(error);
                }
              }}
              stop={async () => {
                try {
                  if (playingStatus === "playing") {
                    await soundObject.stopAsync();
                    await soundObject.unloadAsync();
                    setPlayingStatus("stop");
                    setDisabled(true);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.navigation}>
        <IconButton
          icon="question"
          variant="primary"
          size={18}
          onPress={() => alert("About button clicked")}
        />
      </View>
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
                next={async () => {
                  try {
                    if (scroll.current) {
                      scroll.current.getNode().scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                    if (playingStatus === "playing") {
                      await soundObject.stopAsync();
                      await soundObject.unloadAsync();
                      setPlayingStatus("stop");
                      setDisabled(true);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
                previous={async () => {
                  try {
                    if (scroll.current) {
                      scroll.current.getNode().scrollTo({
                        x: width * (index - 1),
                        animated: true,
                      });
                    }
                    if (playingStatus === "playing") {
                      await soundObject.stopAsync();
                      await soundObject.unloadAsync();
                      setPlayingStatus("stop");
                      setDisabled(true);
                    }
                  } catch (error) {
                    console.log(error);
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
