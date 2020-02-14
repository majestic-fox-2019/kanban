import firebase from "firebase"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyA1LX-p0O_3UuhsF4quwkUiCclo18QgDLA",
  authDomain: "jovipetra.firebaseapp.com",
  databaseURL: "https://jovipetra.firebaseio.com",
  projectId: "jovipetra",
  storageBucket: "jovipetra.appspot.com",
  messagingSenderId: "92257054271",
  appId: "1:92257054271:web:4e2075100b93469dd1928a"
});

var db = firebase.firestore();

export default db
