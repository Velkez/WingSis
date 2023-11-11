import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjkwOIJsI3fKz3_03lkgoAy9PsphU8t4A",
  authDomain: "alarma-f2c2e.firebaseapp.com",
  databaseURL: "https://alarma-f2c2e-default-rtdb.firebaseio.com",
  projectId: "alarma-f2c2e",
  storageBucket: "alarma-f2c2e.appspot.com",
  messagingSenderId: "572554263764",
  appId: "1:572554263764:web:740178431962c73da18f41",
  measurementId: "G-0XK26QJM4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
