// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, deleteDoc, onSnapshot} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdrqHN9n0DxZceVB68_LT3g2PxVkUEVXs",
  authDomain: "makkahmasjid-73fec.firebaseapp.com",
  projectId: "makkahmasjid-73fec",
  storageBucket: "makkahmasjid-73fec.appspot.com",
  messagingSenderId: "612902709295",
  appId: "1:612902709295:web:906dd9e323318563253eda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()

// Exporting Firebase
export {app, auth, createUserWithEmailAndPassword, doc, db, getDoc, setDoc, signInWithEmailAndPassword, deleteDoc, onSnapshot, onAuthStateChanged, signOut, collection };