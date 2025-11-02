import { StyleSheet } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import Heading from "@/components/typography/Heading";
import ScreenContainer from "@/components/ScreenContainer";
import ImageBackground from "@/components/ImageBackground";

export default function Signup() {
  const router = useRouter();

  return (
    <ImageBackground source={require("@/assets/images/signup.jpg")}>
      <ScreenContainer style={styles.container}>
        <Heading>Welcome to the Club</Heading>
        <Button
          title="Sign up with Email"
          onPress={() => router.navigate("/email-auth?mode=signup")}
          type="secondary"
        />
      </ScreenContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
});
