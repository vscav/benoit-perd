import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { Button, IconButton, Text, theme } from "./components";

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = 0.61 * height;

const styles = StyleSheet.create({
  container: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: theme.borderRadii.xl,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width / 1.8,
  },
  control: {
    margin: 5,
  },
});

interface SlideProps {
  title: string;
  active: boolean;
  start: () => void;
  stop: () => void;
}

const Slide = ({ title, active, start, stop }: SlideProps) => {
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: -width / 2 + 50 },
    { rotate: "90deg" },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text variant="hero">{title}</Text>
      </View>
      <View style={styles.overlay}>
        <View style={styles.controlsContainer}>
          <View style={styles.control}>
            <Button
              label="Écouter"
              variant="primary"
              onPress={start}
              active={!active}
            />
          </View>
          <View style={styles.control}>
            <IconButton
              icon="stop"
              variant="primary"
              fill={true}
              height={50}
              size={14}
              onPress={stop}
              active={active}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Slide;
