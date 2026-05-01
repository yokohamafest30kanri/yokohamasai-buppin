import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE8l_fbqIec6RnKC11EppQQ_GMDEjoJ3k",
  authDomain: "yokohamasai-bihin.firebaseapp.com",
  projectId: "yokohamasai-bihin",
  storageBucket: "yokohamasai-bihin.firebasestorage.app",
  messagingSenderId: "526110001981",
  appId: "1:526110001981:web:35d39653b9740e8915d354",
  measurementId: "G-WGX230R5PL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);