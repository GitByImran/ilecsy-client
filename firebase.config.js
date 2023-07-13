// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmYwyNB-KHPWQrWnX2hgkuEhJp4NanqXM",
  authDomain: "ilecsy.firebaseapp.com",
  projectId: "ilecsy",
  storageBucket: "ilecsy.appspot.com",
  messagingSenderId: "1024972848948",
  appId: "1:1024972848948:web:45d464b89a82f94e27af61",
  measurementId: "G-FGJ6P16LQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
