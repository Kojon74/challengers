import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
} from "react-native";
import React from "react";
import { colours } from "@/theme/colours";

type Props = TextInputProps & {
  variant?: "primary" | "secondary";
  error?: string;
};

const TextInput = ({ style, error, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colours.lightGray}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: colours.linenWhite,
    borderColor: colours.lightGray,
    color: colours.charcoal,
  },
  inputError: {
    borderColor: colours.error,
  },
  errorText: {
    color: colours.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
