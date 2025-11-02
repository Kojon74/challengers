import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import ScreenContainer from "@/components/ScreenContainer";
import ImageBackground from "@/components/ImageBackground";

const LandingScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require("@/assets/images/landing.jpg")}>
      <ScreenContainer style={styles.container}>
        <View>
          <Heading>Find your next match</Heading>
          <BodyText>
            Connect with local players who match your level and schedule
          </BodyText>
        </View>
        <View>
          <Button title="Join now" onPress={() => router.navigate("/signup")} />
          <Button
            title="Log in"
            onPress={() => router.navigate("/login")}
            type="secondary"
          />
        </View>
      </ScreenContainer>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});
