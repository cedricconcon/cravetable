// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp0cDuf2o_NTjGMfIRlVD8igSMqmYYtD0",
  authDomain: "food-ecommerce-c1a64.firebaseapp.com",
  projectId: "food-ecommerce-c1a64",
  storageBucket: "food-ecommerce-c1a64.firebasestorage.app",
  messagingSenderId: "912592138366",
  appId: "1:912592138366:web:f20b332f14f06bac04e82f",
  measurementId: "G-X4XR4F4P7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)