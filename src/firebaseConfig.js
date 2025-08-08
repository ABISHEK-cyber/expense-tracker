// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2-29Pu54yawoTNeefvOtAgQKMW7NbRv0",
  authDomain: "expense-tracker-pro-15a55.firebaseapp.com",
  projectId: "expense-tracker-pro-15a55",
  storageBucket: "expense-tracker-pro-15a55.firebasestorage.app",
  messagingSenderId: "288157522322",
  appId: "1:288157522322:web:57e7dc4ad99127d7c2894b",
  measurementId: "G-TE72EZHDCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
