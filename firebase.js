// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxw6Q_18QqWXdfVH38Vz8a5JwcRuDUIWU",
  authDomain: "jingle-2d9b3.firebaseapp.com",
  databaseURL: "https://jingle-2d9b3.firebaseio.com",
  projectId: "jingle-2d9b3",
  storageBucket: "jingle-2d9b3.appspot.com",
  messagingSenderId: "1086327066887",
  appId: "1:1086327066887:web:40461d73c2c6d9b18335a2",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore(app);

const UsersRef = db.collection("users");

const auth = firebase.auth();

export { auth, firebase, UsersRef };
