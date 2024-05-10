import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoRWJ-StU751uUFka1qDgNBslu9hEaunA",
    authDomain: "inc-exp-af4c2.firebaseapp.com",
    projectId: "inc-exp-af4c2",
    storageBucket: "inc-exp-af4c2.appspot.com",
    messagingSenderId: "1050141699496",
    appId: "1:1050141699496:web:e05bfbd72c3f20b004419d",
    measurementId: "G-YYWBWQ3JYZ"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app as firebaseApp };