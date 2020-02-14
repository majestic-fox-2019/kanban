<template>
    <div>
    <div class="text-center signin" v-if="page=='login'">
        <form class="form-signin" v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmailSignIn" class="sr-only">Email address</label>
          <input type="email" id="inputEmailSignIn" class="form-control" placeholder="Email address" v-model="email" required autofocus>
          <label for="inputPasswordSignIn" class="sr-only">Password</label>
          <input type="password" id="inputPasswordSignIn" class="form-control" placeholder="Password" v-model="password" required>
          <button class="btn btn-lg btn-info btn-block" type="submit">Sign in</button>
          <button class="btn btn-lg btn-secondary btn-block" v-on:click.prevent="gotoRegister">Register</button>
          <hr>
          <button class="btn btn-md btn-primary btn-block" v-on:click.prevent="googleSignIn">Google sign in</button>
          <a href="https://github.com/login/oauth/authorize?client_id=d3457504a716d46f2104">
            <img src="../assets/github.png" width="50" style="margin-top: 10px;" alt="github">
          </a>
          <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
    </div>

    <div class="text-center register" v-if="page=='register'">
        <form class="form-register" v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Here to register</h1>
          <label for="inputEmailRegister" class="sr-only">Email address</label>
          <input type="email" id="inputEmailRegister" class="form-control" placeholder="Email address" v-model="email" required autofocus>
          <label for="inputPasswordRegister" class="sr-only">Password</label>
          <input type="password" id="inputPasswordRegister" class="form-control" placeholder="Password" v-model="password" required>
          <button class="btn btn-lg btn-warning btn-block" type="submit">Register</button>
          <button class="btn btn-lg btn-secondary btn-block" v-on:click.prevent="gotoLogin">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000'

export default {
    name: 'register-login',
    data: function() {
        return {
            page: 'login',
            email: '',
            password: '',
        }
    },
    mounted: function() {

},
    methods: {
        gotoRegister(){
            this.page = 'register'
        },
        gotoLogin(){
            this.page = 'login'
        },
        register() {
            axios({
              url: `${baseURL}/register`,
              method: 'POST',
              data: {
                email: this.email,
                password: this.password,
              }
            })
            .then(({ data }) => {
              localStorage.setItem('token', data.token)
              localStorage.setItem('email', data.email)
              this.email = ''
              this.password = ''
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success Register ' + data.email,
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('afterRegisterLogin', data)
              
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
        },

        login() {
            axios({
              url: `${baseURL}/login`,
              method: 'POST',
              data: {
                email: this.email,
                password: this.password,
              },
            })
            .then(({ data }) => {
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.email)
              this.email = ''
              this.password = ''
              this.$emit('afterRegisterLogin', data)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success Login ' + data.email,
                showConfirmButton: false,
                timer: 1500
              })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
        },

        googleSignIn() {
            this.$gAuth
            .signIn()
            .then(googleUser => {
              const id_token = googleUser.getAuthResponse().id_token
              return axios({
                url: `${baseURL}/googlesignin`,
                method: 'POST',
                data: {
                id_token: id_token
              },
            })
            .then(({ data }) => {
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.email)
              this.password = ''
              this.page = 'kanban'
              this.email = data.email
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success Login ' + data.email,
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('afterRegisterLogin', data)
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
            })
        },

        githubSignIn(email) {
            axios({
              url: `${baseURL}/githubsigninOk`,
              method: 'POST',
              data: {
                email: email,
              }
            })
            .then(({ data }) => {
              localStorage.setItem('token', data.token)
              localStorage.setItem('email', data.email)
              this.email = ''
              this.password = ''
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success GitHub sign in ' + data.email,
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('afterRegisterLogin', data)
              
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
        }

    }
}
</script>

<style scoped>

</style>