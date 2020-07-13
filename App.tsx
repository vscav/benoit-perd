import React, { useEffect, useState } from "react";
import { View, StyleSheet, MaskedViewIOS, Animated } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@shopify/restyle";

import Slider from "./src/Slider";
import { LoadAssets, theme } from "./src/components";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Slider" component={Slider} />
    </AppStack.Navigator>
  );
};

export default function App() {
  const [loadingProgress] = useState(new Animated.Value(0));
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 3000,
    }).start(() => {
      setAnimationDone(true);
    });
  });

  const colorLayer = animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#fdcb6e" }]} />
  );
  const whiteLayer = animationDone ? null : (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.text }]}
    />
  );
  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 15, 100],
          outputRange: [0.1, 0.06, 16],
        }),
      },
    ],
  };
  const opacity = {
    opacity: loadingProgress.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    }),
  };
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <View style={{ flex: 1 }}>
          {colorLayer}
          <MaskedViewIOS
            style={{ flex: 1 }}
            maskElement={
              <View style={styles.centered}>
                <Animated.Image
                  source={require("./assets/logo.png")}
                  style={[{ width: 1000 }, imageScale]}
                  resizeMode="contain"
                ></Animated.Image>
              </View>
            }
          >
            {whiteLayer}
            <Animated.View style={[opacity, styles.container]}>
              <AppNavigator />
            </Animated.View>
          </MaskedViewIOS>
        </View>
      </LoadAssets>
    </ThemeProvider>
  );
}
