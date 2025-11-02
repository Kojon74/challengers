import { use, createContext, type PropsWithChildren, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => null,
  user: null,
  isLoading: false,
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

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setSession(user.uid);
      } else {
        // User is signed out
        setSession(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await auth().signInWithEmailAndPassword(email, password);
        },
        signUp: async (email: string, password: string) => {
          await auth().createUserWithEmailAndPassword(email, password);
        },
        signOut: () => {
          auth().signOut();
        },
        user: session ? auth().currentUser : null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
