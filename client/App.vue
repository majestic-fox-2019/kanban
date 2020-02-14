<template>
  <div>
    <FormLoginOrRegister 
      v-if="showLogin" 
      type="Sign In" 
      typechange="Register"
      :value="formlogin" 
      @submit="login"
      @googlelogin="googlelogin"
      @change="change('register')">
      </FormLoginOrRegister>

    <FormLoginOrRegister 
      v-if="showRegister" 
      type="Register" 
      typechange="Login"
      :value="formregister" 
      @submit="register"
      @googlelogin="googlelogin"
      @change="change('login')">
      </FormLoginOrRegister>

    <Navbar :value="isLogin" v-if="showNavbar" :islogin=isLogin @showmain=showMain></Navbar>

    <Categories 
      v-if="showNavbar"
      :islogin=isLogin 
      :modal="modal"
      ></Categories>

    <Modal 
      v-if="modal.showModal"
      :modal="modal"
      :islogin="isLogin"
      ></Modal>
  </div>
</template>

<script>
import Vue from "vue";
import Navbar from "./components/Navbar"
import FormLoginOrRegister from "./components/FormLoginOrRegister"
import Categories from "./components/Categories"
import Modal from "./components/Modal"
import { provider, firebase } from './apis/firebase'
import instance from './apis/axios'
import {Swal,Toast} from './apis/sweetalert'

export default {
  components:{
    FormLoginOrRegister,
    Navbar,
    Categories,
    Modal
  },
  data() {
    return {
      showLogin:true,
      showRegister:false,
      showNavbar:false, 
      formlogin:{
        email:"",
        password:""
      },
      formregister:{
        email:"",
        name:"",
        password:""
      },
      isLogin:{
        name:null,
        token:null
      },
      modal:{
        CategoryId:null,
        showModal:false,
      }
    };
  },
  mounted(){
    if(localStorage.token){
      this.isLogin = {
        name : localStorage.name,
        token : localStorage.token
      }
      this.showMain(true)
      
    }
  },
  methods:{
    change(type){
      if(type==='login'){
        this.showLogin = true
        this.showRegister = false
      }else{
        this.showLogin = false
        this.showRegister = true
      }
    },
    googlelogin(){
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        var name = user.displayName
        var email = user.email
        var password = email
        return instance
          .post('otherlogin',{
            email,
            name,
            password
          })
      })
      .then(response => {
        localStorage.token = response.data.token
        localStorage.name = response.data.name
        this.isLogin = {
          name : localStorage.name,
          token : localStorage.token
        }
        this.showMain(true)
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    },
    login(){
        instance
          .post('login',{
            email:this.formlogin.email,
            password:this.formlogin.password
          })
          .then(response => {
            localStorage.token = response.data.token
            localStorage.name = response.data.name
            this.isLogin = {
              name : localStorage.name,
              token : localStorage.token
            }
            this.showMain(true)
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            })
          })
      },
      register(){
        instance
          .post('register',{
            email:this.formregister.email,
            password:this.formregister.password,
            name:this.formregister.name
          })
          .then(response => {
            console.log(response.data)
            Swal.fire(
              'Success Register',
              'success' 
            )
          })
          .catch(err => {
            console.log(err.response)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            })
          })
      },
      showMain(isShow){
        if(isShow){
          this.showLogin = false
          this.showNavbar = true
        }else{
          this.showNavbar = false
          this.showLogin = true
        }
      },      
  },
};
</script>

<style>
</style>