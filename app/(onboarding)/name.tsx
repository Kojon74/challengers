import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function OnboardingStep1() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [error, setError] = useState<{ firstName?: string; lastName?: string }>(
    {}
  );

  const handleSubmit = () => {
    setError({});
    if (!data.firstName)
      setError((prev) => ({ ...prev, firstName: "Required" }));
    if (!data.lastName) setError((prev) => ({ ...prev, lastName: "Required" }));
    if (data.firstName && data.lastName) router.push("/(onboarding)/rating");
  };

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Heading>Welcome to Challengers!</Heading>
        <BodyText>
          We're excited to have you here. Let's get you set up with a few quick
          questions.
        </BodyText>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First name"
            value={data.firstName}
            onChangeText={(text) => updateData({ firstName: text })}
            error={error.firstName}
          />
          <TextInput
            placeholder="Last name"
            value={data.lastName}
            onChangeText={(text) => updateData({ lastName: text })}
            error={error.lastName}
          />
        </View>
      </View>
      <Button title="Continue" onPress={handleSubmit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  inputContainer: { marginVertical: 10 },
});
