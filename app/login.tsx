import { StyleSheet } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import ImageBackground from "@/components/ImageBackground";
import ScreenContainer from "@/components/ScreenContainer";
import Heading from "@/components/typography/Heading";

export default function Login() {
  const router = useRouter();

  return (
    <ImageBackground source={require("@/assets/images/login.jpg")}>
      <ScreenContainer style={styles.container}>
        <Heading>Welcome back</Heading>
        <Button
          title="Log in with Email"
          onPress={() => router.navigate("/email-auth?mode=login")}
          type="secondary"
        />
      </ScreenContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
});
