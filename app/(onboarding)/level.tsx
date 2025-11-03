import { StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import { colours } from "@/theme/colours";
import { Picker } from "@react-native-picker/picker";
import { useOnboarding } from "@/contexts/OnboardingContext";

const skillLevels = {
  "1.0": "1.0 - Just starting",
  "1.5": "1.5 - Can play but lacks consistency",
  "2.0": "2.0 - Basic rallies, inconsistent",
  "2.5": "2.5 - Consistent 10+ ball rallies",
  "3.0": "3.0 - Steady forehand and backhand",
  "3.5": "3.5 - Can move opponents around",
  "4.0": "4.0 - Strategic point development",
  "4.5": "4.5 - Beginning advanced player",
  "5.0": "5.0 - Competitive player",
  "5.5": "5.5 - Tournament ready",
  "6.0 - 7.0": "6.0 - 7.0 - Provincial/National level",
};

export default function LevelSelection() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    router.push("/(onboarding)/location");
  };

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Heading>What's your tennis skill level?</Heading>
        <BodyText>
          Select your level based on the Play Tennis Self-Rating Guide.
        </BodyText>
        <Picker
          selectedValue={data.skillLevel}
          onValueChange={(itemValue) => updateData({ skillLevel: itemValue })}
        >
          {Object.entries(skillLevels).map(([key, value]) => (
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
