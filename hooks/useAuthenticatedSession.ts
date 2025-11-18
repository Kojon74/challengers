import { useSession } from "@/contexts/SessionContext";

const useAuthenticatedSession = () => {
  const session = useSession();

  if (!session.user || !session.userData) {
    throw new Error(
      "useAuthenticatedSession must be used within an authenticated context"
    );
  }

  return { ...session, user: session.user, userData: session.userData };
};

export default useAuthenticatedSession;
