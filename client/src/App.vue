<template>
  <div> 
        <Login v-bind:user="user" v-bind:pageLogin="pageLogin"></Login>
        <Register v-bind:pageRegister="pageRegister"></Register>
        <Content v-bind:categories="categories" v-bind:pageContent="pageContent"></Content>
  </div>
</template>

<script>
import axios from 'axios';
import Login from '../components/Login'
import Register from '../components/Register'
import Content from '../components/Content'
export default {
    name : "App",
    components: {Login, Register, Content},
    data:()=>{
        return{
            categories:null,
            user:null,
            pageLogin:false,
            pageRegister:false,
            pageContent:false,
        }
    },
    methods: {
        getCategory(){
            axios
            .get(`${process.env.BASE_URL}/categories`)
            .then( data => {
                this.categories = data.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        login(email, password){
            axios
            .post(`${process.env.BASE_URL}/login`,{
                email:email, password:password
            })
            .then(data =>{
              console.log("pageLogin")
                const token = data.data.token
                this.user = token
                localStorage.setItem('userToken', token)
                this.email = null
                this.password = null
                this.getCategory()
                this.pageLogin = false
                this.pageContent = true
                this.pageRegister = false
                this.$swal.fire(
                'You succes Loggin!',
                `Welcome to Kanban Apps ${data.name}`,
                'success'
                )
            })
            .catch(err =>{
                console.log(err)
            })
        },
        register(name ,username ,email ,password){
            axios
            .post(`${process.env.BASE_URL}/register`,{
                name:name ,username:username ,email:email ,password:password
            })
            .then(data =>{
                // console.log(data);
                this.name = null
                this.username = null
                this.email = null
                this.password = null
                this.getCategory()
                this.checkLogin()
                this.pageLogin = false
                this.pageContent = true
                this.pageRegister = false
                this.$swal.fire(
                'You succes Create account!',
                `Please login to access Kanban Apps ${data.name}`,
                'success'
                )
            })
            .catch(err =>{
                console.log(err)
            })
        },
        checkLogin(){
            if(localStorage.getItem('userToken')){
                this.getCategory()
                this.pageContent = true
            }else{
                this.pageLogin = true
             }
        },
        logout(){
            localStorage.removeItem('userToken')
                this.$swal.fire(
                'You succes logout!',
                'success'
                )
            this.pageContent = false
            this.pageLogin = true
        },
        // googleLogin(email){
            
        //     .catch(err =>{
        //         console.log(err)
        //     })
        // }
    }, 
    created() {
        this.checkLogin()
        // googleLogin()
    },
}
</script>

<style>

</style>