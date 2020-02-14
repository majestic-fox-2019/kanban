<template>
  <section>
    <!-- login form -->
    <div id="loginForm" v-if="loginForm">
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">KANBAND</div>

            <div class="input-fields">
              <!-- <input type='text' placeholder='Username' class='input-line full-width'></input> -->
              <input
                type="email"
                placeholder="Email"
                class="input-line full-width"
                id="email"
                v-model="loginData.email"
              />
              <input
                type="password"
                placeholder="Password"
                class="input-line full-width"
                id="password"
                v-model="loginData.password"
              />
            </div>

            <div>
              <button class="ghost-round full-width" id="login" @click="loginHandle">Login</button>
              <button
                class="ghost-round full-width"
                id="register"
                @click="toRegister"
              >to Create Account</button>
              <button class="ghost-round full-width" id="google" @click="googleSign">Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end login form -->

    <!-- register form -->
    <div id="loginForm" v-if="registerForm">
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">KANBAND</div>

            <div class="input-fields">
              <input
                type="text"
                placeholder="Username"
                class="input-line full-width"
                id="name"
                required
                v-model="registerData.name"
              />
              <input
                type="email"
                placeholder="Email"
                class="input-line full-width"
                id="email"
                required
                v-model="registerData.email"
              />
              <input
                type="password"
                placeholder="Password"
                class="input-line full-width"
                id="password"
                required
                v-model="registerData.password"
              />
            </div>

            <div>
              <button
                class="ghost-round full-width"
                id="register"
                @click="registerHandle"
              >Create Account</button>
              <button class="ghost-round full-width" id="login" @click="toLogin">to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end logi form -->
  </section>
</template>

<script>
import axios from "axios";
const server = "http://localhost:3000";
import firebase from "firebase";
// import "firebase/auth";

// const firebaseConfig = require("../firbaseConfigAuth");
// firebase.initializeApp(firebaseConfig);

export default {
  name: "loginRegister",
  data() {
    return {
      loginForm: true,
      registerForm: false,
      loginData: {
        email: null,
        password: null
      },
      registerData: {
        name: null,
        email: null,
        password: null
      }
    };
  },
  methods: {
    toRegister() {
      this.loginForm = false;
      this.registerForm = true;
    },
    toLogin() {
      this.loginForm = true;
      this.registerForm = false;
    },
    loginHandle() {
      this.$emit("fromLogin", this.loginData);
    },
    registerHandle() {
      this.$emit("fromRegister", this.registerData);
    },
    googleSign() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...

          return axios({
            method: "post",
            url: `${server}/user/googleLogin`,
            data: {
              name: user.displayName,
              email: user.email
            }
          });
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$emit("googleSign");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error);
        });
    }
  }
};
</script>