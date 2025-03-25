// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-estate-ac462.firebaseapp.com",
  projectId: "mern-estate-ac462",
  storageBucket: "mern-estate-ac462.firebasestorage.app",
  messagingSenderId: "443609377615",
  appId: "1:443609377615:web:912f2402acf8e2085fb33a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
