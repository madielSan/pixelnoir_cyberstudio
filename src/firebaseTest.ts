import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm85ZF9m5WiiGCfWgTmc520oeMqKUBYFs",
  authDomain: "pixel-noir-cyberstudio.firebaseapp.com",
  projectId: "pixel-noir-cyberstudio",
  storageBucket: "pixel-noir-cyberstudio.firebasestorage.app",
  messagingSenderId: "733165666661",
  appId: "1:733165666661:web:283215e1b2cb5469bb218c",
  measurementId: "G-3TWL3JN2JV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function runFirebaseTests() {
  // Test Firestore
  async function testFirestoreConnection() {
    try {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
      console.log("Connexion à Firestore réussie !");
    } catch (error) {
      console.error("Erreur Firestore : ", error);
    }
  }

  // Test Authentication
  signInAnonymously(auth)
    .then(() => {
      console.log("Connexion Firebase Authentication réussie !");
      testFirestoreConnection();
    })
    .catch((error) => {
      console.error("Erreur Firebase Auth : ", error.message);
    });
}
