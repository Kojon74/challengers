import { StyleSheet, Text } from "react-native";
import { PropsWithChildren } from "react";
import { colours } from "@/theme/colours";

const Heading = ({ children }: PropsWithChildren) => {
  return <Text style={styles.text}>{children}</Text>;
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
