/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
*/

//import * as firebase from 'firebase';
import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD1_wt3htkokA-oCJomBOJvGf5nl6hEPD8",
  authDomain: "ada-project-43530.firebaseapp.com",
  projectId: "ada-project-43530",
  storageBucket: "ada-project-43530.appspot.com",
  messagingSenderId: "778670263347",
  appId: "1:778670263347:web:baaf8d6c3a0706f483a746",
  measurementId: "G-ZSRQGKF4HR"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

/*
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1_wt3htkokA-oCJomBOJvGf5nl6hEPD8",
  authDomain: "ada-project-43530.firebaseapp.com",
  projectId: "ada-project-43530",
  storageBucket: "ada-project-43530.appspot.com",
  messagingSenderId: "778670263347",
  appId: "1:778670263347:web:baaf8d6c3a0706f483a746",
  measurementId: "G-ZSRQGKF4HR"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/