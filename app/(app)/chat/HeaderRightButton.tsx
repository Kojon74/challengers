import { colours } from "@/theme/colours";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity } from "react-native";

const HeaderRightButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontAwesome name="info" size={20} color={colours.white} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colours.wimbledonGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
