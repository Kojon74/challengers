import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOOG7jSyKZHCxxd2MtulQ6eK1mpaA8Nko",
  authDomain: "challengers-fab2d.firebaseapp.com",
  projectId: "challengers-fab2d",
  storageBucket: "challengers-fab2d.firebasestorage.app",
  messagingSenderId: "968327885385",
  appId: "1:968327885385:web:894841299e2ce37b188598",
  measurementId: "G-C55NP0VZTF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, app };
