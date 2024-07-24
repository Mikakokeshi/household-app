// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLzGdl2NDAxeIe0ibqaNKyks6RLGHZbpE",
  authDomain: "react-portfolio-aa9f1.firebaseapp.com",
  projectId: "react-portfolio-aa9f1",
  storageBucket: "react-portfolio-aa9f1.appspot.com",
  messagingSenderId: "30033959916",
  appId: "1:30033959916:web:44db2b868b192e52547ec9",
  measurementId: "G-MQFHY87C2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
