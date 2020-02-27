<template>
  	<div class="login" :style="{display: pageLogin ? 'block' : 'none'}">
		<h1 style="font-family: 'Coda Caption', sans-serif;">Kanban</h1>
    <div class="kotak_login">
      <p class="tulisan_login">Please login</p><br>
      <div style="text-align: center"><button @click.prevent="loginGoogle()"> <img src="https://img.icons8.com/plasticine/50/000000/google-logo.png"></button><div><br><br>

      <form v-on:submit.prevent="login(email, password)">
        <label>Email</label>
        <input type="email" name="email" v-model="email" class="form_login" placeholder="Email ..">

        <label>Password</label>
        <input type="password" name="password" v-model="password" class="form_login" placeholder="Password ..">

        <input type="submit" class="tombol_login" value="LOGIN">

        <br/>
        <br/>
        <center>
          <a class="link" href="#" @click.prevent="callRegister()">Register</a>
        </center>
      </form>

    </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Login",
    props:["pageLogin"],
    data(){
      return{
        email:null,
        password:null,
      }
    },
    methods:{
        loginGoogle(){
          this.$gAuth.signIn()
          .then(googleUser => {
            // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
            // BasicProfile.getEmail()
            // googleLogin(profile.getEmail())
            // console.log('user', GoogleUser)

            var profile = googleUser.getBasicProfile();
            console.log(profile)
            return axios
            .post(`${process.env.BASE_URL}/loginGoogle`,{
                email:profile.getEmail()
            })
            // GoogleUser.getId() : Get the user's unique ID string.
            // GoogleUser.getBasicProfile() : Get the user's basic profile information.
            // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
            this.isSignIn = this.$gAuth.isAuthorized
          })
          .then (data =>{
            console.log(data)
            const token = data.data.token
                localStorage.setItem('userToken', token)
                this.email = null
                this.password = null
                // this.$parent.getCategory()
                // this.$parent.checkLogin()
                this.pageLogin = false
                this.pageContent = true
                this.pageRegister = false
                this.$swal.fire(
                'You succes Loggin!',
                `Welcome to Kanban Apps ${data.name}`,
                'success'
                )
          })
          .catch(error  => {
            //on fail do something
            console.log(error)
          })
        },
        login(){
          this.$parent.login(this.email, this.password)
        },
        callRegister(){
          this.$parent.pageLogin = false
          this.$parent.pageRegister = true
        }
    },
    created: function () {
    // `this` points to the vm instance
  }
}
</script>

<style>

</style>