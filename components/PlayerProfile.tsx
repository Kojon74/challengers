import ScreenContainer from "@/components/ScreenContainer";
import BodyText from "@/components/typography/BodyText";
import Heading from "@/components/typography/Heading";
import { colours } from "@/theme/colours";
import { Player } from "@/types/player";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";

type Props = { player: Player };

const PlayerProfile = ({ player }: Props) => {
  return (
    <ScreenContainer>
      <View style={styles.profilePhoto}>
        <Heading
          style={styles.profilePhotoInitials}
        >{`${player.firstName.charAt(0)} ${player.lastName.charAt(
          0
        )}`}</Heading>
      </View>
      <Heading>{`${player.firstName} ${player.lastName}`}</Heading>
      <View style={styles.details}>
        <View style={styles.detailContainer}>
          <View style={styles.detailTop}>
            <FontAwesome name="star" size={28} />
            <BodyText>{player.rating}</BodyText>
          </View>
          <BodyText>Rating</BodyText>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detailTop}>
            <FontAwesome name="map-marker" size={28} />
            <BodyText>{player.location.neighbourhood}</BodyText>
          </View>
          <BodyText>Location</BodyText>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default PlayerProfile;

const styles = StyleSheet.create({
  profilePhoto: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colours.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhotoInitials: { marginTop: 0, marginBottom: 0 },
  details: { flexDirection: "row", gap: 10 },
  detailTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  detailContainer: {
    borderRadius: 10,
    backgroundColor: colours.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 5,
  },
});
