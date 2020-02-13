<template>
  <div>
    <NavBar></NavBar>
    <div>
      <div class="d-flex mx-auto">
        <div class="col left">
          <img
            src="../assets/undraw_code_thinking_1jeh.svg"
            class="img-fluid animated fadeInLeftBig gambarnya"
            alt
          />
        </div>
        <div class="col right animated fadeInRightBig">
          <mdb-alert color="danger" class="errmsg" v-if="errorMSG.length > 0">{{errorMSG}}</mdb-alert>
          <div v-if="attempt == 'login'">
            <form v-on:submit.prevent="loginNow">
              <p class="h4 text-center mb-4">Log in</p>
              <div class="grey-text">
                <mdb-input label="Your email" v-model="email" icon="envelope" type="email" />
                <mdb-input label="Your password" v-model="password" icon="lock" type="password" />
              </div>
              <div class="text-center">
                <mdb-btn class="buttonnya" type="submit" color="default">Submit</mdb-btn>
              </div>
              <div class="d-flex mx-auto justify-content-around">
                <gsignin @googleLogin="emitGoogleLogin"></gsignin>
                <h6>
                  or register
                  <a class="link" href="#" v-on:click="changeAttempt('register')">Here</a>
                </h6>
              </div>
            </form>
            <mdb-btn class="btn-fb" icon="facebook-f" @click="facebook" fab size="lg">Facebook</mdb-btn>
            <mdb-btn class="btn-tw" icon="twitter" fab size="lg" @click="twitter">Twitter</mdb-btn>
            <mdb-btn class="btn-git" icon="github" fab size="lg" @click="github">Github</mdb-btn>
          </div>
          <div v-else>
            <form v-on:submit.prevent="registerNow">
              <p class="h4 text-center mb-4">Sign up</p>
              <div class="grey-text">
                <mdb-input label="Your name" v-model="username" icon="user" type="text" />
                <mdb-input label="Your email" v-model="email" icon="envelope" type="email" />
                <mdb-input label="Your password" icon="lock" v-model="password" type="password" />
                <mdb-input
                  label="Confirm your password"
                  v-model="passwordConfirm"
                  icon="exclamation-triangle"
                  type="password"
                />
              </div>
              <div class="text-center">
                <mdb-btn class="buttonnya" type="submit" color="default">Submit</mdb-btn>
              </div>
              <div class="d-flex mx-auto justify-content-end">
                <h6>
                  or Login
                  <a class="link" href="#" v-on:click="changeAttempt('login')">Here</a>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import GSignInButton from "vue-google-signin-button";
import gsignin from "./googleSignin";
import { ToastPlugin } from "bootstrap-vue";
import axios from "axios";
import { mdbInput, mdbBtn, mdbContainer, mdbAlert } from "mdbvue";
import NavBar from "./Navbar";
import Swal from "sweetalert2";
export default {
  name: "UserPage",
  components: {
    NavBar,
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbAlert,
    gsignin
  },
  data() {
    return {
      attempt: "login",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      // baseURL: "http://localhost:3000",
      baseURL: this.$baseUrl,
      errorMSG: ""
    };
  },
  methods: {
    changeAttempt(status) {
      this.errorMSG = "";
      this.attempt = status;
      this.username = "";
      this.email = "";
      this.password = "";
      this.passwordConfirm = "";
    },
    registerNow() {
      let username = this.username;
      let email = this.email;
      let password = this.password;
      let passwordConfirm = this.passwordConfirm;
      if (password !== passwordConfirm) {
        this.makeToast("danger");
      } else {
        axios({
          method: "post",
          url: `${this.baseURL}/user/register`,
          data: {
            email,
            username,
            password
          }
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.userRegistered.username);
            localStorage.setItem("userId", data.userRegistered.id);

            this.$emit("register");
          })
          .catch(err => {
            this.errorMSG = err.response.data;
          });
      }
    },
    makeToast(warna) {
      this.$bvToast.toast("Password does not match", {
        title: `Variant ${warna || "default"}`,
        variant: warna,
        solid: true
      });
    },
    loginNow() {
      let email = this.email;
      let password = this.password;
      axios({
        url: `${this.baseURL}/user/login`,
        method: "post",
        data: {
          password,
          email
        }
      })
        .then(({ data }) => {
          localStorage.setItem("userId", data.userFound.id);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.userFound.username);
          this.$emit("login");
          // console.log(this.$socket, "ini object socketnta");
          this.$socket.emit(
            "logged in",
            `${localStorage.getItem("username")} has logged in`
          );
        })
        .catch(err => {
          this.errorMSG = err.response.data;
          console.log(err, "<<ini error di fungsi login");
        });
    },
    emitGoogleLogin() {
      this.$emit("login");
    },
    facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // console.log("berubah yaaa");
          // console.log(result.additionalUserInfo.profile, "<<");
          axios({
            method: "POST",
            url: `${this.baseURL}/user/facebook`,
            data: {
              email: result.additionalUserInfo.profile.email,
              username: result.additionalUserInfo.profile.name,
              password: result.additionalUserInfo.profile.id
            }
          }).then(({ data }) => {
            localStorage.setItem("userId", data.userFacebook.id);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.userFacebook.username);
            this.$emit("login");
          });
        })
        .catch(err => {
          // console.log(err, "<< errnya facebook");
        });
    },
    twitter() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          var user = result.user;
          // console.log(result.additionalUserInfo.username);
          axios({
            method: "POST",
            url: `${this.baseURL}/user/twitter`,
            data: {
              email: result.additionalUserInfo.profile.email,
              username: result.additionalUserInfo.username,
              password: result.additionalUserInfo.username
            }
          }).then(({ data }) => {
            localStorage.setItem("userId", data.userTwitter.id);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.userTwitter.username);
            this.$emit("login");
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(error);
        });
    },
    github() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(result, "<< ini punya github");
          console.log(result.user.email, "<<< ini emailnya");
          // ...
          axios({
            method: "POST",
            url: `${this.baseURL}/user/github`,
            data: {
              email: result.user.email,
              username: result.additionalUserInfo.username,
              password: result.additionalUserInfo.username
            }
          }).then(({ data }) => {
            localStorage.setItem("userId", data.userGithub.id);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.userGithub.username);
            this.$emit("login");
          });
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
        });
    }
  },
  created() {}
};
</script>

<style scoped>
.left,
.right {
  height: 90vh;
  /* background-color: pink; */
}

.right {
  padding-top: 20vh;
}
.gambarnya {
  padding-top: 20vh;
  padding-left: 3vw;
}
h6 {
  font-size: 20px;
}

.buttonnya {
  color: white;
}
a,
.link {
  color: blue;
}
.errmsg {
  font-size: 20px;
}
</style>