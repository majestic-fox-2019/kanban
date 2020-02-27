<template>
  <div class="registerDiv">
    <div class="register">
      <h2>Register</h2>
      <br />
      <div class="formAdd">
        <form method="POST" v-on:submit.prevent="newRegister(name, email, password)">
          <div class="inputDiv">
            <input type="text" v-model="name" placeholder="Enter Name.." />
          </div>
          <div class="inputDiv">
            <input type="email" v-model="email" placeholder="Enter Email.." />
          </div>
          <div class="inputDiv">
            <input type="password" v-model="password" placeholder="Enter Password.." />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
      <br />
      <p>
        Feels have an account? Just go back, and
        <a
          v-on:click.prevent="$emit('changePage', 'login')"
        >Login to Your Account</a> here..
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: ["register"],
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    newRegister(name, email, password) {
      this.register(name, email, password);
    }
  }
};
</script>

<style>
</style>