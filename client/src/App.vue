<template>
  <div>
    <div v-if="isLogin">
      <LoginRegister @login="changeLogin($event)" />
    </div>
    <div v-else>
      <Navbar @login="changeLogin($event)"></Navbar>
      <Home></Home>
    </div>
  </div>
</template>

<script>
import LoginRegister from "./view/Login-Register";
import Navbar from "./components/navbar";
import Home from "./view/Home";
export default {
  created() {
    this.checkLogin();
  },
  data() {
    return {
      isLogin: true
    };
  },
  components: {
    LoginRegister,
    Home,
    Navbar
  },
  methods: {
    changeLogin(event) {
      this.isLogin = event;
    },
    checkLogin() {
      if (localStorage.getItem("access_token")) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    }
  }
};
</script>

<style>
</style>