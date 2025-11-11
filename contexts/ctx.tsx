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

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  userDoc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  isLoadingOnboarding: boolean;
  setIsOnboardingComplete: Dispatch<SetStateAction<boolean>>;
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => null,
  user: null,
  userDoc: null,
  isLoading: false,
  isOnboardingComplete: false,
  isLoadingOnboarding: false,
  setIsOnboardingComplete: () => {},
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true);
  const [userDocRef, setUserDocRef] =
    useState<
      FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
    >();
  const [userDoc, setUserDoc] =
    useState<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null>(
      null
    );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // User is signed in
        setSession(user.uid);
        const _userDocRef = doc(getFirestore(), "users", user.uid);
        try {
          const _userDoc = await getDoc(_userDocRef);
          setUserDoc(_userDoc);
          setIsOnboardingComplete(!!_userDoc.get("onboardingComplete"));
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
          const _userDocRef = doc(
            getFirestore(),
            "users",
            userCredential.user.uid
          );
          await setDoc(_userDocRef, {});
          setUserDocRef(_userDocRef);
        },
        signOut: () => {
          signOut(getAuth());
        },
        user: session ? getAuth().currentUser : null,
        userDoc,
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
