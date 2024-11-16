import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCm85ZF9m5WiiGCfWgTmc520oeMqKUBYFs",
  authDomain: "pixel-noir-cyberstudio.firebaseapp.com",
  projectId: "pixel-noir-cyberstudio",
  storageBucket: "pixel-noir-cyberstudio.appspot.com",
  messagingSenderId: "733165666661",
  appId: "1:733165666661:web:283215e1b2cb5469bb218c",
  measurementId: "G-3TWL3JN2JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

export default app;