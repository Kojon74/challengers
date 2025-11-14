import PlayerProfile from "@/components/PlayerProfile";
import { usePlayers } from "@/contexts/PlayerContext";
import { useLocalSearchParams } from "expo-router";

const Player = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { players } = usePlayers();

  return <PlayerProfile player={players[id]} />;
};

export default Player;
