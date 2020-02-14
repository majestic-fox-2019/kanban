<template>
  <div id="login-page" class="col-md-12 bg-primary loginpage">
    <div class="col-md-4 mx-auto form-login-container">
      <h2 class="text-center text-primary pt-2">Kanban | Login</h2>
      <form @submit.prevent="doLogin">
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            placeholder="Put your email"
            v-model="form.email"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            placeholder="Put your password"
            v-model="form.password"
            class="form-control"
          />
        </div>
        <p v-if="error !== null" class="text-danger">{{ error }}</p>
        <button type="submit" class="btn full-width-btn btn-primary">
          Login
        </button>
        <br>
        <br>
        <p class="text-center text-muted">-- another login method --</p>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
        <br>
        <p class="pt-4 text-primary text-center">
          <a href="#" @click.prevent="redirectToRegister">Dont have account ? Register here</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios';

export default {
  name: "LoginPage",
  props : ['page', 'host'],
  components : {
    GoogleLogin
  },
  data() {
    return {
      params: {
          client_id: "543748565479-8umieqh89h0qcpf8k3ck0i9vacinnim0.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 410,
          height: 50,
          longtitle: true
      },
      error: null,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;

      axios({
        method : 'post',
        url : `${this.host}/users/google/login`,
        data : {
          token : id_token
        }
      })
      .then(response => {
        localStorage.id = response.data.id
        localStorage.token = response.data.token
        localStorage.email = response.data.email
        this.$parent.loginGoogle()
      })
      .catch(err => {
        console.log(err)
      })
    },
    doLogin() {
      const clearField = () => {
        this.form.email = ''
        this.form.password = ''
      }

      const showError = (message) => {
        this.error = message
      }

      this.$emit("login", {...this.form, clearField, showError});
    },
    redirectToRegister(){
      this.$parent.redirectAuthPage()
    }
  }
};
</script>

<style></style>
