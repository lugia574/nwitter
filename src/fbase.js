import "firebase/compat/storage";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// databaseURL: process.env.REACT_APP_DATABASE_URL,

// firebase.initializeApp(firebaseConfig);
// export const firebaseInstance = firebase;
// export const dbService = firebase.firestore();
// export const authService = firebase.auth();

const app = initializeApp(firebaseConfig);
console.log(app);
export const authService = getAuth();
export const dbService = getFirestore(app);

export default app;
