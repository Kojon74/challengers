import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useOnboarding } from "@/contexts/OnboardingContext";

async function fetchNeighbourhood(lat: number, lon: number) {
  const results = await reverseGeocodeAsync({ latitude: lat, longitude: lon });
  if (results.length > 0) {
    const place = results[0];
    return (
      place.district || place.city || place.subregion || place.region || ""
    );
  }
  return "";
}

export default function LocationSelection() {
  const { updateData, completeOnboarding } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrentLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    const location = await getCurrentPositionAsync({});
    const neighbourhood = await fetchNeighbourhood(
      location.coords.latitude,
      location.coords.longitude
    );
    updateData({ location: { ...location, neighbourhood } });
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await completeOnboarding();
      // Navigation will happen automatically via the protected route logic in app/_layout.tsx
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      // Could show an error message to the user here
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Heading>Enable Location Services</Heading>
        <BodyText>
          Allow location access to connect with players in your area. Your
          location data is kept private and never shared.
        </BodyText>
        <Button title="Enable location" onPress={getCurrentLocation} />
      </View>
      <Button title="Continue" onPress={handleComplete} disabled={isLoading} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingVertical: 40,
  },
});
