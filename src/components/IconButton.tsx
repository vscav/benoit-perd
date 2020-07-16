import React from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./Theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

interface IconButtonProps {
  icon: string;
  variant: "default" | "primary";
  fill: boolean;
  height: number;
  size: number;
  active?: boolean;
  onPress: () => void;
}

const IconButton = ({
  icon,
  variant,
  fill,
  height,
  size,
  active,
  onPress,
}: IconButtonProps) => {
  const theme = useTheme<Theme>();
  let backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.text;
  backgroundColor = active ? theme.colors.disabled : backgroundColor;
  backgroundColor = fill ? backgroundColor : "transparent";
  const color = variant === "primary" ? theme.colors.white : theme.colors.white;
  const borderWidth = backgroundColor === "transparent" ? 3 : 0;
  const borderColor = theme.colors.white;
  const width = height;
  const borderRadius = width / 2;
  return active ? (
    <View
      style={[
        styles.container,
        {
          height,
          width,
          borderRadius,
          backgroundColor,
          borderWidth,
          borderColor,
        },
      ]}
    >
      <FontAwesome name={icon} size={size} color={color} />
    </View>
  ) : (
    <RectButton
      style={[
        styles.container,
        {
          height,
          width,
          borderRadius,
          backgroundColor,
          borderWidth,
          borderColor,
        },
      ]}
      {...{ onPress }}
    >
      <FontAwesome name={icon} size={size} color={color} />
    </RectButton>
  );
};

IconButton.defaultProps = { variant: "default" };

export default IconButton;
