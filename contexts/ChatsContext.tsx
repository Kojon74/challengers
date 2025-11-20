import useAuthenticatedSession from "@/hooks/useAuthenticatedSession";
import { ChatDocType, ChatType } from "@/types/chats";
import { UserDocType } from "@/types/user";
import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@react-native-firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

const ChatsContext = createContext<{ chats: ChatType[] }>({ chats: [] });

export const useChats = () => use(ChatsContext);

export const ChatsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthenticatedSession();
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), `chats`),
        where("participants", "array-contains", user.uid),
        orderBy("lastMessageTime", "desc")
      ),
      async (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
        console.log("running");

        const _chats = await Promise.all(
          snap.docs.map(async (snapDoc, i) => {
            const snapDocData = snapDoc.data() as ChatDocType;
            const otherUserId = snapDocData.participants.find(
              (id: string) => id != user.uid
            );
            if (!otherUserId) throw new Error("Chat participants list error");
            const otherUserData = (
              await getDoc(doc(getFirestore(), `users/${otherUserId}`))
            ).data() as UserDocType;
            const otherUser = {
              id: otherUserId,
              name: `${otherUserData.firstName} ${otherUserData.lastName}`,
            };
            return {
              id: snapDoc.id,
              lastMessage: snapDocData.lastMessage,
              lastMessageTime: snapDocData.lastMessageTime.toDate(),
              otherUser,
            };
          })
        );

        setChats(_chats);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <ChatsContext.Provider value={{ chats }}>{children}</ChatsContext.Provider>
  );
};
