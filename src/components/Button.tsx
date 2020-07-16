import React from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme, Text } from "./Theme";

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 145,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ButtonProps {
  label: string;
  variant: "default" | "primary" | "transparent";
  active?: boolean;
  onPress: () => void;
}

const Button = ({ variant, label, active, onPress }: ButtonProps) => {
  const theme = useTheme<Theme>();
  let backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "transparent"
      ? "transparent"
      : theme.colors.grey;
  backgroundColor = active ? theme.colors.disabled : backgroundColor;
  const color =
    variant === "primary" ? theme.colors.white : theme.colors.button;
  return active ? (
    <View style={[styles.container, { backgroundColor }]}>
      <Text variant="button" style={{ color }}>
        {label}
      </Text>
    </View>
  ) : (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text variant="button" style={{ color }}>
        {label}
      </Text>
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;
