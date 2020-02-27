import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQorDharA_JBeudVE5WPphslygelINYlI",
    authDomain: "kanban-fc88d.firebaseapp.com",
    databaseURL: "https://kanban-fc88d.firebaseio.com",
    projectId: "kanban-fc88d",
    storageBucket: "kanban-fc88d.appspot.com",
    messagingSenderId: "968682367496",
    appId: "1:968682367496:web:f829aa30e7a3dd95d43fbd",
    measurementId: "G-XE7XDXZ8FQ"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'en';

const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope("http://www.googleapis.com/auth/contacts.readonly");

export {
    provider, firebase
}