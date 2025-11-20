import PlayerProfile from "@/components/PlayerProfile";
import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";

const Profile = () => {
  const { userData } = useAuthenticatedSession();

  if (!userData) return null;

  return <PlayerProfile player={userData} />;
};

export default Profile;
