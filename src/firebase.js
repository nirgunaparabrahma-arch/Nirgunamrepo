import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeINUch6snN0iwdJhMf3uL2Bs0WhPYWnk",
  authDomain: "nirgunam.firebaseapp.com",
  projectId: "nirgunam",
  storageBucket: "nirgunam.firebasestorage.app",
  messagingSenderId: "263796525888",
  appId: "1:263796525888:web:c927f85ea848f6a1edc8a5",
  measurementId: "G-02Y5PF7WD1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
