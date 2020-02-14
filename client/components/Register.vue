<template>
    <div class="register" :style="{display: pageRegister ? 'block' : 'none'}">
        <h1 style="font-family: 'Coda Caption', sans-serif;">Kanban</h1>
    <div class="kotak_register">
      <p class="tulisan_register">Please register</p>

      <form v-on:submit.prevent="register(name, username, email, password)">
        <label>Full Name</label>
        <input type="text" name="name" v-model="name" class="form_register" placeholder="Full name ..">
        <label>Username</label>
        <input type="text" name="username" v-model="username" class="form_register" placeholder="Username ..">
        <label>Email</label>
        <input type="email" name="email" v-model="email" class="form_register" placeholder="Email ..">
        <label>Password</label>
        <input type="password" name="password" password class="form_register" placeholder="Password ..">

        <input type="submit" class="tombol_register" value="REGISTER">

        <br/>
        <br/>
        <center>
          <a class="link" href="#" @click.prevent="callLogin()">Login</a>
        </center>
      </form>

    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Register",
    props:["pageRegister"],
    data(){
      return{
        name:null,
        username:null,
        email:null,
        password:null
      }
    },
    methods:{
        register(){
          this.$parent.register(this.name ,this.username ,this.email ,this.password)
        },
        callLogin(){
          this.$parent.pageLogin = true
          this.$parent.pageRegister = false
        }
    },
}
</script>

<style>

</style>