// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTprZIqQsbV9V0x5iTfUTNXwO9YpP_ZhE",
  authDomain: "clone-16cb0.firebaseapp.com",
  projectId: "clone-16cb0",
  storageBucket: "clone-16cb0.appspot.com",
  messagingSenderId: "342255903208",
  appId: "1:342255903208:web:a9603ab87885f19ac0c45d",
  measurementId: "G-9MF98WHGTW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
