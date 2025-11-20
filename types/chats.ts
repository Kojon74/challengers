import { FieldValue, Timestamp } from "@react-native-firebase/firestore";

export type MessageType = {
  id: string;
  senderId: string;
  text: string;
  timestamp: FieldValue;
};

export type ChatDocType = {
  lastMessage: string;
  lastMessageTime: Timestamp;
  participants: string[];
};

export type ChatType = {
  id: string;
  lastMessage: string;
  lastMessageTime: Date;
  otherUser: { id: string; name: string };
};
