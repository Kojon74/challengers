import { FieldValue } from "@react-native-firebase/firestore";

export type MessageType = {
  id: string;
  senderId: string;
  text: string;
  timestamp: FieldValue;
};
