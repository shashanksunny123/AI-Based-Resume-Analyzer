// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY0gH7T29J4UjzwIIbNvLkZQ__D4snbvQ",
  authDomain: "resume-check-2068c.firebaseapp.com",
  projectId: "resume-check-2068c",
  storageBucket: "resume-check-2068c.firebasestorage.app",
  messagingSenderId: "130131266332",
  appId: "1:130131266332:web:e02b05bd48284a8b0048d9"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
// Force account chooser to show all available accounts on the device/browser
provider.setCustomParameters({ prompt: 'select_account' });
