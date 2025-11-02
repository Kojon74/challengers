import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import BodyText from "@/components/typography/BodyText";
import ScreenContainer from "@/components/ScreenContainer";
import TextInput from "@/components/TextInput";
import { useSession } from "@/ctx";

const EmailAuth = () => {
  const { mode } = useLocalSearchParams<{ mode: "signup" | "login" }>();
  const { signIn, signUp } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      if (mode === "signup") {
        await signUp(email, password);
      } else if (mode === "login") {
        await signIn(email, password);
      }
      // Navigate to the app after successful authentication
      router.replace("/(app)/(tabs)");
    } catch (error) {
      const firebaseError = error as FirebaseAuthTypes.NativeFirebaseAuthError;

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters");
          break;
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        default:
          setError(firebaseError.message);
      }
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View>
        {error && <BodyText variant="error">{error}</BodyText>}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScreenContainer>
  );
};

export default EmailAuth;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
});
