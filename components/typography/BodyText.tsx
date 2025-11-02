import { StyleSheet, Text, TextStyle } from "react-native";
import { PropsWithChildren } from "react";
import { colours } from "@/theme/colours";

type Props = PropsWithChildren<{
  variant?: "default" | "error";
  style?: TextStyle;
}>;

const BodyText = ({ children, variant = "default", style }: Props) => {
  if (!children) return null;

  const getTextStyle = () => {
    switch (variant) {
      case "error":
        return styles.errorText;
      case "default":
      default:
        return styles.defaultText;
    }
  };

  return <Text style={[styles.text, getTextStyle(), style]}>{children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ui-serif",
    fontSize: 16,
  },
  defaultText: {
    color: colours.charcoal,
  },
  errorText: {
    color: colours.error,
  },
});
