// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDTprZIqQsbV9V0x5iTfUTNXwO9YpP_ZhE",
//   authDomain: "clone-16cb0.firebaseapp.com",
//   projectId: "clone-16cb0",
//   storageBucket: "clone-16cb0.appspot.com",
//   messagingSenderId: "342255903208",
//   appId: "1:342255903208:web:a9603ab87885f19ac0c45d",
//   measurementId: "G-9MF98WHGTW",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDq6VQ-I5ZOdIH7en7T4zHD4Aufybk8zCQ",
  authDomain: "amzon-d5876.firebaseapp.com",
  projectId: "amzon-d5876",
  storageBucket: "amzon-d5876.appspot.com",
  messagingSenderId: "140832963465",
  appId: "1:140832963465:web:b8e4b4e4762609fc86bf58",
  measurementId: "G-FKDV3M1T3X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
