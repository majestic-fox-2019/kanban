<template>
  <section class="forms-section">
  <h1 class="section-title">KanBan V2</h1>
  <div class="forms">
    <div class="form-wrapper is-active">
      <button type="button" class="switcher switcher-login">
        Login
        <span class="underline"></span>
      </button>
      <form class="form form-login">
        <fieldset>
          <legend>Please, enter your email and password for login.</legend>
          <div class="input-block">
            <label for="login-email">Email</label>
            <input id="login-email" v-model="loginEmail" type="email" required>
          </div>
          <div class="input-block">
            <label for="login-password">Password</label>
            <input id="login-password" v-model="loginPassword" type="password" required>
          </div>
        </fieldset>
        <button type="button" class="btn-login" @click="login">Login</button>
      </form>
    </div>
    <div class="form-wrapper">
      <button type="button" class="switcher switcher-signup">
        Sign Up
        <span class="underline"></span>
      </button>
      <form class="form form-signup">
        <fieldset>
          <legend>Please, enter your Full Name, email and password for registration.</legend>
          <div class="input-block">
            <label for="signup-name">Full Name</label>
            <input id="signup-name" v-model="registerName" type="text" required>
          </div>
          <div class="input-block">
            <label for="signup-email">E-mail</label>
            <input id="signup-email" v-model="registerEmail" type="email" required>
          </div>
          <div class="input-block">
            <label for="signup-password">password</label>
            <input id="signup-password" v-model="registerPassword" type="password" required>
          </div>
        </fieldset>
        <button type="button" class="btn-signup" @click="register">Register</button>
      </form>
    </div>
  </div>
  <div>
	  <h3>Or Sign in using:</h3>
	  <div class="SocialLogin">
		  <b-button variant="light" class="mx-3" @click="gSign" id="googleButton"></b-button>
		  <b-button variant="light" class="mx-3" @click="fSign" id="facebookButton"></b-button>
		  <b-button variant="light" class="mx-3" id="githubButton" @click="gitSign"></b-button>
		  </div>
	  </div>
</section>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
import firebase from 'firebase'
export default {
    name: 'Login',
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    },
    methods: {
		gitSign() {
			let userEmail
			const provider = new firebase.auth.GithubAuthProvider();
			firebase.auth().signInWithPopup(provider)
			.then(function(result) {
				const token = result.credential.accessToken;
				const user = result.user;
				userEmail = user.email
				return axios({
				url: 'https://kanban-v2.herokuapp.com/gSignIn',
				method: 'post',
				data: {
					email: user.email,
					name: user.displayName
				}
			})	
				})
			.then(({ data }) => {
				Swal.fire(
					'Login Successful!',
					`Logged in as: ${userEmail}`,
					'success'
				)
                localStorage.setItem('token', data.token)
				localStorage.setItem('id', data.id) 
                this.$emit('logged', true)
			})
			.catch(function(error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				const email = error.email;
				const credential = error.credential;
			});
		},
		fSign() {
			const provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider)
			.then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			const token = result.credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log(user);
			// ...
			})
			.catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
			
			// The email of the user's account used.
			const email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			const credential = error.credential;
			// ...
			});
		},
		gSign() {
			const provider = new firebase.auth.GoogleAuthProvider();
			let userEmail
			firebase.auth().signInWithPopup(provider)

			.then(function(result) {
			const token = result.credential.accessToken;
			const user = result.user;
			// console.log(user.displayName);
			userEmail = user.email
			return axios({
				url: 'https://kanban-v2.herokuapp.com/gSignIn',
				method: 'post',
				data: {
					email: user.email,
					name: user.displayName
				}
			})
			})
			.then(({ data }) => {
				Swal.fire(
					'Login Successful!',
					`Logged in as: ${userEmail}`,
					'success'
				)
                localStorage.setItem('token', data.token)
				localStorage.setItem('id', data.id) 
                this.$emit('logged', true)
			})
			.catch(function(error) {
			const errorCode = error.code;
			const errorMessage = error.message;
				console.log(errorMessage)
			const email = error.email;
			const credential = error.credential;
			});
		},
        login () {
            axios({
                url: 'https://kanban-v2.herokuapp.com/login',
                method: 'post',
                data: {
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            })
            .then(({ data }) => {
				Swal.fire(
					'Login Successful!',
					`Logged in as: ${this.loginEmail}`,
					'success'
				)
                localStorage.setItem('token', data.token)
				localStorage.setItem('id', data.id) 
                this.$emit('logged', true)
            })
            .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
            })
		},
		register () {
            axios({
                url: 'https://kanban-v2.herokuapp.com/register',
                method: 'post',
                data: {
					name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                }
            })
            .then(({ data }) => {
				Swal.fire(
					'Registration Successful!',
					`Logged in as: ${this.loginEmail}`,
					'success'
				)
				localStorage.setItem('token', data.token)
				localStorage.setItem('id', data.id)  
                this.$emit('logged', true)
            })
            .catch(err => {
                Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
            })
        }
    }
}
</script>

<style scoped>
#githubButton {
	height: 4vh;
	width: 4vh;
	background-image: url('../assets/github.png');
	background-size: cover;
	background-repeat: no-repeat;
}

#facebookButton {
	height: 4vh;
	width: 4vh;
	background-image: url('../assets/facebook.png');
	background-size: cover;
	background-repeat: no-repeat;
}
#googleButton {
	height: 4vh;
	width: 4vh;
	background-image: url('../assets/google.png');
	background-size: cover;
	background-repeat: no-repeat;
}
.SocialLogin {
	display: flex;
	justify-content: center;
	margin-top: 0;
}
.forms-section {
	display: flex;
	flex-direction: column;
	justify-content: center;
    align-items: center;
    margin-top: 12%;
}

