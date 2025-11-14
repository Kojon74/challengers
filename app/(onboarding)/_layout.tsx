import HeaderBackground from "@/components/HeaderBackground";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { colours } from "@/theme/colours";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
          headerBackground: HeaderBackground,
          headerTintColor: colours.charcoal,
        }}
      >
        <Stack.Screen
          name="name"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="rating"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="location"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="rating-modal"
          options={{
            presentation: "modal",
            title: "Self Rating Guide",
          }}
        />
      </Stack>
    </OnboardingProvider>
  );
}
