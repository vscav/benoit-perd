import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./routes/routes";

import About from "./About";
import Slider from "./Slider";

import { assets as sliderAssets } from "./store";

export const assets = [...sliderAssets];

const AppStack = createStackNavigator<Routes>();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Slider" component={Slider} />
      <AppStack.Screen name="About" component={About} />
    </AppStack.Navigator>
  );
};
