import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { Button, IconButton, Text } from "./components";

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = 0.61 * height;
export const BORDER_RADIUS = 75;

const styles = StyleSheet.create({
  container: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: BORDER_RADIUS,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width / 2,
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});

interface SlideProps {
  title: string;
  picture: number;
  start: () => void;
  stop: () => void;
}

const Slide = ({ title, picture, start, stop }: SlideProps) => {
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: -width / 2 + 50 },
    { rotate: "90deg" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={[styles.titleContainer, { transform }]}>
        <Text variant="hero">{title}</Text>
      </View>
      <View style={styles.overlay}>
        <View style={styles.controlsContainer}>
          <Button label="Écouter" variant="primary" onPress={start} />
          <IconButton icon="stop" variant="primary" size={14} onPress={stop} />
        </View>
      </View>
    </View>
  );
};

export default Slide;
