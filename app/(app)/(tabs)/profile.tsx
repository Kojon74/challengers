import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { colours } from "@/theme/colours";
import { useSession } from "@/contexts/ctx";
import Heading from "@/components/typography/Heading";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BodyText from "@/components/typography/BodyText";
import { reverseGeocodeAsync } from "expo-location";

async function fetchNeighbourhood(lat: number, lon: number) {
  const results = await reverseGeocodeAsync({ latitude: lat, longitude: lon });
  if (results.length > 0) {
    const place = results[0];
    return place.district || place.city || place.subregion || place.region;
  }
}

const Profile = () => {
  const { userDoc } = useSession();

  const [neighbourhood, setNeighbourhood] = useState<
    string | undefined | null
  >();

  useEffect(() => {
    const loadNeighbourhood = async () => {
      if (userDoc?.data()?.location?.coords) {
        const result = await fetchNeighbourhood(
          userDoc?.data()?.location.coords.latitude,
          userDoc?.data()?.location.coords.longitude
        );
        setNeighbourhood(result);
      }
    };

    loadNeighbourhood();
  }, [userDoc?.data()?.location?.coords]);

  return (
    <ScreenContainer>
      <View style={styles.profilePhoto}>
        <Heading style={styles.profilePhotoInitials}>{`${(
          userDoc?.get("firstName") as string
        ).charAt(0)} ${(userDoc?.get("lastName") as string).charAt(
          0
        )}`}</Heading>
      </View>
      <Heading>{`${userDoc?.get("firstName")} ${userDoc?.get(
        "lastName"
      )}`}</Heading>
      <View style={styles.details}>
        <View style={styles.detailContainer}>
          <View style={styles.detailTop}>
            <FontAwesome name="star" size={28} />
            <BodyText>{userDoc?.get("skillLevel") as string}</BodyText>
          </View>
          <BodyText>Rating</BodyText>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detailTop}>
            <FontAwesome name="map-marker" size={28} />
            <BodyText>{neighbourhood}</BodyText>
          </View>
          <BodyText>Rating</BodyText>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Profile;

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
