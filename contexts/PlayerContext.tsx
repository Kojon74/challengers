import { PlayerType } from "@/types/user";
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
import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";

const PlayerContext = createContext<{ players: { [id: string]: PlayerType } }>({
  players: {},
});

export const PlayerProvider = ({ children }: PropsWithChildren) => {
  const { userData } = useAuthenticatedSession();
  const [players, setPlayers] = useState<{ [id: string]: PlayerType }>({});

  useEffect(() => {
    (async () => {
      const userDocs: FirebaseFirestoreTypes.QuerySnapshot = await getDocs(
        collection(getFirestore(), "users")
      );
      setPlayers(
        Object.fromEntries(
          userDocs.docs.map((doc) => [
            doc.id,
            {
              ...doc.data(),
              distance: getDistanceInKm(
                doc.data().location.coords.latitude,
                doc.data().location.coords.longitude,
                userData.location.coords.latitude,
                userData.location.coords.longitude
              ),
              id: doc.id,
            } as PlayerType,
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

export function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km

  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = R * c; // Distance in km

  if (distanceKm < 10) {
    return Math.round(distanceKm * 10) / 10; // nearest 0.1 km
  }

  return Math.round(distanceKm); // nearest whole km
}

export const usePlayers = () => useContext(PlayerContext);
