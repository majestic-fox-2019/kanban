<template>
  <v-app>
    <Navbar
      v-on:LOGOUT="logout"
      v-on:changeForm="changeForm"
      v-on:BACK="backHome"
      :isLogin="isLogin"
    ></Navbar>
    <div id="landingpage" v-if="!isLogin">
      <LandingPage
        :changeForm="register"
        v-on:LOGIN="login"
        v-on:REGISTER="registerUser"
      ></LandingPage>
    </div>
    <div id="mainpage" v-else>
      <MainPage
        :allProjects="allProjects"
        :home="home"
        v-on:FETCH_PROJECT="fetchUserProjects"
      ></MainPage>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'

const BASE_URL = 'http://localhost:3000'

export default {
  name: 'App',

  components: {
    Navbar,
    LandingPage,
    MainPage
  },

  data() {
    return {
      isLogin: false,
      register: false,
      allProjects: {
        personal: [],
        other: []
      },
      home: false
    }
  },
  methods: {
    changeForm() {
      this.register = !this.register
    },
    login(form) {
      axios
        .post(`${BASE_URL}/users/login`, form)
        .then(({ data }) => {
          this.isLogin = true
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          Swal.fire('Welcome', 'Login success', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    registerUser(form) {
      axios
        .post(`${BASE_URL}/users/register`, form)
        .then(({ data }) => {
          this.isLogin = true
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          Swal.fire('Welcome', 'Registration success', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    logout() {
      Swal.fire({
        title: 'Thank you',
        text: 'Logout Success',
        icon: 'success',
        timer: 1500
      })
      this.isLogin = false
      this.allProjects.personal = []
      this.allProjects.other = []
      localStorage.clear()
    },
    backHome() {
      this.home = !this.home
    },
    fetchUserProjects() {
      axios
        .get(`${BASE_URL}/projects`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.allProjects.personal = data.personal
          this.allProjects.other = data.other
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  watch: {
    isLogin: function(val, old) {
      if (val) {
        this.fetchUserProjects()
      }
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  }
}
</script>
