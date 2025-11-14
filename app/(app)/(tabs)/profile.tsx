import { useSession } from "@/contexts/ctx";
import PlayerProfile from "@/components/PlayerProfile";
import { userDocToPlayer } from "@/utils/players";

const Profile = () => {
  const { userDoc } = useSession();

  if (!userDoc) return null;

  return <PlayerProfile player={userDocToPlayer(userDoc)} />;
};

export default Profile;
