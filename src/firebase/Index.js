// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCVMrLZ6TndkdLSCDwGwm_aZrpZlLaj-6c',
  authDomain: 'money-tracker-web-6d78e.firebaseapp.com',
  projectId: 'money-tracker-web-6d78e',
  storageBucket: 'money-tracker-web-6d78e.appspot.com',
  messagingSenderId: '1081542398627',
  appId: '1:1081542398627:web:7c1767ccdd2f2c3a496516',
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export {firebase};
