import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Routes, StackNavigationProps } from "./routes/Navigation";
import { Button } from "./components";

const styles = StyleSheet.create({});

const About = ({ navigation }: StackNavigationProps<Routes, "About">) => {
  return (
    <View>
      <Text>About page</Text>
      <Button
        label="Retour"
        variant="transparent"
        onPress={() => navigation.navigate("Slider")}
      />
    </View>
  );
};

export default About;
