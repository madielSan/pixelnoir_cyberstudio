import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_AIzaSyCm85ZF9m5WiiGCfWgTmc520oeMqKUBYFs,
  authDomain: import.meta.env.VITE_pixel-noir-cyberstudio.firebaseapp.com,
  projectId: import.meta.env.VITE_pixel-noir-cyberstudio,
  storageBucket: import.meta.env.VITE_pixel-noir-cyberstudio.appspot.com,
  messagingSenderId: import.meta.env.VITE_733165666661,
  appId: import.meta.env.VITE_1:733165666661:web:283215e1b2cb5469bb218c,
  measurementId: import.meta.env.VITE_G-3TWL3JN2JV
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app, "gs://pixel-noir-cyberstudio.appspot.com");
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

auth.useDeviceLanguage();

export default app;

console.log("Firebase Config :", firebaseConfig);

