// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdj50Z4qDi5qgE8NZjmTbqhdTRtF7I5CQ",
  authDomain: "sigma-cortex-380813.firebaseapp.com",
  projectId: "sigma-cortex-380813",
  databaseURL: 'https://sigma-cortex-380813..firebaseio.com',
  storageBucket: "sigma-cortex-380813.appspot.com",
  messagingSenderId: "99216476858",
  appId: "1:99216476858:web:1a120385e96c0fd0539083",
  measurementId: "G-68X3XWD60T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

//scorpion-safe-client-myself-traffic-pupil
//outdoor-toy-era-pill-clinic-whale