<template>
  <div id="app">
    <login-page 
      :active="loginPage"
      :data_form_login="formLogin"
      :data_form_register="formRegister"
    ></login-page>
    <div class="main-page" :style="{display: mainPage ? 'block' : 'none'}">
      <main-navbar @mainpage="getMainPage(false)" @loginpage="getLoginPage(true)" :data_name="name"></main-navbar>
      <main-board :dataTask="taskList" :data_email="email"></main-board>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoginPage from './components/Login'
import MainNavbar from './components/Navbar/Navbar'
import MainBoard from './components/Boards/Board'
import { url } from './mixins/mixins'

import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAGlYBNl4qbOrwPuWSbULQD9FIYv6PMoNM",
  authDomain: "kanban-83af9.firebaseapp.com",
  databaseURL: "https://kanban-83af9.firebaseio.com",
  projectId: "kanban-83af9",
  storageBucket: "kanban-83af9.appspot.com",
  messagingSenderId: "506791450855",
  appId: "1:506791450855:web:7059088144c72db281ea42",
  measurementId: "G-2G5ESKNMGM"
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();

export default {
  mixins: [url],
  components: {
    'login-page': LoginPage,
    'main-navbar': MainNavbar,
    'main-board': MainBoard
  },
  data(){
    return {
      loginPage: true,
      mainPage: false,
      formLogin: {
        email: null,
        password: null
      },
      formRegister: {
        name: null,
        email: null,
        password: null
      },
      taskList: [],
      name: null,
      email: null
    }
  },
  created(){
    this.checkLocalStorage()
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    liveTask(){
      this.getTaskList()
      console.log('masuk')
    }
  },
  methods: {
    checkLocalStorage(){
      if(!localStorage.getItem('token')){
        this.loginPage = true
        this.mainPage = false
      }else{
        this.name = localStorage.getItem('name')
        this.email = localStorage.getItem('email')
        this.loginPage = false
        this.getTaskList()
        this.mainPage = true
      }
    },
    getMainPage(bool){
      this.mainPage = bool
    },
    getLoginPage(bool){
      this.loginPage = bool
    },
    getTaskList(){
      let self = this
      let token = localStorage.getItem('token')
      axios.get(`${this.url}/tasks`, 
      {
        headers: { Bearer: token }
      })
      .then(res => {
        this.taskList = res.data.payload
      })
      .catch(err => {
        console.log(err)
      })
    },
    doLogin(){
      let self = this
      if(self.formLogin.email === null || self.formLogin.password === null){
        self.notif('error', 'Email or password must be filled')
      }else{
        let dataLogin = {
          email: self.formLogin.email,
          password: self.formLogin.password
        }
        axios.post(`${self.url}/login`, dataLogin)
        .then(res => {
          self.notif('success', 'Login successfull')
          self.clearForm(self.formLogin)
          localStorage.setItem('token', res.data.payload.Token)
          localStorage.setItem('name', res.data.payload.users.name)
          localStorage.setItem('email', res.data.payload.users.email)
          self.name = localStorage.getItem('name')
          self.email = localStorage.getItem('email')
          self.isLogin = true
          self.loginPage = false
          self.mainPage = true
          self.checkLocalStorage()
        })
        .catch(err => {
          self.notif('error', 'Email or Password wrong!')
        })
      }
    },
    doGoogleSignIn(){
      let self = this
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        let objUser = {
          name: user.displayName,
          email: user.email
        }
        axios.post(`http://localhost:3000/login/gsignin`, objUser)
        .then(res => {
          self.notif('success', 'Login successfull')
          localStorage.setItem('token', res.data.payload.Token)
          localStorage.setItem('name', res.data.payload.users.name)
          localStorage.setItem('email', res.data.payload.users.email)
          self.name = localStorage.getItem('name')
          self.email = localStorage.getItem('email')
          self.isLogin = true
          self.loginPage = false
          self.mainPage = true
          self.checkLocalStorage()
        })
      }).catch(function(error) {
        self.notif('error', 'Login failed!')
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
      });
    },
    doRegister(){
      let self = this
      if(self.formRegister.name === null || self.formRegister.email === null || self.formRegister.password === null){
        self.notif('error', 'Name, email or password must be filled')
      }else{
        let dataRegister = {
          name: self.formRegister.name,
          email: self.formRegister.email,
          password: self.formRegister.password
        }
        axios.post(`${self.url}/register`, dataRegister)
        .then(res => {
          self.notif('success', 'Register successfull')
          self.clearForm(self.formRegister)
          self.checkLocalStorage()
        })
        .catch(err => {
          self.notif('error', 'Register failed!')
        })
      }
    },
    clearForm(form){
      for(let key in form){
        form[key] = null
      }
    },
    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    }
  }
}
</script>

<style>
  
</style>
