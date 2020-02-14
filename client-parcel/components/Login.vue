<template>
  <div class="loginDiv">
    <div class="login">
      <h2>Login</h2>
      <br />
      <button style v-on:click="newLoginGoogle">
        <i class="fab fa-google"></i> | Sign In
      </button>
      <h3>---or---</h3>
      <div class="formAdd">
        <form method="POST" v-on:submit.prevent="newLogin()">
          <div class="inputDiv">
            <input type="email" v-model="email" placeholder="Enter Email.." />
          </div>
          <div class="inputDiv">
            <input type="password" v-model="password" placeholder="Enter Password.." />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <p>
        Doesn't have an account yet? Lets make it ez, just
        <a
          v-on:click.prevent="$emit('changePage', 'register')"
        >Create New Account</a> here..
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["loginGoogle", "login", "page"],
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    newLoginGoogle() {
      this.loginGoogle();
    },
    newLogin() {
      this.login(this.email, this.password);
    }
  }
};
</script>

<style>
</style>