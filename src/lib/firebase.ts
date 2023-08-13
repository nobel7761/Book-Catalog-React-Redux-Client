// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAItO_kFZjesZij_tdHo7vSiUR2nJQ5tcA",
  authDomain: "book-catalog-ec60a.firebaseapp.com",
  projectId: "book-catalog-ec60a",
  storageBucket: "book-catalog-ec60a.appspot.com",
  messagingSenderId: "306670619714",
  appId: "1:306670619714:web:651b539c509c5cf16c71db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
