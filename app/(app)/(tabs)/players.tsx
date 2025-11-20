import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenContainer from "@/components/ScreenContainer";
import BodyText from "@/components/typography/BodyText";
import { router } from "expo-router";
import { usePlayers } from "@/contexts/PlayerContext";
import { UserDocType } from "@/types/user";
import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";

const Players = () => {
  const { players } = usePlayers();
  const { userData } = useAuthenticatedSession();

  const playersList = Object.values(players).filter(
    (player) => player.id !== userData.id
  );

  return (
    <ScreenContainer>
      <FlatList
        data={playersList}
        renderItem={({ item }) => <PlayerRow {...item} />}
        ListHeaderComponent={<HeaderRow />}
      />
    </ScreenContainer>
  );
};

const HeaderRow = () => (
  <View style={styles.rowContainer}>
    <BodyText style={styles.playerCol1}>Name</BodyText>
    <BodyText style={styles.playerCol2}>Rating</BodyText>
    <BodyText style={styles.playerCol2}>Distance</BodyText>
  </View>
);

const PlayerRow = ({
  id,
  firstName,
  lastName,
  rating,
  location,
}: UserDocType) => (
  <TouchableOpacity
    style={styles.rowContainer}
    onPress={() => router.navigate(`/(app)/player/${id}`)}
  >
    <BodyText style={styles.playerCol1}>{`${firstName} ${lastName}`}</BodyText>
    <BodyText style={styles.playerCol2}>{rating}</BodyText>
    <BodyText style={styles.playerCol2}>
      {location.coords.latitude}, {location.coords.longitude}
    </BodyText>
  </TouchableOpacity>
);

export default Players;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  playerCol1: {
    width: "60%",
  },
  playerCol2: {
    width: "20%",
  },
});
