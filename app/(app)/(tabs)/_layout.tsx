import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { colours } from "@/theme/colours";
import HeaderBackground from "@/components/HeaderBackground";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        tabBarActiveTintColor: colours.wimbledonGreen,
        headerBackground: HeaderBackground,
      }}
    >
      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="users" color={color} />
          ),
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: "Player name",
          },
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.navigate("/settings")}>
              <FontAwesome size={28} name="cog" style={styles.settingsIcon} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({ settingsIcon: { paddingHorizontal: 20 } });
