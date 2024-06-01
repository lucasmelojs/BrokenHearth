// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkDEOzPDRragSo_MXHXkdOgknCikuFRbM",
    authDomain: "brokenhearth-46633.firebaseapp.com",
    projectId: "brokenhearth-46633",
    storageBucket: "brokenhearth-46633.appspot.com",
    messagingSenderId: "483688123296",
    appId: "1:483688123296:web:6281e3845f9500a44ef2c5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
