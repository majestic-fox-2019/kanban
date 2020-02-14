
<template>
  <div id="app">
    <loginRegister
      @fromLogin="loginApp($event)"
      @fromRegister="registerApp($event)"
      @googleSign="isLogin=true"
      v-if="!isLogin"
    ></loginRegister>
    <dashboard @logout="isLogin=false" v-if="isLogin"></dashboard>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import dashboard from "./components/Dasboard";
import loginRegister from "./components/Loginregister";
const server = "http://localhost:3000";

export default {
  el: "#app",
  name: "parent",
  components: {
    dashboard: dashboard,
    loginRegister: loginRegister
  },
  data() {
    return {
      isLogin: false
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      // this.showAllTask();
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    loginApp(fromLoginApp) {
      this.loginUser(fromLoginApp);
    },
    registerApp(fromRegisterApp) {
      this.registerUser(fromRegisterApp);
    },
    loginUser(fromLoginApp) {
      axios({
        method: "post",
        url: `${server}/user/login`,
        data: {
          email: fromLoginApp.email,
          password: fromLoginApp.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data;
          this.isLogin = true;
          // console.log(this.isLogin);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back bebs",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
            // footer: "<a href>Why do I have this issue?</a>"
          });
        });
    },
    registerUser(registerApp) {
      axios({
        method: "post",
        url: `${server}/user/register`,
        data: {
          name: registerApp.name,
          email: registerApp.email,
          password: registerApp.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data;
          this.isLogin = true;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
            // footer: "<a href>Why do I have this issue?</a>"
          });
        });
    }
  }
};
</script>

<style>
</style>