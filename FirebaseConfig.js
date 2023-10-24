// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase Authentication with AsyncStorage for state persistence

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoMdrrbrGlHq9m752KHpN2mp4rT6vIUQU",
  authDomain: "login-app-46a7f.firebaseapp.com",
  projectId: "login-app-46a7f",
  storageBucket: "login-app-46a7f.appspot.com",
  messagingSenderId: "726676285787",
  appId: "1:726676285787:web:5d196b0a059856e2ee127e",
  measurementId: "G-QJVLXL1979"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getFirestore(app);