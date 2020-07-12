import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
});

interface SlideProps {
  label: string;
  right?: boolean;
}

const Slide = ({ label, right }: SlideProps) => {
  return (
    <View style={{ width }}>
      <Text>{label}</Text>
    </View>
  );
};

export default Slide;
