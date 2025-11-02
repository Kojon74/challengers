import { SafeAreaView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

type Props = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

const ScreenContainer = ({ style, children }: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20 },
});
