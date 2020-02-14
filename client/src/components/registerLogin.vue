<template>
  <div class="landingPage">
    <video id="videoBackground" autoplay muted loop>
      <source
        src="https://storage.coverr.co/videos/Agile?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTgxNjU1Njc1fQ.H1DRFyr5Tq5aiRxa0o5cuWh8kjaWKokshl91Ops8Xb8"
        type="video/mp4"
      />
    </video>
    <sui-grid centered vertical-align="middle">
      <sui-grid-column style="width:100vw;">
        <h2 is="sui-header" color="teal" image>
          <sui-header-content class="tambahanContent"
            >Kanban Project</sui-header-content
          >
        </h2>

        <sui-form>
          <sui-segment stacked style="background-color:grey; opacity: 0.9;">
            <sui-form-field>
              <sui-input
                v-if="registerForm"
                v-model="form.name"
                type="text"
                placeholder="Name"
                icon="user"
                icon-position="left"
              />
            </sui-form-field>
            <sui-form-field>
              <sui-input
                v-model="form.email"
                type="email"
                placeholder="E-mail address"
                icon="user"
                icon-position="left"
              />
            </sui-form-field>
            <sui-form-field>
              <sui-input
                v-model="form.password"
                type="password"
                placeholder="Password"
                icon="lock"
                icon-position="left"
              />
            </sui-form-field>
            <sui-button
              @click.prevent="login"
              v-if="loginForm"
              size="large"
              color="teal"
              fluid
              >Login</sui-button
            >
            <sui-button
              @click.prevent="register"
              v-if="registerForm"
              size="large"
              color="teal"
              fluid
              >Register</sui-button
            >
          </sui-segment>
          <sui-message
            style="background-color: grey;color: dodgerblue; opacity: 0.9;"
            v-if="loginForm"
            >New to us?
            <a @click.prevent="showRegister">Sign Up</a></sui-message
          >
          <sui-message
            v-if="registerForm"
            style="background-color: grey;color: dodgerblue; opacity: 0.9;"
            >Already have account?
            <a @click.prevent="showLogin">Login</a></sui-message
          >

          <div>
            <span>
              <sui-button
                @click.prevent="googleSignIn"
                social="google"
                content="Google"
                icon="google"
              />
            </span>
            <span>
              <sui-button
                @click.prevent="facebookSignIn"
                social="facebook"
                content="Facebook"
                icon="facebook"
              />
            </span>
          </div>
          <div>
            <span>
              <sui-button
                @click.prevent="twitterSignIn"
                social="twitter"
                content="Twitter"
                icon="twitter"
              />
            </span>
            <span>
              <sui-button
                @click.prevent="githubSignIn"
                social="github"
                content="Github"
                icon="github"
              />
            </span>
          </div>
        </sui-form>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'loginRegister',
  data() {
    return {
      loginForm: true,
      registerForm: false,
      form: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    showLogin() {
      this.form.email = ''
      this.form.password = ''
      this.loginForm = true
      this.registerForm = false
    },
    showRegister() {
      this.form.email = ''
      this.form.password = ''
      this.loginForm = false
      this.registerForm = true
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.form.email = ''
          this.form.password = ''
          return data.user.updateProfile({
            displayName: this.form.name,
            photoURL:
              'https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg'
          })
        })
        .then(data => {
          console.log('ini data register yang sudah update', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login() {
      firebase
        .auth()
        // .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        // .then(result => {
        // return firebase
        // .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        // })
        .then(data => {
          this.form.email = ''
          this.form.password = ''
          console.log('user login succesfully', data)
          this.$emit('loginSuccess', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    googleSignIn() {
      var provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          console.log(
            'ini dari google sign in method',
            token,
            user,
            'ini dari google sign in method'
          )
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          console.log(
            'ini error google sign in',
            errorCode,
            errorMessage,
            email,
            credential
          )

          // ...
        })
    },
    facebookSignIn() {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // ...
          console.log(
            'succes login facebook',
            token,
            user,
            'success login facebook'
          )
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential

          console.log(
            'error login facebook',
            errorCode,
            errorMessage,
            email,
            credential,
            'err login facebook'
          )
        })
    },
    githubSignIn() {
      var provider = new firebase.auth.GithubAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // ...
          console.log(
            'succes login twitter',
            token,
            user,
            'success login twitter'
          )
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
          console.log(
            'error login twitter',
            errorCode,
            errorMessage,
            email,
            credential,
            'err login twitter'
          )
        })
    },
    twitterSignIn() {
      var provider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // ...
          console.log(
            'succes login twitter',
            token,
            user,
            'success login twitter'
          )
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
          console.log(
            'error login twitter',
            errorCode,
            errorMessage,
            email,
            credential,
            'err login twitter'
          )
        })
    },
    logout() {
      var user = firebase.auth().currentUser
      console.log(user)
      firebase
        .auth()
        .signOut()
        .then(result => {
          console.log('user succesfully logout', result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.background {
  background: url('../asset/background2.svg');
  height: 95vh;
  background-repeat: no-repeat;
  background-size: 100%;
  /* height: 100%;; */
  margin: 0;
}
.grid {
  height: 100%;
}
.column {
  max-width: 450px;
  text-align: center !important;
}
a {
  cursor: pointer;
}

.tambahanContent {
  text-shadow: 0 0 3px rgb(33, 149, 184);
  color: currentColor;
  font-size: xx-large;
  padding-bottom: 4vh;
}

.messageTambah {
  background-color: lavender;
  color: dodgerblue;
}

.landingPage {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.landingPage video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -5;
  position: absolute;
  pointer-events: none;
  font-family: 'Kelly Slab', cursive;
}

.landingPage .content {
  position: relative;
  color: aliceblue;
}
</style>
