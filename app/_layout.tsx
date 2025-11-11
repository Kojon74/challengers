import { Stack } from "expo-router";
import { colours } from "@/theme/colours";
import { SessionProvider, useSession } from "@/contexts/ctx";
import { SplashScreenController } from "@/app/splash";
import HeaderBackground from "@/components/HeaderBackground";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootLayoutNav />
    </SessionProvider>
  );
}

function RootLayoutNav() {
  const { user, isOnboardingComplete, isLoading, isLoadingOnboarding } =
    useSession();

  // Show nothing while loading
  if (isLoading || isLoadingOnboarding) {
    return null;
  }

  const isAuthenticated = !!user;
  const shouldShowOnboarding = isAuthenticated && !isOnboardingComplete;
  const shouldShowApp = isAuthenticated && isOnboardingComplete;

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: colours.charcoal,
        headerBackground: HeaderBackground,
      }}
    >
      {/* Protected: Only show app if authenticated AND onboarding complete */}
      <Stack.Protected guard={shouldShowApp}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Protected: Only show onboarding if authenticated BUT onboarding not complete */}
      <Stack.Protected guard={shouldShowOnboarding}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Protected: Only show auth screens if NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
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
