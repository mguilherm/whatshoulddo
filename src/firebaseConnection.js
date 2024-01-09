import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRNU3dkY5BqHfdCnhCKwq7Y0DqdqDJ_xc",
  authDomain: "react-crud-40e34.firebaseapp.com",
  projectId: "react-crud-40e34",
  storageBucket: "react-crud-40e34.appspot.com",
  messagingSenderId: "216839221784",
  appId: "1:216839221784:web:6e467cb26a7a90ec8f896d",
  measurementId: "G-KPZ0RZ8ZXN",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
