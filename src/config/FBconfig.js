import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDqeMosSYzhPiVzKJvZLSn5uoPZYHBamP4",
    authDomain: "projectbook-53a01.firebaseapp.com",
    databaseURL: "https://projectbook-53a01.firebaseio.com",
    projectId: "projectbook-53a01",
    storageBucket: "",
    messagingSenderId: "92627387426",
    appId: "1:92627387426:web:a573e1f48300cef9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;