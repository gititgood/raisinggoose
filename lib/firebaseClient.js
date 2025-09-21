// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDawG44HMEuLDndsqT4L8Hi34Z9bkVp03A",
  authDomain: "raising-goose.firebaseapp.com",
  projectId: "raising-goose",
  storageBucket: "raising-goose.firebasestorage.app",
  messagingSenderId: "678620164122",
  appId: "1:678620164122:web:ddef3a8344d5f5f8c8a1a3",
  measurementId: "G-KSL8E78BBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);