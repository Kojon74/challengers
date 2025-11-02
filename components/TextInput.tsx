import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import { colours } from "@/theme/colours";

type Props = TextInputProps & {
  variant?: "primary" | "secondary";
};

const TextInput = ({ style, ...props }: Props) => {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor={colours.lightGray}
      {...props}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: colours.linenWhite,
    borderColor: colours.lightGray,
    color: colours.charcoal,
  },
});
