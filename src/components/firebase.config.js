import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdFvmu2tcOpLwvVLXQw486wGGfIkTRdBo",
  authDomain: "localhouse-ee223.firebaseapp.com",
  databaseURL:
    "https://localhouse-ee223-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "localhouse-ee223",
  storageBucket: "localhouse-ee223.appspot.com",
  messagingSenderId: "35662876137",
  appId: "1:35662876137:web:b505d8486b6d849cde8f78",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
