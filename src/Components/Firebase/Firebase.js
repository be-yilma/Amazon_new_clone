// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaXyx_p77bnTkPt9SL6dxngPsnhkbVCwE",
  authDomain: "final-ffc80.firebaseapp.com",
  projectId: "final-ffc80",
  storageBucket: "final-ffc80.appspot.com",
  messagingSenderId: "336014699525",
  appId: "1:336014699525:web:c3c13bf4fed638ece5006c",
  measurementId: "G-BTRQPMFHN9",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
