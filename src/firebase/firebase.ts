// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBRK-5uSopsHxbP5rFIoOQvBgWGr30-6IA",
    authDomain: "arkomebellosha6ka.firebaseapp.com",
    projectId: "arkomebellosha6ka",
    storageBucket: "arkomebellosha6ka.appspot.com",
    messagingSenderId: "321066027396",
    appId: "1:321066027396:web:675b6fc687244fb73fb5d1",
    measurementId: "G-7X6KD0MEHY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
