<template>
  <div>
    <v-row align="center">
      <v-col md="8" lg="8">
        <img
          src="../assets/task.svg"
          style="margin-top: 5vh; margin-left: 3vh;"
        />
      </v-col>
      <v-col md="4" lg="4">
        <h1>Welcome to Kanban</h1>
        <h3 v-if="register">Please register to start</h3>
        <h3 v-else>Login to your account and start</h3>
        <v-form>
          <v-row>
            <v-col md="10">
              <v-text-field
                v-model="form.name"
                label="Name"
                required
                md="8"
                v-if="register"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                type="email"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                type="password"
                name="input-10-1"
                label="Password"
                hint="At least 6 characters"
                counter
                required
              ></v-text-field>

              <v-btn
                color="success"
                class="mr-4"
                @click.prevent="registerUser"
                v-if="register"
              >
                Register
              </v-btn>

              <v-btn color="success" class="mr-4" @click.prevent="login" v-else>
                Login
              </v-btn>
            </v-col>
            <h4 v-if="register">
              Already have an account?
              <a href="#" @click.prevent="changeRegister">Login here</a>
            </h4>
            <h4 v-else>
              Dont have an account?
              <a href="#" @click.prevent="changeRegister">Register here</a>
            </h4>
          </v-row>

          <h4 class="mt-4">Or you can login with your existing account</h4>

          <v-row class="social-login">
            <v-col md="12">
              <v-btn color="primary">
                <v-icon>mdi-google</v-icon>
                <g-signin-button
                  id="gSign"
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError"
                >
                  Login with google
                </g-signin-button>
              </v-btn>
            </v-col>
            <v-col md="12">
              <v-btn @click.prevent="$emit('FB_SIGN')" color="blue darken-3">
                <v-icon>mdi-facebook</v-icon>
                Login with facebook
              </v-btn>
            </v-col>
            <v-col md="12">
              <v-btn @click.prevent="$emit('GITHUB_SIGN')" color="black">
                <v-icon>mdi-github</v-icon>
                Login with github
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import key from '../config/key'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LandingPage',
  data() {
    return {
      register: true,
      form: {
        name: '',
        email: '',
        password: ''
      },
      googleSignInParams: {
        client_id: key.googleClientId
      }
    }
  },
  props: ['isLogin', 'changeForm'],
  methods: {
    changeRegister() {
      this.register = !this.register
    },
    registerUser() {
      const registForm = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      return this.$emit('REGISTER', registForm)
    },
    login() {
      const loginForm = {
        email: this.form.email,
        password: this.form.password
      }
      this.form.email = ''
      this.form.password = ''
      return this.$emit('LOGIN', loginForm)
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      const idToken = googleUser.getAuthResponse().id_token
      axios
        .post(`${this.$BASE_URL}/users/google`, { idToken: idToken })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          Swal.fire('Welcome', 'Login success', 'success')
          return this.$emit('hasLoggedIn', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  },
  watch: {
    changeForm: function(val, old) {
      this.register = false
    }
  }
}
</script>

<style lang="css" scoped>
.social-login .v-btn {
  color: white;
  width: 500px;
  padding: 5px;
}
</style>
