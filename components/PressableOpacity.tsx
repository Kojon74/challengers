import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";

const PressableOpacity = ({ style, ...props }: PressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [style, pressed && { opacity: 0.2 }]}
      {...props}
    ></Pressable>
  );
};

export default PressableOpacity;
