import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3GJKsxgFeEM1kTNASd-NbE_dRWFutUEk",
  authDomain: "auth-lab06.firebaseapp.com",
  projectId: "auth-lab06",
  storageBucket: "auth-lab06.appspot.com",
  messagingSenderId: "541589356510",
  appId: "1:541589356510:web:a1f23762561d2a0d18674f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
