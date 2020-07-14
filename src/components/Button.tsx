import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./Theme";

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 145,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});

interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  active: boolean;
  onPress: () => void;
}

const Button = ({ variant, label, active, onPress }: ButtonProps) => {
  const theme = useTheme<Theme>();
  let backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.text;
  backgroundColor = active ? theme.colors.disabled : backgroundColor;
  const color = variant === "primary" ? theme.colors.white : theme.colors.white;
  return active ? (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  ) : (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;
