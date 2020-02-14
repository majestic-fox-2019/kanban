<template>
    <div id="app">
        <LoginPage v-on:login="login" :loginshow="showloginpage"></LoginPage>
        <RegisterPage
            v-on:register="register"
            :registershow="showregisterpage"
        ></RegisterPage>
        <DisplayPage :showpage="showprintpage"></DisplayPage>
    </div>
</template>

<script>
import Vue from "vue";
import LoginPage from "./components/loginpage";
import RegisterPage from "./components/registerpage";
import DisplayPage from "./components/displaypage";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD2V9UPOeL5B7y-qARH6GK-nA9vy-UnzB8",
    authDomain: "my-kanban-1581660954944.firebaseapp.com",
    databaseURL: "https://my-kanban-1581660954944.firebaseio.com",
    projectId: "my-kanban-1581660954944",
    storageBucket: "my-kanban-1581660954944.appspot.com",
    messagingSenderId: "207178438135",
    appId: "1:207178438135:web:d267ece9cd6cce09c1caf2"
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
export default {
    components: {
        LoginPage,
        RegisterPage,
        DisplayPage
    },
    data() {
        return {
            showloginpage: true,
            showprintpage: false,
            showregisterpage: false
        };
    },
    methods: {
        showregister() {
            this.showregisterpage = true;
            this.showloginpage = false;
        },
        register(form) {
            axios({
                method: "POST",
                url: "http://localhost:3000/user/register",
                data: {
                    email: form.email,
                    password: form.password,
                    name: form.name
                }
            })
                .then(data => {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("UserId", data.data.UserId);
                    this.showpage();
                })
                .catch(err => {
                    Swal.fire(err.response.data);
                });
        },
        login(form) {
            axios({
                method: "POST",
                url: `http://localhost:3000/user/login`,
                data: {
                    email: form.email,
                    password: form.password
                }
            })
                .then(data => {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("UserId", data.data.UserId);
                    this.showpage();
                })
                .catch(err => {
                    Swal.fire(err.response.data);
                });
        },
        showpage() {
            if (localStorage.token) {
                this.showprintpage = true;
                this.showloginpage = false;
                this.showregisterpage = false;
            } else {
                this.showprintpage = false;
                this.showloginpage = true;
                this.showregisterpage = false;
            }
        },
        signGoogle() {
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = {
                        email: result.user.email,
                        name: result.user.displayName
                    };
                    return axios({
                        method: "POST",
                        url: "http://localhost:3000/user/signgoogle",
                        data: {
                            user: user
                        }
                    });
                })
                .then(data => {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("UserId", data.data.UserId);
                    this.showpage();
                })
                .catch(function(error) {
                    Swal.fire(err.response.data);

                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
        }
    },
    created: function() {
        if (localStorage.token) {
            this.showprintpage = true;
            this.showloginpage = false;
            this.showregisterpage = false;
        } else {
            this.showprintpage = false;
            this.showloginpage = true;
            this.showregisterpage = false;
        }
    }
};
</script>

<style></style>
