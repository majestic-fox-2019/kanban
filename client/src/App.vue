<template>
  <div>
    <div v-if="!isLogin">
      <UserPage @logout="checkLogin" @register="checkLogin" @login="checkLogin"></UserPage>
    </div>
    <div v-if="isLogin">
      <MainPage @logout="checkLogin" @logoutya="checkLogin"></MainPage>
    </div>
  </div>
</template>

<script>
import UserPage from "./components/UserPage";
import MainPage from "./components/MainPage";
export default {
  name: "app",
  data() {
    return {
      isLogin: false
    };
  },
  components: {
    UserPage,
    MainPage
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  },
  created() {
    this.checkLogin();
    // let socket = io.connect("http://localhost:3000")
  }
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
@import "../style.scss";
</style>