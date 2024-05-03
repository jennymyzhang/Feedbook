// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCieV_EWZn4jr5T3N3I4d73srEWjhA8Ygk",
  authDomain: "feedbook-90764.firebaseapp.com",
  projectId: "feedbook-90764",
  storageBucket: "feedbook-90764.appspot.com",
  messagingSenderId: "888303003114",
  appId: "1:888303003114:web:b2177cfacf29926a8efe93",
  measurementId: "G-54Y0P9YKK0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();