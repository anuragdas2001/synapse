// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa13uY-pDFkPYmuQ1xZA3JAH77d0Z40k4",
  authDomain: "synapse-510fb.firebaseapp.com",
  projectId: "synapse-510fb",
  storageBucket: "synapse-510fb.appspot.com",
  messagingSenderId: "708215987292",
  appId: "1:708215987292:web:0c5eaa71656aa96d6f1a99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);