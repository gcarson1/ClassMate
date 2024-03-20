import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAvQ_4NfL7OQT4oJjMXU9-wZHVF4YTvm7w",
  authDomain: "classmate-4c2d5.firebaseapp.com",
  projectId: "classmate-4c2d5",
  storageBucket: "classmate-4c2d5.appspot.com",
  messagingSenderId: "623475161245",
  appId: "1:623475161245:web:507a9fdf79173520a8fc74",
  measurementId: "G-YJJ54T9PEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

