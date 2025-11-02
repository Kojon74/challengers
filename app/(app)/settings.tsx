import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BodyText from "@/components/typography/BodyText";
import { colours } from "@/theme/colours";

const Settings = () => {
  return (
    <ScreenContainer>
      <TouchableOpacity style={styles.button}>
        <FontAwesome
          size={28}
          name="sign-out"
          style={styles.icon}
          color={colours.error}
        />
        <BodyText style={{ color: colours.error }}>Sign out</BodyText>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  icon: { marginHorizontal: 10 },
});
