import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAVxpNdesdT7lLs26wDZtIw216DJgsG44Q",
  authDomain: "k-kanban.firebaseapp.com",
  databaseURL: "https://k-kanban.firebaseio.com",
  projectId: "k-kanban",
  storageBucket: "k-kanban.appspot.com",
  messagingSenderId: "230700028593",
  appId: "1:230700028593:web:8f9cd56dcea235dc5bc890"
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();

export{ provider, firebase }