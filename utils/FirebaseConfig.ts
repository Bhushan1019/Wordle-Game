import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0Nw5rv4zfR1PUG_r07whoj_Cyq3j6ACo",
  authDomain: "wordle-clone-b2f59.firebaseapp.com",
  projectId: "wordle-clone-b2f59",
  storageBucket: "wordle-clone-b2f59.firebasestorage.app",
  messagingSenderId: "692592673693",
  appId: "1:692592673693:web:45b6ac2ece11211367a574",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
