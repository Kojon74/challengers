import {
  use,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import {
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getFirestore,
  setDoc,
} from "@react-native-firebase/firestore";
import { useStorageState } from "../hooks/useStorageState";
import { UserDocType } from "@/types/user";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  userData: UserDocType | null;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  isLoadingOnboarding: boolean;
  setIsOnboardingComplete: Dispatch<SetStateAction<boolean>>;
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => null,
  user: null,
  userData: null,
  isLoading: false,
  isOnboardingComplete: false,
  isLoadingOnboarding: false,
  setIsOnboardingComplete: () => {},
});

export const useSession = () => use(AuthContext);

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true);
  const [userData, setUserData] = useState<UserDocType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // User is signed in
        setSession(user.uid);
        const _userDocRef = doc(getFirestore(), "users", user.uid);
        try {
          const userDoc = await getDoc(_userDocRef);
          setUserData({ ...(userDoc.data() as UserDocType), id: userDoc.id });
          setIsOnboardingComplete(!!userDoc.get("onboardingComplete"));
          setIsLoadingOnboarding(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        // User is signed out
        setSession(null);
        setIsOnboardingComplete(false);
        setIsLoadingOnboarding(false);
      }
    });

    return unsubscribe;
  }, [setSession]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await signInWithEmailAndPassword(getAuth(), email, password);
        },
        signUp: async (email: string, password: string) => {
          const userCredential = await createUserWithEmailAndPassword(
            getAuth(),
            email,
            password
          );
          const userDocRef = doc(
            getFirestore(),
            "users",
            userCredential.user.uid
          );
          await setDoc(userDocRef, {});
        },
        signOut: () => {
          signOut(getAuth());
        },
        user: session ? getAuth().currentUser : null,
        userData,
        isLoading,
        isOnboardingComplete,
        isLoadingOnboarding,
        setIsOnboardingComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
