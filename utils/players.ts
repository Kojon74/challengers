import { Player } from "@/types/player";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const userDocToPlayer = (
  userDoc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): Player => {
  return { ...(userDoc.data() as Omit<Player, "id">), id: userDoc.id };
};
