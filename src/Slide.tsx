import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { Button, Text } from "./components";

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
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});

interface SlideProps {
  title: string;
  //right?: boolean;
  picture: number;
  play: () => void;
}

//const Slide = ({ title, right, picture }: SlideProps) => {
const Slide = ({ title, picture, play }: SlideProps) => {
  console.log("slide render");
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    //{ translateX: right ? width / 2 - 50 : -width / 2 + 50 },
    //{ rotate: right ? "-90deg" : "90deg" },
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
        <Button label="Écouter" variant="primary" onPress={play} />
      </View>
    </View>
  );
};

export default Slide;
