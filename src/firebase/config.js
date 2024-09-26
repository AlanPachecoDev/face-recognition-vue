// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, where, query, updateDoc, doc, arrayUnion  } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Agrega esta importación
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ_08Fcx7JICWAMR-EklT69d_X18V1wH0",
  authDomain: "face-recognition-960b5.firebaseapp.com",
  projectId: "face-recognition-960b5",
  storageBucket: "face-recognition-960b5.appspot.com",
  messagingSenderId: "221026058002",
  appId: "1:221026058002:web:14eac64dbafb584659fdcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); // Inicializa el servicio de almacenamiento


export {app, db, storage, ref, uploadBytes, getDownloadURL, collection, addDoc, listAll, getDocs, where, query, updateDoc, doc, arrayUnion };