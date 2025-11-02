import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { colours } from "@/theme/colours";
import { SessionProvider, useSession } from "@/ctx";
import { SplashScreenController } from "@/splash";
import HeaderBackground from "@/components/HeaderBackground";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <SplashScreenController />
      <RootLayoutNav />
    </SessionProvider>
  );
}

function RootLayoutNav() {
  const { user } = useSession();

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: colours.charcoal,
        headerBackground: HeaderBackground,
      }}
    >
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen
          name="index"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="signup"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="email-auth"
          options={{ title: "Sign up with Email" }}
        />
      </Stack.Protected>
    </Stack>
  );
}
