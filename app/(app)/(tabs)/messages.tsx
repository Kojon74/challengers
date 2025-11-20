import { useChats } from "@/contexts/ChatsContext";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatType } from "@/types/chats";
import ScreenContainer from "@/components/ScreenContainer";
import BodyText from "@/components/typography/BodyText";
import { useRouter } from "expo-router";

const Messages = () => {
  const { chats } = useChats();

  return (
    <ScreenContainer>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chatData={item} />}
      />
    </ScreenContainer>
  );
};

type Props = { chatData: ChatType };

const ChatListItem = ({ chatData }: Props) => {
  const router = useRouter();

  const handleChatPress = () => router.navigate(`/chat/${chatData.id}`);

  return (
    <TouchableOpacity onPress={handleChatPress}>
      <View style={styles.firstRow}>
        <BodyText>{chatData.otherUser.name}</BodyText>
        <BodyText>{formatMessageTimestamp(chatData.lastMessageTime)}</BodyText>
      </View>
      <BodyText>{chatData.lastMessage}</BodyText>
    </TouchableOpacity>
  );
};

export function formatMessageTimestamp(date: Date): string {
  const now = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // Today
  if (isSameDay(date, now)) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) {
    return "Yesterday";
  }

  // Within last 7 days
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  if (diffDays < 7) {
    return date.toLocaleDateString([], {
      weekday: "long",
    });
  }

  // Older than 7 days
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default Messages;

const styles = StyleSheet.create({
  firstRow: { flexDirection: "row", justifyContent: "space-between" },
});
