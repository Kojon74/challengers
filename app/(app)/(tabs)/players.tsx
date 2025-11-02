import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenContainer from "@/components/ScreenContainer";
import { players } from "@/players";
import BodyText from "@/components/typography/BodyText";

type Player = {
  name: string;
  rating: number;
  distance: number;
};

type TableHeader = {
  name: string;
  rating: string;
  distance: string;
};

const Players = () => {
  return (
    <ScreenContainer>
      <FlatList
        data={players}
        renderItem={({ item }) => <PlayerRow {...item} />}
        ListHeaderComponent={
          <PlayerRow name="Name" rating="Rating" distance="Distance" />
        }
      />
    </ScreenContainer>
  );
};

const PlayerRow = ({ name, rating, distance }: Player | TableHeader) => (
  <TouchableOpacity style={styles.rowContainer}>
    <BodyText style={styles.playerCol1}>{name}</BodyText>
    <BodyText style={styles.playerCol2}>{rating}</BodyText>
    <BodyText style={styles.playerCol2}>{distance}</BodyText>
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
