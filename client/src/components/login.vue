<template>
  <div>
    <div class="login">
      <loading :active.sync="isLoading"></loading>
      <form method="post" @submit.prevent="signin">
        <input v-model="email" type="text" placeholder="email" id="email" />
        <input v-model="password" type="password" placeholder="password" id="password" />
        <a style="cursor:pointer" @click="goSignup()" class="signUp">Dont have account? Sign Up</a>
        <input type="submit" value="Sign In" />
      </form>
      <h2
        style="margin-top: 10px; font-size: 15px;margin-left: 73px;"
        class="signUp"
      >Login With Social Media</h2>
    </div>
    <div class="shadow"></div>
    <button
      class="google"
      social="google"
      content="Google"
      icon="google"
      color="teal"
      @click.prevent="onSignIn"
    >
      <i class="fab fa-google"></i>
    </button>
    <button
      class="github"
      social="github"
      content="github"
      icon="github"
      color="steal"
      @click.prevent="signInGithub"
    >
      <i class="fab fa-github"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import firebase from "firebase";
export default {
  data() {
    return {
      isLoading: false,
      email: "",
      password: ""
    };
  },
  components: {
    Loading
  },
  methods: {
    goSignup() {
      this.$emit("showRegister");
    },
    signInGithub() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          return axios({
            method: "post",
            url: "http://localhost:3000/users/login/github",
            data: {
              email: result.user.email,
              name: result.user.displayName
            }
          });
        })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("id", result.data.user.id);
          localStorage.setItem("name", result.data.user.name);
          this.$root.nama = result.data.user.name;

          this.$emit("statusLoginTrue");
        })
        .catch(function(error) {
          const errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage
          });
        });
    },
    onSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          return axios({
            method: "post",
            url: "http://localhost:3000/users/login/google",
            data: { idToken: GoogleUser.getAuthResponse().id_token }
          });
        })
        .then(({ data }) => {
          setTimeout(() => {
            this.isLoading = false;
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            this.$root.nama = data.user.name;
            this.$emit("statusLoginTrue");
          }, 1000);
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    },
    signin() {
      this.isLoading = true;
      axios({
        url: "http://localhost:3000/users/login",
        method: "post",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.isLoading = false;
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            this.$root.nama = data.user.name;
            this.$emit("statusLoginTrue");
          }, 1000);
        })
        .catch(({ response }) => {
          setTimeout(() => {
            this.isLoading = false;
            if (this.email === "" || this.password === "") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "please fill email/password"
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data
              });
            }
          }, 1000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
%cool-button {
  display: block;
  font-family: Arial, "Helvetica", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  outline: none;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px #37a69b;
  padding-top: 6px;
  position: relative;
  background-color: #37a69b;
  border-radius: 5px;
  box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #497a78,
    0px 10px 5px #999;
}
.google {
  @extend %cool-button;
  box-shadow: 0 0 4px 1px rgba(55, 166, 155, 0.3);
  outline: 0;
  width: 50px;
  height: 35px;
  margin-left: 43%;
  margin-top: -68px;
}

.github {
  @extend %cool-button;
  box-shadow: 0 0 4px 1px rgba(55, 166, 155, 0.3);
  outline: 0;
  width: 50px;
  height: 35px;
  margin-left: 49%;
  margin-top: -36px;
}

.login {
  background: #eceeee;
  box-shadow: 0 42px 150px 0 rgba(0, 0, 0, 0.2),
    0 40px 70px 0 rgba(0, 0, 0, 0.19);
  border: 2px solid #696a6d6c;
  border-radius: 6px;
  height: 330px;
  margin: 150px auto 0;
  width: 298px;
}

input[type="password"],
input[type="text"] {
  border-radius: 10px;
  box-shadow: 0 1px #fff;
  box-sizing: border-box;
  color: #696969;
  height: 40px;
  margin: 31px 0 0 29px;
  padding-left: 15px;
  padding-right: 15px;
  transition: box-shadow 0.3s;
  width: 240px;
}
input[type="password"]:focus,
input[type="text"]:focus {
  box-shadow: 0 0 4px 1px rgba(55, 166, 155, 0.3);
  outline: 0;
}
.show-password {
  display: block;
  height: 16px;
  margin: 26px 0 0 28px;
  width: 87px;
}
.signUp {
  color: #7f7f7f;
  margin-left: 35px;
  font: 12px/1 sans-serif;
  position: relative;
  text-decoration: none;
  top: 10px;
  transition: color 0.4s;
}
.signUp:hover {
  color: #8c9595ad;
}
input[type="submit"] {
  width: 240px;
  height: 35px;
  @extend %cool-button;
  margin: 29px 0 0 29px;
}

.shadow {
  background: #000;
  border-radius: 4px 4px 15px 15px;
  height: 14px;
  margin: auto;
  opacity: 0.2;
  width: 295px;
}

input[type="submit"]:active {
  top: 3px;
  box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #31524d,
    0px 5px 3px #999;
}
</style>