import { StyleSheet, View } from "react-native";
import { MessageType } from "@/types/chats";
import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";
import { colours } from "@/theme/colours";
import BodyText from "@/components/typography/BodyText";

const Message = ({ senderId, text, timestamp }: MessageType) => {
  const { userData } = useAuthenticatedSession();
  const isCurrentUser = userData.id === senderId;

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserCont : styles.otherUserCont,
      ]}
    >
      <BodyText style={styles.text}>{text}</BodyText>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: "70%",
  },
  currentUserCont: {
    backgroundColor: colours.wimbledonGreen,
    alignSelf: "flex-end",
  },
  otherUserCont: { backgroundColor: colours.lightGray },
  text: { color: colours.white },
});
