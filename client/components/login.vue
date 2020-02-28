<template>
<div class="wrapper fadeInDown">
    <div id="formContent" v-if="showregister">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <form @submit.prevent="showlist" >

      <div class="fadeIn first">
        <p class="h2" style="color: black">
          <b-icon icon="person-fill">
        </p>
      </div>
        <input
          type="text"
          id="register_username"
          class="fadeIn second"
          name="login"
          placeholder="register username"
          v-model="usernameReg"
        />
                <input
          type="text"
          id="register_email"
          class="fadeIn second"
          name="login"
          placeholder="email"
          v-model="emailReg"

        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="password"
          v-model="passwordReg"
        />
        <br>
        <input type="submit" class="fadeIn fourth"  value="Register"/> 
        <!-- <button @click="showlist" class="btn btn-primary fadeIn fourth">Register</button> -->
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a class="underlineHover" @click="toshow"
          >already have account? go to login</a
        >
      </div>
    </div>


    <!--                             LOGIN PAGE                                    -->

        <div id="formContent" v-if="showlogin">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
                <p class="h2" style="color: black">
              <b-icon icon="person-fill">
              </p>
      </div>
      <form @submit.prevent="login">
        <input
          type="text"
          id="register"
          class="fadeIn second"
          name="login email"
          placeholder="login"
          v-model="emailLog"

        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="password"
          v-model="passwordLog"
          
        />
        <input type="submit" class="fadeIn fourth"/>
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a class="underlineHover" @click="toshow"
          >don't have account? register yourself!</a
        >
      </div>
    </div>

  </div>
  
</template>
<script>
import axios from 'axios'

export default {
  name: "loginregister",
  data() {
    return {
      showregister: true,
      showlogin: false,
      passwordReg: null,
      emailReg: null,
      usernameReg: null,
      emailLog: null,
      passwordLog: null
      
    };
  },
  methods: {
    toshow(){
      this.showregister= !this.showregister
      this.showlogin=!this.showlogin
    },
    login(){
      axios.post( "http://localhost:3000/login", {
          email: this.emailLog,
          password: this.passwordLog,
        })
      .then(user => {
        console.log(user.data, "ini apaaa??");
        const token = user.data
        this.showregister= false
        this.showlogin=false
        localStorage.setItem('token', token)
        this.$emit('showlist', {token: token})     
      })
      .catch(err => {console.log(err);
      })
    },
    showlist(){
      console.log("cimaw");
      console.log(this.usernameReg, this.emailReg, this.passwordReg,);
      axios.post( "http://localhost:3000/register",
        {
          username: this.usernameReg,
          email: this.emailReg,
          password: this.passwordReg
        })
      .then(user => {
        console.log(user, 'thenn');
        // this.showregister= false
        // this.showlogin=false
        // this.$emit('showlist')        
      })
      .catch(err => {
        console.log(err, 'atau error?');
        
      })
    }

  },
};
</script>
<style></style>
