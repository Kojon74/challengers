import { StyleSheet, TouchableOpacity } from "react-native";
import ScreenContainer from "@/components/ScreenContainer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BodyText from "@/components/typography/BodyText";
import { colours } from "@/theme/colours";
import { useSession } from "@/contexts/ctx";

const Settings = () => {
  const { signOut } = useSession();
  return (
    <ScreenContainer>
      <TouchableOpacity style={styles.button} onPress={signOut}>
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
