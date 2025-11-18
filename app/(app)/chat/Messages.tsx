import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  FirebaseFirestoreTypes,
  getFirestore,
  onSnapshot,
} from "@react-native-firebase/firestore";
import Message from "./Message";
import { type MessageType } from "@/types/chats";

type Props = { id: string };

const Messages = ({ id }: Props) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(getFirestore(), `chats/${id}/messages`),
      (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
        setMessages(
          snap.docs.reverse().map((doc) => ({
            ...(doc.data() as Omit<MessageType, "id">),
            id: doc.id,
          }))
        );
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [messages]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </ScrollView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
});
