import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCGzu9UxNArz7R0lsuYuSRx8i8QXu4-o5c',
  authDomain: 'best-choice-b3.firebaseapp.com',
  projectId: 'best-choice-b3',
  storageBucket: 'best-choice-b3.appspot.com',
  messagingSenderId: '176992456545',
  appId: '1:176992456545:web:7d1abba1a63d58b2fcbf20',
  measurementId: 'G-D97EGBWCCX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
