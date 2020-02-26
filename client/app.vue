<template>
    <div id="app">
        <formRegis v-on:registerUser ="registerUser" :formShowRegister ="formShowRegister" ></formRegis>
        <formLogin v-on:login ="login" :formShowLogin="formShowLogin" v-on:googleToken="googleLogin"></formLogin>
        <div v-if="mainMenu">
            <menuUtama></menuUtama>
            <kanbanContainer :tasks="tasks"  :category="categories" @showList="showList()" >
                </kanbanContainer>
        </div>
            


        
    </div>
</template>

<script>
import menuUtama from './components/menu'
import formRegis from './components/register'
import formLogin from './components/login'
import cardContainer from './components/cardCategory'
import kanbanContainer from './components/kanbanContainer'
import Swal from'sweetalert2'

import axios from 'axios'
const server ='https://kanbatte.herokuapp.com'
export default {
    data: function(){
        return{
            tasks: null,
            categories:['Backlog',"Todo","Done","Completed"],
            Backlog:"Backlog",
            form:{title:null,description:null},
            formShowRegister:true,
            formShowLogin:true,
            mainMenu:false
        }
    }
    ,
    components:{
        menuUtama,
        formRegis,
        formLogin,
        cardContainer,
        kanbanContainer
    },
    created(){
        if(localStorage.token){
            this.showList()
            this.formShowRegister = false
            this.formShowLogin=false
            this.mainMenu=true
        }
        else{
            this.formShowRegister = false
            this.formShowLogin=true
            this.mainMenu=false
        }
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        live(){
            console.log('masuk')
            this.showList()
        }
    },
    methods:{
        registerUser:function(user){
            // console.log(user)
            axios({
                method:"post",
                url:`${server}/user/register`,
                data:{
                    email:user.email,
                    password:user.password,
                    username:user.username
                }
            })
            .then(data=>{
                localStorage.setItem("token",data.data.token)
                localStorage.setItem("UserId",data.data.id)
                this.mainMenu = true
                this.showList()
                this.formShowRegister = false
                this.formShowLogin=false
            })
            .catch(err=>{
                console.log(err.response.data.errors)
                let msg = ''
                for(let i = 0 ;i < err.response.data.errors.length;i++){

                    msg += err.response.data.errors[i].message + ', '
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${msg}`
                    })

                console.log(err)
            })
        },
        login:function(formLogin){
//             console.log(this.formLogin)
            axios({
                method:'post',
                url:`${server}/user/login`,
                data:formLogin
            })
            .then(data=>{
                localStorage.setItem("token",data.data.token)
                localStorage.setItem("UserId",data.data.id)
                this.mainMenu = true
                this.showList()
                this.formShowRegister = false
                this.formShowLogin=false
                
            })
            .catch(err=>{
                let msg= err.response.data.message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${msg}`
                    })

                console.log(err)
            })
        },
        showList:function(){
            axios({
                method:'get',
                headers:{token:localStorage.token},
                url:`${server}/tasks`
            })
            .then(data=>{
                this.tasks = data.data
                console.log(data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        googleLogin:function(id_token){
            axios({
                method:"POST",
                url:`${server}/user/googleLogin`,
                data:{token:id_token}
            })
            .then(data=> {
                console.log('masuksi')
                console.log(data)
                localStorage.setItem('token',data.data.token)
                localStorage.setItem("UserId",data.data.id)
                this.mainMenu = true
                this.showList()
                this.formShowRegister = false
                this.formShowLogin=false
            })
            .catch(err=> {
                console.log(err)
            })
        }
        
    }
}
</script>
<style>

</style>