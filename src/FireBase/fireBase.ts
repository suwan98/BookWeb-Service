import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATqTUe6QQMsjXDTfeAT5cECVTEMsx8KMQ",
  authDomain: "bookdb-83160.firebaseapp.com",
  projectId: "bookdb-83160",
  storageBucket: "bookdb-83160.appspot.com",
  messagingSenderId: "757433145291",
  appId: "1:757433145291:web:b273ffa59e9305d384c84e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app); //DB생성
export const authService = getAuth();
