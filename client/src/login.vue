<template>
<div class="contain" v-if="page">
  <div class="login-board" >

        <div class="form" v-if="login" >
           <h1 style="color: black;">Login</h1>

              <form @submit.prevent="sendLogin">
                <label for="fname">email </label>
                <input type="text" v-model="email" id="email" name="email" placeholder="Your email..">

                <label for="password">Password</label>
                <input type="text" v-model="password" id="password" name="pasword" placeholder="Your password..">


                <input type="submit" value="Submit">
                <div class="linkregister">
                    <p>haven't account ?? <a href="" @click.prevent="hideshow">register</a></p>
                </div>
                </form>
            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
        </div>

        <div class="form" v-if="register" >
          <h1 style="color: black;">Register</h1>
              <form @submit.prevent="sendRegister">
                <label for="fname">name </label>
                <input type="text" v-model="namereg" id="name" name="name" placeholder="Your name..">

                <label for="fname"> email </label>
                <input type="text" v-model="emailreg" id="email" name="email" placeholder="Your email..">


                <label for="password">Password</label>
                <input type="text" v-model="passreg" id="password" name="pasword" placeholder="Your password..">


                <input type="submit" value="Submit">
                <div class="linkregister">
                  <p>have account ?? <a  @click.prevent="hideshow"> Login </a></p>
                </div>
            </form>
        </div>     
  </div>
</div>
</template>
<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';

export default {
  name : "login",
  components: {
    GoogleLogin,
  },
  props : ['loginstatus', 'registerstatus','local'],
  data(){
    return {
      baseUrl: ``,
      email : "",
      password: "",
      emailreg: "",
      namereg: "",
      passreg: "",
      login: true,
      register : false,
      page: true,
      params: {
            client_id: "741564389418-p9gtoe8kh1m167etvr3e4lv1om2rsndi.apps.googleusercontent.com"
        },
        // only needed if you want to render the button with the google ui
      renderParams: {
            width: 250,
            height: 100,
            longtitle: true
        }
      }
    
    
  },

  watch : {

      loginstatus : function(){
        this.page = !this.page
      },

      registerstatus: function(){
        this.register = !this.register
        this.login = !this.login
      }
  },

  created(){
       if(localStorage.token){
         this.page = false
       } else{
         this.page = true
       }
  },

  methods : {

    hideshow(){ 
      this.login = !this.login
      this.register = !this.register
    },

    sendLogin(){
      let datalogin = {
        email : this.email,
        password : this.password
      }

      this.$emit('data-login',datalogin)
    },

    sendRegister(){
      let dataregister = {
        name : this.namereg,
        email : this.emailreg,
        password : this.passreg
      }

      this.$emit('data-register', dataregister)
    },

    onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
    }

  }
}
  //   checkLogin(){
  //     let data = {
  //       email : this.email,
  //       password : this.password
  //     }
  //     axios.post(`${this.baseUrl}/login`,data)
  //     .then(result=>{
  //       this.$emit('reload-page')
  //       this.pagelogin = false
  //       this.register = false
  //       localStorage.setItem("token", result.data.token)
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   },

    
  //   showregister(){
  //     this.login = !this.login
  //     this.register = !this.register
  //   },

  //   registerNew(){
  //     let data ={
  //       name : this.namereg,
  //       email : this.emailreg,
  //       password : this.passreg
  //     }

  //     console.log(data)
      
  //     axios.post(`${this.baseUrl}/register`,data)
  //      .then(result=>{
  //        console.log(result)
  //        this.login = !this.login
  //        this.register = !this.register
  //     })
  //   }
  


</script>
<style scoped>
.linkregister{
  display: flex;
  justify-content: center;
  color: black;
}
label {
  color: black;
  font-size: 14px
}
.contain{
  width:100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #133357;
  z-index: 5;
}
.login-board{
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
 
}
input[type=text], select {
  width: 100%;
  min-width: 20vw;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  min-width:20vw;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.form{
  
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 20vw;

}
</style>