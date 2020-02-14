<template>
  <div>
    <div
      class="flex mx-auto bg-transparent border-0 animated slideInLeft fast"
      style="max-width:80%;"
      v-if="!onRegister"
    >
      <b-form
        class="mx-auto card p-5 my-5 bg-blue-300"
        @submit.prevent="getLogin"
      >
        <h2 class="text-center font-bold mb-5">Login</h2>
        <b-form-group label="Email:">
          <b-form-input
            v-model="login.email"
            type="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input
            v-model="login.password"
            type="password"
            placeholder="******"
          ></b-form-input>
        </b-form-group>

        <small class="flex justify-end">
          <a
            href="#"
            @click="toRegister"
            v-b-tooltip.hover
            title="To Register Page"
          >
            Register here
          </a>
        </small>
        <div class="flex flex-col justify-center mt-3">
          <b-button type="submit" variant="primary">LOGIN</b-button>
        </div>
        <p class="m-0 text-center my-1">OR</p>
        <b-button
          class="text-black"
          type="button"
          variant="dark"
          @click="gSignIn"
        >
          Continue with
          <i class="fab fa-google"></i>
          Google
        </b-button>
      </b-form>
    </div>
    <div
      class="flex mx-auto bg-transparent border-0 animated slideInRight fast"
      style="max-width:80%;"
      v-else
    >
      <b-form class="mx-auto card p-5 my-5" @submit.prevent="getRegister">
        <h2 class="text-center font-bold mb-5">Register</h2>
        <b-form-group label="Name:">
          <b-form-input
            v-model="register.name"
            type="text"
            placeholder="Your name"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email:">
          <b-form-input
            v-model="register.email"
            type="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input
            v-model="register.password"
            type="password"
            placeholder="******"
          ></b-form-input>
        </b-form-group>

        <small class="flex justify-end">
          <a href="#" @click="toLogin" v-b-tooltip.hover title="To Login Page">
            Login here
          </a>
        </small>
        <div class="flex justify-center mt-3">
          <b-button type="submit" variant="primary">Register</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
export default {
  name: 'Frontpage',
  data() {
    return {
      onRegister: null,
      login: {
        email: null,
        password: null
      },
      register: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    getLogin() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token
          localStorage.email = data.email
          localStorage.name = data.name
          this.$emit('login', true)
          this.$alertify.success('Login Success')
        })
        .catch((err) => {
          // console.log(err.response)
          this.$alertify.error(err.response.data)
        })
    },
    getRegister() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.token = data.token
          localStorage.email = data.email
          localStorage.name = data.name
          this.$emit('login', true)
          this.$alertify.success('Register Success')
        })
        .catch((err) => {
          if (Array.isArray(err.response.data)) {
            err.response.data.forEach((error) => {
              this.$alertify.error(error)
            })
          } else {
            this.$alertify.error(err.response.data)
          }
        })
    },
    gSignIn() {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('email')

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const token = result.credential.accessToken
          const user = result.user
          return axios({
            method: 'POST',
            url: 'http://localhost:3000/g-auth',
            data: {
              email: user.email,
              name: user.displayName
            }
          })
        })
        .then(({ data }) => {
          localStorage.token = data.token
          localStorage.email = data.email
          localStorage.name = data.name
          this.$emit('login', true)
          this.$alertify.success('Login Success')
        })
        .catch(function(error) {
          console.log(error)
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log(errorMessage)
        })
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log('Sign-out successful')
        })
        .catch(function(error) {
          // An error happened.
          console.log(error)
        })
    },
    toRegister() {
      this.login = {
        email: null,
        password: null
      }
      this.onRegister = true
    },
    toLogin() {
      this.register = {
        name: null,
        email: null,
        password: null
      }
      this.onRegister = false
    }
  }
}
</script>

<style></style>
