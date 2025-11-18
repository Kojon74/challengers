import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Messages from "./Messages";
import { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles as textInputStyles } from "@/components/TextInput";
import { colours } from "@/theme/colours";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  type Timestamp,
} from "@react-native-firebase/firestore";
import { MessageType } from "@/types/chats";
import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";
import { UserType } from "@/types/user";
import HeaderRightButton from "./HeaderRightButton";

type ChatDoc = {
  lastMessage: string;
  lastMessageTime: Timestamp;
  participants: string[];
};

const Chat = () => {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const { userData } = useAuthenticatedSession();
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    (async () => {
      const chatDoc = await getDoc(doc(getFirestore(), `chats/${id}`));
      const participants = (chatDoc.data() as ChatDoc).participants;
      const otherUserId = participants.find((id) => id !== userData.id);
      if (!otherUserId) {
        console.error("User not included in chat participants list");
        return;
      }
      const otherUser = (
        await getDoc(doc(getFirestore(), `users/${otherUserId}`))
      ).data() as Omit<UserType, "id">;
      navigation.setOptions({
        title: `${otherUser.firstName} ${otherUser.lastName}`,
        headerRight: () => <HeaderRightButton />,
      });
    })();
  }, [id]);

  const handlePressSend = async () => {
    const messageDocData: Omit<MessageType, "id"> = {
      senderId: userData.id,
      text: messageInput,
      timestamp: serverTimestamp(),
    };
    await addDoc(
      collection(getFirestore(), `chats/${id}/messages`),
      messageDocData
    );
    setMessageInput("");
  };

  return (
    <ScreenContainer>
      <Messages id={id} />
      <View style={styles.messageInputContainer}>
        <TextInput
          value={messageInput}
          onChangeText={(text) => setMessageInput(text)}
          style={[textInputStyles.input, styles.messageInput]}
        />
        <TouchableOpacity onPress={handlePressSend}>
          <View style={styles.sendIcon}>
            <FontAwesome name="send" size={20} color={colours.white} />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  messageInput: { flex: 1 },
  sendIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colours.wimbledonGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
