<template>
  <div id="loginPage">
  <div id="fb-root"></div>
    <div class="loginpanel">
      <center><h2>{{formtype}}</h2></center>
          <form action="" @submit.prevent="submit">
        <div v-show="showusername">
          <div class="txt">
            <input type="text" v-model="value.username" placeholder="Username" />
          </div>
        </div>
        <div class="txt">
          <input type="email" v-model="value.email" placeholder="Email" />
        </div>
        <div class="txt">
          <input type="password" v-model="value.password" placeholder="Password" />
        </div>
        <center><p style="color: red;" v-show="error">email/password is wrong</p></center>
        <div class="d-flex justify-content-around">
          <v-button type="submit" class="loginBtn" :buttonname="leftbutton"></v-button>
          <span>
            <v-button type="button" :buttonname="rightbutton" @click="changetype"></v-button>
          </span>
        </div>
      </form>
      <div class="hr">
        <div></div>
        <div>OR</div>
        <div></div>
      </div>
      <div class="social">
        <a href="#" @click="$emit('facebook')">facebook</a>
        <a href="#" @click="$emit('twitter')">twitter</a>
        <a href="#" @click="$emit('google')">google</a>
      </div>
    </div>
  </div>
</template>

<script>
import button from "./Button"

export default {
  data: function(){
    return{
      leftbutton: 'login',
      rightbutton: 'register',
      showusername: false,
      submitlogin: true,
      submitregister: false,
      formtype: "login"
    }
  },
  components:{
    'v-button': button
  },
  props: ['value','displaylogin','error'],
  computed: {
  },
  methods: {
   changetype: function(){
     if(this.formtype == "login"){
      this.submitregister = false
      this.submitlogin = true
      this.showusername = true
      this.formtype = "register"
      this.leftbutton = 'register'
      this.rightbutton= 'login'
     }else{
      this.formtype = "login"
      this.leftbutton = 'login'

      this.rightbutton= 'register'
      this.showusername = false
      this.submitregister = true
      this.submitlogin = false
     }
   },
   submit(){
     if(this.formtype == "register"){
       this.$emit("registeruser")
     }else{
       this.$emit("loginuser")
     }
   }
  }
};
</script>

<style>

</style>
