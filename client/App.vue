<template>
  <div>
      
    <formPage 
      v-show="showLogin"
      :value="formData"
      @loginuser="loginUser" 
      @registeruser="registerUser" 
      :error="showErrorLogin"
      @facebook="facebookLogin"
      @google="googleLogin"
      >
    </formPage>
      

    <homePage 
      v-show="showHomePage"
      @load="load"
      @logout="logout" 
      :categories="homeData.categoriesData" 
      :useremail="homeData.userEmail" 
      @backstep="backStep" 
      @nextstep="nextStep"
      @deletetask="deleteTask"
      @addtask="addTask">
    </homePage>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSocketIOExt from "vue-socket.io-extended";
import io from 'socket.io-client';
import homePage from "./components/MainPage";
import formPage from "./components/Form";
import {firebase, provider} from "./firebase"


// var url = `http://localhost:3000`
var url = `https://sleepy-bastion-70749.herokuapp.com`


const socket = io(url);

Vue.use(VueSocketIOExt, socket);

export default Vue.extend({
  name:"mainApp",
  components:{
    homePage,
    formPage
  },
  data() {
    return {
      formData:{
        username: "",
        email: "",
        password: ""
      },
      showLogin: true,
      showErrorLogin: false,
      showHomePage: false,
      formType: "login",
      homeData: {
        categoriesData: [],
        userEmail: localStorage.useremail
      }
    };
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    check(val) {
      this.load()
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  created(){
    if(localStorage.token){
      this.showLogin = false
      this.showHomePage = true
      this.load()
    }else{
      this.showHomePage = false
      this.showLogin = true
    }
  },
  methods:{
    clickButton(val) {
      this.$socket.client.emit('emit_method', val);
    },
    loginUser: function() {
      axios.post(`${url}/user/login`, {
          email: this.formData.email,
          password: this.formData.password
      })
        .then((response) =>{
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('useremail', response.data.email)
          this.setLogin()
        })
        .catch((error)=> {
          this.showErrorLogin = true
        });
    },
    googleLogin: function(){
      firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        console.log(result)
        var user = result.user;
        return axios.post(`${url}/user/googlelogin`, {
            username: user.displayName,
            email: user.email
        })
      })
      .then((response)=> {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('useremail', response.data.email)
        this.setLogin()
       
      })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error.response)
      });
    },
    setLogin: function(){
      this.showLogin = false
      this.showHomePage = true
      this.load()
      Swal.fire({
        toast: true,
        position: 'top-end',
        text: "logged in",
        timerProgressBar:true,
        showConfirmButton: false,
        width: 100,
        timer: 1000
      })
    },
    facebookLogin: function(){
      FB.login(function(response) {
        if (response.status === 'connected') {
          FB.api(
            '/'+response.authResponse.userID+'/?fields=id,name,email','GET',{},
            function(response) {
              let name = response.name;
              let email = response.email;
              axios.post(`${url}/user/facebooklogin`, {
                data:{
                  username: name,
                  email
                }
              })
              .then(login=>{
                localStorage.setItem('token', login.data.token)
                localStorage.setItem('useremail', login.data.email)
                console.log('face')
                this.setLogin()
              })
              .catch(err=>{
                console.log(`Fail login to facebook`)
              })
            }
          )
          console.log(`Success login to facebook`)
        } else {
          console.log(`Failed login to facebook`)
        }
      }, {scope: 'public_profile,email', auth_type: 'reauthenticate'});
    },
    registerUser: function() {
      axios.post(`${url}/user/register`, {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
      })
        .then((response) =>{
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('useremail', response.data.email)
          this.setLogin()
        })
        .catch((error)=> {
          this.showErrorLogin = true
        });
    },
    load: function(){
      console.log('load')
      axios.get(`${url}/task`, {
        headers: {token: localStorage.token}
        })
          .then((response)=> {
            this.homeData.userEmail = localStorage.useremail
            this.homeData.categoriesData = response.data
          })
          .catch((error)=> {
          });
    },
    deleteTask: function(id){
      let status = confirm("are you sure want to delete this task?")
      if(status){
        axios({
          url: `${url}/task/${id}`,
          method: "DELETE",
          headers: {token: localStorage.token},
        })
        .then(deleted=>{
          Swal.fire({
            toast: true,
            position: 'top',
            text: "task deleted",
            timerProgressBar:true,
            showConfirmButton: false,
            width: 100,
            timer: 1000
          })
          this.load()
        })
        .catch(error=>{
          Swal.fire("Oops!", "You Don't Have Access!", "warning")
        })
      }else{
        console.log('cancel')
      }
    },
    addTask: function(category) {
      console.log('add')
      axios({
        url:`${url}/task`, 
        method:'POST',
        headers: {token: localStorage.token},
        data:{
          category: category.category,
          title: category.title
        }
      })
        .then((response)=> {
          this.load()
        })
        .catch((error)=> {
          Swal.fire("Oops!", "You Don't Have Access!", "warning")
        }) 
    },
    backStep: function(id) {
      let status = confirm("are you sure want to move this task?")
      if(status){
        axios({
          url:`${url}/task/${id}`, 
          method:'PUT',
          headers: {token: localStorage.token},
          data:{
            move: 'back'
          }
        })
          .then((response)=> {
            this.load()
            Swal.fire({
              toast: true,
              position: 'top',
              text: "task moved",
              timerProgressBar:true,
              showConfirmButton: false,
              width: 100,
              timer: 700
            })
          })
          .catch((error)=> {
            Swal.fire("Oops!", "You Don't Have Access!", "warning")
            console.log(`gagal update`)
          }) 
      }else{
        console.log(`cancel update`)
      }
    },
    nextStep: function(id) {
      let status = confirm("are you sure want to move this task?")
      if(status){
        axios({
          url:`${url}/task/${id}`, 
          method:'PUT',
          headers: {token: localStorage.token},
          data:{
            move: 'next'
          }
        })
          .then((response)=> {
            this.load()
            Swal.fire({
              toast: true,
              position: 'top',
              text: "task moved",
              timerProgressBar:true,
              showConfirmButton: false,
              width: 100,
              timer: 700
            })
          })
          .catch((error)=> {
            Swal.fire("Oops!", "You Don't Have Access!", "warning")
            console.log(`gagal update`)
          }) 
      }else{
        console.log(`cancel update`)
      }
    },
    logout: function(e){
      localStorage.clear()
      this.showLogin = true
      this.showHomePage = false
      FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                // document.location.reload();
                console.log(`logged out from facebook`)
            });
        }
      });
      Swal.fire({
        toast: true,
        position: 'top-end',
        text: "logged out",
        timerProgressBar:true,
        showConfirmButton: false,
        width: 100,
        timer: 1000
      })
    }
  },
  watch: {
    showLogin: function(){
      this.formData.email = '',
      this.formData.password = ''
    }
  }
})
</script>

<style>

</style>