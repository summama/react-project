// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAaw3wbJClTd-gjbouTbNwUTwGpx2EbhQ",
  authDomain: "react-course-15f58.firebaseapp.com",
  projectId: "react-course-15f58",
  storageBucket: "react-course-15f58.appspot.com",
  messagingSenderId: "907403163578",
  appId: "1:907403163578:web:8e51bbf0c6974e638d4f83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app); //auth variable contains all the info of user loged in
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);