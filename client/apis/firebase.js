import * as firebase from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBXCFDhLaDlL50gn-zGDnVWq58mRKA1zdk",
  authDomain: "kanban-116cb.firebaseapp.com",
  databaseURL: "https://kanban-116cb.firebaseio.com",
  projectId: "kanban-116cb",
  storageBucket: "kanban-116cb.appspot.com",
  messagingSenderId: "512116520515",
  appId: "1:512116520515:web:0e19c771c4acb942fe06f6"
};

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = 'en';

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export { provider, firebase }