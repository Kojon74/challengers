// contexts/OnboardingContext.tsx
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { LocationObject } from "expo-location";
import { doc, getFirestore, updateDoc } from "@react-native-firebase/firestore";
import { getAuth } from "@react-native-firebase/auth";
import { useSession } from "@/ctx";

interface OnboardingData {
  firstName?: string;
  lastName?: string;
  skillLevel?: string;
  location?: LocationObject;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  clearData: () => void;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

export function OnboardingProvider({ children }: PropsWithChildren) {
  const { setIsOnboardingComplete } = useSession();

  const [data, setData] = useState<OnboardingData>({ skillLevel: "1.0" });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const clearData = () => {
    setData({});
  };

  const completeOnboarding = async () => {
    await updateDoc(
      doc(getFirestore(), `users/${getAuth().currentUser?.uid}`),
      { onboardingComplete: true, ...data }
    );
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, clearData, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
