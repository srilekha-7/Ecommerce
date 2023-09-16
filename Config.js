// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Q1ki1DpGo0aPnXf6E-5st1IyX4jAc8E",
  authDomain: "fir-auth-3-4dac7.firebaseapp.com",
  projectId: "fir-auth-3-4dac7",
  storageBucket: "fir-auth-3-4dac7.appspot.com",
  messagingSenderId: "181202912471",
  appId: "1:181202912471:web:8b4f401fb4b3756e031c92",
  measurementId: "G-J34P1C305B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app, auth, provider };
