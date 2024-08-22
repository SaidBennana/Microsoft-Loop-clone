// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "merosoftloop.firebaseapp.com",
  projectId: "merosoftloop",
  storageBucket: "merosoftloop.appspot.com",
  messagingSenderId: "932667129697",
  appId: "1:932667129697:web:ec28bd6b9697fafe008f20",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
