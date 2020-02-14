<template>
  <div>
    <div v-if="login">
      <LoginForm @login="changeLogin($event)" />
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import LoginForm from "../components/loginForm";
export default {
  data() {
    return {
      login: true
    };
  },
  components: {
    LoginForm
  },
  methods: {
    changeLogin(event) {
      this.$emit("login", event);
    }
  }
};
</script>

<style>
</style>