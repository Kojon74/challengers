import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colours } from "@/theme/colours";

type ButtonType = "primary" | "secondary";
type Props = {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  disabled?: boolean;
};

const Button = ({
  title,
  onPress,
  type = "primary",
  disabled = false,
}: Props) => {
  const getButtonStyle = () => {
    switch (type) {
      case "primary":
        return styles.primaryButton;
      case "secondary":
        return styles.secondaryButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.text, getTextStyle(), disabled && styles.disabledText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: colours.heritageGold,
  },
  primaryText: {
    color: colours.linenWhite,
  },
  secondaryButton: {
    backgroundColor: colours.linenWhite,
  },
  secondaryText: {
    color: colours.charcoal,
  },
  disabledButton: {
    backgroundColor: colours.lightGray,
    opacity: 0.6,
  },
  disabledText: {
    color: colours.white,
  },
});
