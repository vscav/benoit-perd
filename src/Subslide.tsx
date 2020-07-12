import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, Text } from "./components";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
  subtitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    marginBottom: 40,
    textAlign: "center",
  },
  controlsContainer: {
    width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

interface SubslideProps {
  subtitle: string;
  description: string;
  first?: boolean;
  last?: boolean;
  //onPress: () => void;
  previous: () => void;
  next: () => void;
}

const Subslide = ({
  subtitle,
  description,
  first,
  last,
  //onPress,
  previous,
  next,
}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.subtitle}>
        {subtitle}
      </Text>
      <Text variant="body" style={styles.description}>
        {description}
      </Text>
      <View style={styles.controlsContainer}>
        {!first ? (
          // <Button label="Précédent" variant="default" {...{ onPress }} />
          <Button label="Précédent" variant="default" onPress={previous} />
        ) : null}
        {!last ? (
          // <Button label="Suivant" variant="default" {...{ onPress }} />
          <Button label="Suivant" variant="default" onPress={next} />
        ) : null}
      </View>
    </View>
  );
};

export default Subslide;
