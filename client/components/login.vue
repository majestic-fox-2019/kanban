<template>
  <div v-show="loginpage">
    <h5>LOGIN PAGE</h5>
    <form v-on:submit.prevent="$emit('loginUser', login)">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model=" login.email" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model=" login.password" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  props: ["loginpage"],
  data: function() {
    return {
      login: {
        email: null,
        password: null
      }
    };
  }
};
</script>
