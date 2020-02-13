
<template>
  <div id="app">
    <loginRegister
      @fromLogin="loginApp($event)"
      @fromRegister="registerApp($event)"
      v-if="!isLogin"
    ></loginRegister>
    <dashboard v-if="isLogin"></dashboard>
  </div>
</template>

<script>
import dashboard from "./components/Dasboard";
import loginRegister from "./components/Loginregister";
const server = "http://localhost:3000";

export default {
  el: "#app",
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
          console.log(this.isLogin);
        })
        .catch(err => {
          console.log(err);
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
          localStorage.token = data.token;
          this.isLogin = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>