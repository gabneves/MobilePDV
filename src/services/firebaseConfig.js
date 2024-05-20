import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOMw9b1XW4npkoZ6gjxudtm0fSyM42Uc4",
  authDomain: "apptaqui.firebaseapp.com",
  projectId: "apptaqui",
  storageBucket: "apptaqui.appspot.com",
  messagingSenderId: "250042520107",
  appId: "1:250042520107:web:5ac260dc94e84afc39506e",
  measurementId: "G-4856Y5DQ82"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };