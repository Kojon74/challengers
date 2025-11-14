import { Player } from "@/types/player";
import {
  collection,
  FirebaseFirestoreTypes,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const PlayerContext = createContext<{ players: { [id: string]: Player } }>({
  players: {},
});

export const PlayerProvider = ({ children }: PropsWithChildren) => {
  const [players, setPlayers] = useState<{ [id: string]: Player }>({});

  useEffect(() => {
    (async () => {
      const userDocs: FirebaseFirestoreTypes.QuerySnapshot = await getDocs(
        collection(getFirestore(), "users")
      );
      setPlayers(
        Object.fromEntries(
          userDocs.docs.map((doc) => [
            doc.id,
            { ...doc.data(), id: doc.id } as Player,
          ])
        )
      );
    })();
  }, []);

  return (
    <PlayerContext.Provider value={{ players }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => useContext(PlayerContext);
