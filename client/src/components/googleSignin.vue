<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >Sign in with Google</g-signin-button>
</template>
 
<script>
import axios from "axios";
export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "733475019943-k1nirgu710kktvdbnd9ut50fqdj41pu5.apps.googleusercontent.com"
      },
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: `${this.baseUrl}/user/google`,
        method: "POST",
        data: {
          id_token
        }
      }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.userFromGoogle.username);
        localStorage.setItem("userId", data.userFromGoogle.id);
        this.$emit("googleLogin");
      });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  }
};
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
.g-signin-button:hover {
  cursor: pointer;
}
</style>