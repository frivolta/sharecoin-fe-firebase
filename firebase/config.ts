import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBPczh5DTt3mW1zda25kP6xTIm7jbTd0N0",
  authDomain: "sharecoin-dev.firebaseapp.com",
  projectId: "sharecoin-dev",
  storageBucket: "sharecoin-dev.appspot.com",
  messagingSenderId: "210521230870",
  appId: "1:210521230870:web:92e928925d2a3c5de62f37",
  measurementId: "G-8LWLGETSDG",
};

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
