<template>
    <div>
        <formLogin 
            :value="loginData" 
            @login="loginUser"
            @register="registerUser"
            @showloginform="showLoginForm"
            @showregisterform="showRegisterForm"
            @googlelogin="googleLogin"
            v-show="displayLogin"
            :formtype='formType'
            >
        </formLogin>
        <navbarKanban 
            v-show="displayNavbar" 
            :username="userName" 
            @logout="logout">
        </navbarKanban>
        <mainContent 
            v-show="displayMainContent"
            @showmodal="showModal"
            :categorydata="categoryData"
            @onend="onEnd"
            @deletetask="deleteTask"
            @addtocategory="addTask"
        >
        </mainContent>
        <modal 
            v-show="displayModal"
            @closemodal="closeModal"
            @addtask="addTask"
            :selectedcategory="selectedCategory"
            :categorydata="categoryData"
            :addtitle="addTitle"
            :error='error'
            >
        </modal>
    </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import Swal from 'sweetalert2'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import * as firebase from "firebase/app"
import "firebase/auth";

import formLogin from "./components/formLogin";
import navbarKanban from './components/navbar'
import mainContent from './components/maincontent'
import modal from './components/modal'

var url = `https://kanban-api-majestic.herokuapp.com`

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
firebase.initializeApp(firebaseConfig)

var provider = new firebase.auth.GoogleAuthProvider();
var providerGithub = new firebase.auth.GithubAuthProvider();


var socket = io(`${url}`);
Vue.use(VueSocketIOExt, socket);

const Toast = Swal.mixin(
    {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }
)

export default Vue.extend({
    components: {
        formLogin,
        navbarKanban,
        mainContent,
        modal
    },
    data: function(){
        return {
            displayLogin: true,
            displayRegister: false,
            displayMainContent: false,
            displayNavbar: false,
            displayModal: false,
            loginData: {
                name: "",
                email: "",
                password: ""
            },
            userName: "",
            categoryData: null,
            selectedCategory: {
                name: "Backlog"
            },
            addTitle: {
                text: null
            },
            error: null,
            formType: "Login"
        }
    },
    created(){
        if(localStorage.token){
            this.displayLogin = false
            this.userName = localStorage.name
            this.getData()
        }
    },
    sockets: {
        dataChanged(val) {
            this.getData()
        }
    },
    methods: {
        googleLogin(){
            firebase.auth().useDeviceLanguage()
            firebase.auth().signInWithPopup(provider)
            .then(result => {
                var googleLogin = {
                    name: result.user.displayName,
                    email: result.user.email,
                }

                return axios.post(`${url}/googlelogin`, googleLogin)
            })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('name', response.data.name)

                this.userName = localStorage.name
                
                this.getData()

                Toast.fire({
                    icon: 'success',
                    title: 'Sign in Success!'
                })
            })
            .catch(function(error) {
                console.log(error)
            });

        },
        onEnd: (evt) => {
            var fromCategory = evt.from.id
            var category = {category: evt.to.id}
            var id = evt.item.id

            axios.patch(`${url}/tasks/${id}`, category, {
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                Toast.fire({
                    icon: 'success',
                    position: 'top',
                    title: 'Task updated',
                    timer: 1000
                })
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    position: 'top',
                    title: 'Sorry!',
                    text: 'You are not authorized to change this task',
                    timer: 2000
                })
            })
        },
        registerUser(){
            var userRegister = {
                name: this.loginData.name,
                email: this.loginData.email,
                password: this.loginData.password,
            }

            axios
                .post(`${url}/register`, userRegister)
                .then(response => {
                    Swal.fire({
                        title: 'Good job!',
                        text: `${userRegister.name} successfully registered`,
                        icon: 'success',
                        confirmButtonText: 'Login'
                    })
                    this.formType = 'Login'
                    this.loginData.password = null
                })
                .catch(error => {
                    // if(error.response.status)
                    if (error.response.data.errors[0] == 'Email already registered'){
                        Toast.fire({
                            icon: 'error',
                            title: `${error.response.data.errors[0]}`,
                            position: 'top'
                        })
                    } 
                    else {
                        let errorMsg = error.response.data.errors

                        let template = `<ul class="text-center" style='list-style: none; font-size:17px;'>`
                        errorMsg.forEach(el => {
                            template += `<li> ${el} </li>`
                        });

                        template += `</ul>`

                        Swal.fire({
                            title: 'Error!',
                            html: template,
                            icon: 'error',
                            confirmButtonText: 'Try again'
                        })
                    }
                    
                })
        },
        loginUser(){
            var userLogin = {
                email: this.loginData.email,
                password: this.loginData.password
            }

            axios
                .post(`${url}/login`, userLogin)
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('name', response.data.name)

                    this.userName = localStorage.name
                    this.loginData.password = null
                    this.getData()

                    Toast.fire({
                        icon: 'success',
                        title: 'Sign in Success!'
                    })
                })
                .catch(error =>{
                    Swal.fire({
                        title: 'Error!',
                        text: 'Incorrect Username or Password',
                        icon: 'error',
                        confirmButtonText: 'Try again'
                    })
                })
        },
        showRegisterForm(){
            this.formType = 'Register'
        },
        showLoginForm(){
            this.formType = 'Login'
        },
        logout(){
            localStorage.clear()
            this.displayNavbar = false
            this.displayMainContent = false
            this.displayLogin = true

            Toast.fire({
                    icon: 'success',
                    title: 'Logout Success!'
            })
        },
        getData(){
            let categoryData = [{
                    text: 'Backlog',
                    tasks: [],
                },
                {
                    text: 'Development',
                    tasks: []
                },
                {
                    text: 'Production',
                    tasks: []
                },
                {
                    text: 'Done',
                    tasks: []
            }]

            axios
                .get(`${url}/tasks`,{
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(response => {
                    response.data.forEach(el => {
                        categoryData.filter((word, index) => {
                            if(word.text == el.category){
                                categoryData[index].tasks.push({ title: el.title, id:el.id, name: el.User.name })
                            }
                        })
                    });
                    this.categoryData = categoryData
                    this.displayLogin = false
                    this.displayNavbar = true
                    this.displayMainContent= true
                })
                .catch(err =>{
                    console.log(err)
                })
        },
        showModal(){
            this.displayModal = true
            this.error = null
        },
        closeModal(){
            this.displayModal = false
            this.error = null
        },
        deleteTask(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
            .then((result) => {
                if (result.value) {
                    axios.delete(`${url}/tasks/${id}`, {
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(res => {
                        Swal.fire(
                            'Deleted!',
                            `${res.data.title} has been deleted.`,
                            'success'
                        )
                    })
                    .catch(error => {
                        if(error.response.status == 403){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'You are not authorized to delete this task!',
                            })
                        }
                    })
                }
            })
        },
        addTask(newTask){
            let addNew = {
                category: "",
                title: ""
            }
            if(newTask){
                addNew.category = newTask.category,
                addNew.title = newTask.inputForm
            } else {
                addNew.category = this.selectedCategory.name,
                addNew.title = this.addTitle.text
            }

            axios.post(`${url}/tasks`, addNew, {
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                this.displayModal = false
                this.addTitle.text = null

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Task ${response.data.title} has been created`,
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch(err => {
                this.error = err
            })
        }
    }
});
</script>

<style>

</style>