import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo9uPM_CSBtGhf8ZwVF22QtPChlKbMSNg",
  authDomain: "restaurant-dcf8d.firebaseapp.com",
  projectId: "restaurant-dcf8d",
  storageBucket: "restaurant-dcf8d.appspot.com",
  messagingSenderId: "987760687525",
  appId: "1:987760687525:web:57b8d4acdd84d37c29504c",
  measurementId: "G-941CQ1P31R",
};

//prevent error when reloading - only useful in development
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const db = firebase.firestore();
