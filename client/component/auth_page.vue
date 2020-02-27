<template>
  <div class="container-fluid" id="auth-page">
    <div class="row">
      <div class="col-md-8 col-xs-12"></div>
      <login-form @hide="hide" @login="$emit('login')" v-if="showLogin"></login-form>
      <register-form @hide="hide" v-if="!showLogin"></register-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./login_form";
import Register from "./register_form";
export default {
  components: {
    "login-form": Login,
    "register-form": Register
  },
  data: function() {
    return {
      showLogin: true
    };
  },
  methods: {
    hide: function() {
      this.showLogin = !this.showLogin;
    }
  }
};
</script>

<style >
</style>