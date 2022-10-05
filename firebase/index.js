
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgJAB1y0tH8PnEaxFA_Nha1wkCWsI-2z8",
  authDomain: "week07-db912.firebaseapp.com",
  projectId: "week07-db912",
  storageBucket: "week07-db912.appspot.com",
  messagingSenderId: "377629747238",
  appId: "1:377629747238:web:b33cbe1f09a4569221dee7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//connect authentucation
const auth = getAuth(app);
//connect firestore database db
const db= getFirestore(app);

export{auth, db};