.section-title {
	font-size: 32px;
	letter-spacing: 1px;
	color: #fff;
}

.forms {
	display: flex;
	align-items: flex-start;
	margin-top: 30px;
}

.form-wrapper {
	animation: hideLayer .3s ease-out forwards;
}

.form-wrapper.is-active {
	animation: showLayer .3s ease-in forwards;
}

@keyframes showLayer {
	50% {
		z-index: 1;
	}
	100% {
		z-index: 1;
	}
}

@keyframes hideLayer {
	0% {
		z-index: 1;
	}
	49.999% {
		z-index: 1;
	}
}

.switcher {
	position: relative;
	cursor: pointer;
	display: block;
	margin-right: auto;
	margin-left: auto;
	padding: 0;
	text-transform: uppercase;
	font-family: inherit;
	font-size: 16px;
	letter-spacing: .5px;
	color: #999;
	background-color: transparent;
	border: none;
	outline: none;
	transform: translateX(0);
	transition: all .3s ease-out;
}

.form-wrapper.is-active .switcher-login {
	color: #fff;
	transform: translateX(90px);
}

.form-wrapper.is-active .switcher-signup {
	color: #fff;
	transform: translateX(-90px);
}

.underline {
	position: absolute;
	bottom: -5px;
	left: 0;
	overflow: hidden;
	pointer-events: none;
	width: 100%;
	height: 2px;
}

.underline::before {
	content: '';
	position: absolute;
	top: 0;
	left: inherit;
	display: block;
	width: inherit;
	height: inherit;
	background-color: currentColor;
	transition: transform .2s ease-out;
}

.switcher-login .underline::before {
	transform: translateX(101%);
}

.switcher-signup .underline::before {
	transform: translateX(-101%);
}

.form-wrapper.is-active .underline::before {
	transform: translateX(0);
}

.form {
	overflow: hidden;
	min-width: 260px;
	margin-top: 50px;
	padding: 30px 25px;
  border-radius: 5px;
	transform-origin: top;
}

.form-login {
	animation: hideLogin .3s ease-out forwards;
}

.form-wrapper.is-active .form-login {
	animation: showLogin .3s ease-in forwards;
}

@keyframes showLogin {
	0% {
		background: #d7e7f1;
		transform: translate(40%, 10px);
	}
	50% {
		transform: translate(0, 0);
	}
	100% {
		background-color: #fff;
		transform: translate(35%, -20px);
	}
}

@keyframes hideLogin {
	0% {
		background-color: #fff;
		transform: translate(35%, -20px);
	}
	50% {
		transform: translate(0, 0);
	}
	100% {
		background: #d7e7f1;
		transform: translate(40%, 10px);
	}
}

.form-signup {
	animation: hideSignup .3s ease-out forwards;
}

.form-wrapper.is-active .form-signup {
	animation: showSignup .3s ease-in forwards;
}

@keyframes showSignup {
	0% {
		background: #d7e7f1;
		transform: translate(-40%, 10px) scaleY(.8);
	}
	50% {
		transform: translate(0, 0) scaleY(.8);
	}
	100% {
		background-color: #fff;
		transform: translate(-35%, -20px) scaleY(1);
	}
}

@keyframes hideSignup {
	0% {
		background-color: #fff;
		transform: translate(-35%, -20px) scaleY(1);
	}
	50% {
		transform: translate(0, 0) scaleY(.8);
	}
	100% {
		background: #d7e7f1;
		transform: translate(-40%, 10px) scaleY(.8);
	}
}

.form fieldset {
	position: relative;
	opacity: 0;
	margin: 0;
	padding: 0;
	border: 0;
	transition: all .3s ease-out;
}

.form-login fieldset {
	transform: translateX(-50%);
}

.form-signup fieldset {
	transform: translateX(50%);
}

.form-wrapper.is-active fieldset {
	opacity: 1;
	transform: translateX(0);
	transition: opacity .4s ease-in, transform .35s ease-in;
}

.form legend {
	position: absolute;
	overflow: hidden;
	width: 1px;
	height: 1px;
	clip: rect(0 0 0 0);
}

.input-block {
	margin-bottom: 20px;
}

.input-block label {
	font-size: 14px;
  color: #a1b4b4;
}

.input-block input {
	display: block;
	width: 100%;
	margin-top: 8px;
	padding-right: 15px;
	padding-left: 15px;
	font-size: 16px;
	line-height: 40px;
	color: #3b4465;
  background: #eef9fe;
  border: 1px solid #cddbef;
  border-radius: 2px;
}

.form [type='submit'] {
	opacity: 0;
	display: block;
	min-width: 120px;
	margin: 30px auto 10px;
	font-size: 18px;
	line-height: 40px;
	border-radius: 25px;
	border: none;
	transition: all .3s ease-out;
}

.form-wrapper.is-active .form [type='submit'] {
	opacity: 1;
	transform: translateX(0);
	transition: all .4s ease-in;
}

.btn-login {
	color: #fbfdff;
	background: #a7e245;
	transform: translateX(-30%);
}

.btn-signup {
	color: #a7e245;
	background: #fbfdff;
	box-shadow: inset 0 0 0 2px #a7e245;
	transform: translateX(30%);
}
</style>