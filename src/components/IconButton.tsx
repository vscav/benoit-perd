import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./Theme";

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface IconButtonProps {
  icon: string;
  variant: "default" | "primary";
  size: number;
  onPress: () => void;
}

const IconButton = ({ icon, variant, size, onPress }: IconButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.text;
  const color = variant === "primary" ? theme.colors.white : theme.colors.white;
  return (
    <RectButton style={[styles.button, { backgroundColor }]} {...{ onPress }}>
      <FontAwesome name={icon} size={size} color={color} />
    </RectButton>
  );
};

IconButton.defaultProps = { variant: "default" };

export default IconButton;
