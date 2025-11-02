import {
  ImageBackground as RNImageBackground,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React, { ReactNode } from "react";

type Props = { source: ImageSourcePropType; children: ReactNode };

const ImageBackground = ({ source, children }: Props) => {
  return (
    <RNImageBackground
      source={source}
      style={styles.background}
      imageStyle={styles.image}
    >
      {children}
    </RNImageBackground>
  );
};

export default ImageBackground;

const styles = StyleSheet.create({
  background: { flex: 1 },
  image: { opacity: 0.7 },
});
