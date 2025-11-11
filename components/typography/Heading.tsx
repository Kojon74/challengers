import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { PropsWithChildren } from "react";
import { colours } from "@/theme/colours";

interface HeadingProps extends PropsWithChildren {
  style?: StyleProp<TextStyle>;
}

const Heading = ({ style, children }: HeadingProps) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default Heading;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ui-serif",
    fontSize: 28,
    fontWeight: "bold",
    color: colours.wimbledonGreen,
    marginTop: 32,
    marginBottom: 12,
  },
});
