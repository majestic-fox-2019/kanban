<template>
   
    <div class="align" v-show="formShowLogin">

        <div class="grid align__item">

            <div class="login">

                <h2>Kanbatte</h2>
                <h4>Login</h4>

                <form v-on:submit.prevent = "$emit('login',formLogin)" method="POST">

                <div class="form__field">
                <input v-model = "formLogin.email" type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email">
                </div>

                <div class="form__field">
                <input v-model = "formLogin.password" type="password" class="form-control" id="passwordLogin" placeholder="Password">
                </div>

                <div class="form__field">
                <input type="submit" value="Login">
                </div>

                </form>
                <GoogleLogin class="googleButton" :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                <p>dont have an accout? <a v-on:click="getRegister" style="cursor:pointer">Register</a> </p>
        </div>

        </div>
            
    </div>
</template>
<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
const server ='http://localhost:3000'
export default {
    name:"login",
    props:['formShowLogin'],
    components:{
        GoogleLogin
    },
    data:function(){
        return{
            formLogin:{
                email:null,
                password:null
        },
            params: {
                client_id: "451357483219-1ei7qhem2qiren2pisjm5h2lu0v1l2ij.apps.googleusercontent.com"
            },
            renderParams: {
                width: 150,
                height: 40,
                longtitle: false
            }
        }
    },
    methods:{
    onSuccess(googleUser) {
            console.log(googleUser);
 
            console.log(googleUser.getBasicProfile());
            var id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token)
            this.$emit('googleToken',id_token)
        },
    
    getRegister(){
        console.log('masuk')
        this.$parent.formShowRegister = true
        this.$parent.formShowLogin = false
    }
    },
}
</script>
<style>
    .googleButton{
        margin: 10px 30px 10px 90px
    }
</style>