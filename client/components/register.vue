<template>
  <div v-show="registerpage">
    <h5>REGISTRATION PAGE</h5>
    <form v-on:submit.prevent="$emit('registerUser', register)">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="nameRegister"
          name="nameRegister"
          v-model="register.name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="registerEmail"
          aria-describedby="emailHelp"
          name="emailRegister"
          v-model=" register.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="registerPassword"
          name="passwordRegister"
          v-model=" register.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSignIn"></GoogleLogin>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";
const server = "http://localhost:3000";

export default {
  name: "registrationPage",
  components: {
    GoogleLogin
  },
  props: ["registerpage"],
  data: function() {
    return {
      register: {
        name: null,
        email: null,
        password: null
      },
      params: {
        client_id: `31821651677-uorrrhti80raddfghfv72p72n03aoe8u.apps.googleusercontent.com`
      },
      renderParams: {
        width: 100,
        height: 30,
        longtitle: false
      }
    };
  },
  methods: {
    onSignIn(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      this.$emit("gsignin", id_token);
    }
  }
};
</script>