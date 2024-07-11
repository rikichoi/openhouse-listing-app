// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkZ8Z1OHzcSjpdZp9JaGrWNUosqD3RZJc",
  authDomain: "openhouse-project-9f78c.firebaseapp.com",
  projectId: "openhouse-project-9f78c",
  storageBucket: "openhouse-project-9f78c.appspot.com",
  messagingSenderId: "70027310207",
  appId: "1:70027310207:web:2120a55bade8730a00fb4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db}