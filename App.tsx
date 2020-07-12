import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Slider from "./src/Slider";
import { LoadAssets } from "./src/components";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AppStack = createStackNavigator();
const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Slider" component={Slider} />
    </AppStack.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AppNavigator />
    </LoadAssets>
  );
}
