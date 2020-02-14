<template>
  <div id="app">
    <div>
      <div class="col-md-3 pt-3 toaster" :style="{ display : toaster !== null ? 'block' : 'none'}">
        <div class="alert alert-info" role="alert">
          {{ toaster }}
        </div>
      </div>
    </div>
    <div v-if="page.login">
    <LoginPage v-on:login="login" :host="host" />
    </div>
    <div v-if="page.register">
      <RegisterPage :register_data = register />
    </div>
    <div v-if="page.main">
      <MainPage 
      @logout="logout" 
      :email="email" 
      :host="host" 
      :toaster="toaster" />
    </div>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MainPage from './components/MainPage'
import axios from "axios";

export default {
  name: "app",
  components: {
    MainPage,
    LoginPage,
    RegisterPage
  },
  data() {
    return {
      host: "https://dawet-kanban.herokuapp.com",
      toaster : null,
      email : '',
      page: {
        login: true,
        register: false,
        main: false
      },
      register : {
        form : {
          name : '',
          email : '',
          password : ''
        },
        error : {
        status : false,
        errorMessage : {
          name : '',
          email : '',
          password : ''
        },
        errorClass : {
          name : '',
          email : '',
          password : ''
        }
      }
      }
    };
  },
  mounted(){
    if(localStorage.token){
      this.page.register = false
      this.page.login = false
      this.page.main = true
      this.email = localStorage.email
    }else{
      this.page.register = false
      this.page.login = true
      this.page.main = false
    }
  },
  methods: {
    login(form) {
      const data = {
        email: form.email,
        password: form.password
      };

      return axios
        .post(`${this.host}/users/login`, data)
        .then(response => {
          this.page.login = false
          this.page.main = true
          this.toaster = 'Sucessfully login!'
          localStorage.email = response.data.email
          localStorage.token = response.data.token;
          form.clearField()
          setTimeout(() => {
              this.toaster = null
          }, 2000);
        })
        .catch(err => {
          form.showError(err.response.data)
        });
    },
    doRegister(){
      const data = {
        name: this.register.form.name,
        email: this.register.form.email,
        password: this.register.form.password
      };

      this.clearValidation(this.register.error.errorClass)

      axios
        .post(`${this.host}/users/register`, data)
        .then(response => {
          this.toaster = 'Sucessfully registered as a user !'

          setTimeout(() => {
              this.toaster = null
          }, 2000);

          this.clearField(this.register.form)
        })
        .catch(err => {
          this.register.error.status = true
          this.register.error.errorMessage = err.response.data
          this.showError(this.register.form, this.register.error)
        });
    },
    googleSignOut(){
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
          console.log('User signed out.');
      })
    },
    logout (){
      localStorage.clear()
      this.googleSignOut()
      this.page.login = true
      this.page.main = false
      this.toaster = 'Sucessfully logout!'

      setTimeout(() => {
          this.toaster = null
      }, 2000);
    },
    loginGoogle(){
      this.page.login = false
      this.page.main = true
      this.email = localStorage.email
    },
    redirectAuthPage(){
      console.log(this.page)
      this.page.login = this.page.login ? false : true
      this.page.register = this.page.register ? false : true
    },
    showError : function(errorObject, state){
      for(let key in errorObject){
        if(errorObject[key] === ''){
          state.errorClass[key] = 'is-invalid'
        }
      }
    },
    clearValidation : function(objectValidation){
      for(let key in objectValidation){
        objectValidation[key] = ''
      }
    },
    clearField: function(field){
      for(let key in field){
        field[key] = ''
      }
    }
  }
};
</script>

<style></style>
