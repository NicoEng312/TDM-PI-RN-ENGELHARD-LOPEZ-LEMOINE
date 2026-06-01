import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyALUFT2rSvAZlG31iYw9c9WdGAtsS8QeY8",
  authDomain: "fir-1-react-native.firebaseapp.com",
  projectId: "fir-1-react-native",
  storageBucket: "fir-1-react-native.firebasestorage.app",
  messagingSenderId: "963688601230",
  appId: "1:963688601230:web:e58a92cc4378367eef5bdf"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
