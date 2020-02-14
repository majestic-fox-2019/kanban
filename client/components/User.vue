<template>
  <div class="loginRegisterPage">
    <div class="login-wrap" >
      <div class="login-html">
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
        <div class="login-form">
          <div class="sign-in-htm" >
            <form @submit.prevent="$emit('login', loginForm)">
              <div class="group">
                <label for="email" class="label">Email</label>
                <input v-model="loginForm.email" id="user" type="text" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input v-model="loginForm.password" id="pass" type="password" class="input" data-type="password">
              </div>
              <br>
              <div class="group">
                <input type="submit" class="button" value="Sign In">
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">
                <GoogleLogin class="g-signin2" :params="params" :onSuccess="onSuccess">Login</GoogleLogin>
              </div>
            </form>
          </div>
          <div class="sign-up-htm">
            <form @submit.prevent="$emit('register', regisForm)">
            <div class="group">
              <label for="user" class="label">Name</label>
              <input v-model="regisForm.name" id="user" type="text" class="input">
            </div>
            <div class="group">
              <label for="pass" class="label">Email Address</label>
              <input v-model="regisForm.email" id="pass" type="email" class="input">
            </div>
            <div class="group">
              <label for="pass" class="label">Password</label>
              <input v-model="regisForm.password" id="pass" type="password" class="input" data-type="password">
            </div>
            <div class="group">
              <input type="submit" class="button" value="Sign Up">
            </div>
            <div class="hr"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from 'axios'

export default {
  name: 'LoginRegisterPage',
  components: {
    GoogleLogin
  },
  data: function(){
    return {
      regisForm: {
        name: null,
        email: null,
        password: null
      },
      loginForm: {
        email: null,
        password: null
      },
      params: {
          client_id: "352438846589-k6i88km8que66tr7hfmb7h6vpn9p482v.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
    }
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      let id_token = googleUser.getAuthResponse().id_token;
      this.$emit('logingoogle', id_token)
    }
  }
  
}
</script>

<style scoped>

</style>