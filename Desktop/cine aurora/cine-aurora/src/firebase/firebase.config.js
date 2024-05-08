import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGQyQzz72KgPwXItl-ELfbEZ0YhKSo1hs",
    authDomain: "cine-aurora.firebaseapp.com",
    projectId: "cine-aurora",
    storageBucket: "cine-aurora.appspot.com",
    messagingSenderId: "413335575172",
    appId: "1:413335575172:web:3a0fc8c01949283c1100d1",
    measurementId: "G-5RRXNFMCZW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);