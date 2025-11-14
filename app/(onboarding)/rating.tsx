import { StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import { colours } from "@/theme/colours";
import { Picker } from "@react-native-picker/picker";
import { useOnboarding } from "@/contexts/OnboardingContext";

const ratings = [
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
  "5.5",
  "6.0+",
];

export default function LevelSelection() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    router.push("/(onboarding)/location");
  };

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Heading>What's your tennis rating?</Heading>
        <BodyText>
          Select your rating based on the Play Tennis Self-Rating Guide.
        </BodyText>
        <Picker
          selectedValue={data.rating}
          onValueChange={(itemValue) => updateData({ rating: itemValue })}
        >
          {Object.entries(ratings).map(([key, value]) => (
            <Picker.Item key={key} label={value} value={key} />
          ))}
        </Picker>
        <Link href="/(onboarding)/rating-modal" style={styles.guideToggleText}>
          Show Rating Guide
        </Link>
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  guideToggleText: {
    fontSize: 16,
    color: colours.heritageGold,
    fontWeight: "600",
  },
});
