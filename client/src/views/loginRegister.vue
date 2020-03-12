<template>
  <div>
    <login
      @showRegister="showRegister"
      @statusLoginTrue="loginStatusTrue"
      v-animate-css="'swing'"
      v-if="showWhat === 'login' && !statusLogin"
    ></login>
    <register
      @statusLoginTrue="statusLoginTrue"
      @showLogin="showLogin"
      v-animate-css="'swing'"
      v-if="showWhat === 'register' && !statusLogin"
    ></register>
  </div>
</template>

<script>
import login from "../components/login";
import register from "../components/register";
export default {
  props: ["whatStatusLogin", "whatShowLoginRegister"],
  data() {
    return {};
  },
  components: {
    login,
    register
  },
  computed: {
    showWhat: function() {
      return this.whatShowLoginRegister;
    },
    statusLogin: function() {
      return this.whatStatusLogin;
    }
  },
  methods: {
    showRegister() {
      this.$emit("showRegistrasi");
    },
    showLogin() {
      this.$emit("showLogin");
    },
    loginStatusTrue() {
      this.$emit("loginTrue");
    },
    statusLoginTrue() {
      this.$emit("loginTrue");
    }
  }
};
</script>

<style>
</style>