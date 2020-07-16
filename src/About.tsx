import React from "react";
import { View } from "react-native";
import { Routes, StackNavigationProps } from "./routes/Navigation";

import { Container, Button, Box } from "./components";

const About = ({ navigation }: StackNavigationProps<Routes, "About">) => {
  return (
    <Container
      footer={
        <Box alignItems="center">
          <Button
            label="Fermer"
            variant="primary"
            onPress={() => navigation.navigate("Slider")}
          />
        </Box>
      }
    >
      <View />
    </Container>
  );
};

export default About;
