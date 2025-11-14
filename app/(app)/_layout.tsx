import HeaderBackground from "@/components/HeaderBackground";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { colours } from "@/theme/colours";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <PlayerProvider>
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
          headerBackground: HeaderBackground,
          headerTintColor: colours.charcoal,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="player/[id]" options={{ title: "" }} />
      </Stack>
    </PlayerProvider>
  );
}
