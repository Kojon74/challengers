import { useState } from "react";
import { SafeAreaView, StyleSheet, View, TextInput } from "react-native";
import { Text } from "../components/Themed";
import { router } from "expo-router";
import PressableOpacity from "../components/PressableOpacity";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signup = async () => {
    setIsLoading(true);
    setErrorMessage(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        createdAt: new Date(),
      });

      router.replace("/");
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.welcomeMsg, { color: "#57A147" }]}>
        Ready to rally?
      </Text>
      <Text style={styles.welcomeMsg}>Sign up to meet your next match</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#BBBBBB"
        style={[styles.inputBox, { backgroundColor: "#666666" }]}
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#BBBBBB"
        style={[styles.inputBox, { backgroundColor: "#666666" }]}
      ></TextInput>
      {errorMessage && <Text style={styles.errorMes}>Invalid details</Text>}
      <PressableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.btnText}>Sign up</Text>
      </PressableOpacity>
      <View style={styles.toRegister}>
        <Text style={{ color: "white" }}>Already have an account? </Text>
        <PressableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.register}>Login</Text>
        </PressableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 26 },
  imageCont: { alignItems: "center" },
  image: { width: 300, height: 300 },
  welcomeMsg: {
    color: "white",
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 20,
    paddingRight: 20,
  },
  inputBox: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginBottom: 8,
    fontSize: 18,
  },
  errorMes: { marginTop: 10, alignContent: "center", color: "#57A147" },
  button: {
    marginTop: "auto",
    backgroundColor: "#57A147",
    borderRadius: 10,
    paddingVertical: 13,
  },
  btnText: { color: "white", textAlign: "center", fontSize: 18 },
  toRegister: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
  register: { color: "#57A147" },
});
