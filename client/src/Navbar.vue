<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light  d-flex justify-content-center">
        <div class="container d-flex justify-content-between">
          <div>
            <a href="" data-toggle="modal" data-target="#addModal"><i class="fas fa-rocket"  ></i>  add task</a>
          </div>
          <a class="navbar-brand" href="#">KANBAN</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <!-- <div class="tombolUser"> -->
              <div v-if="!isLogin" class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-circle"></i> Login here
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="" data-toggle="modal" data-target="#loginForm">Login</a>
                <a class="dropdown-item" href="" data-toggle="modal" data-target="#registForm">Register</a>
              </div>
              </div> 
              <div v-else class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-user-circle"></i> Welcome {{userLogin}}
                </a>
              
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                 
                    <a class="dropdown-item" href="" @click = "logout()">Logout</a>
                  
                
                </div>
                </div> 
            <!-- </div> -->
        </div>
      </nav>

 <!-- LOGIN FORM -->
<div class="modal fade" id="loginForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <form @submit.prevent = "login()">
            <div class="form-group">
              <label for="emailLogin">Email address</label>
              <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" v-model="emailLogin">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="passLogin">Password</label>
              <input type="password" class="form-control" id="passLogin" v-model="passLogin">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div> 
      </div>
    </div>
  </div>
</div>

<!-- REGIST FORM -->
<div class="modal fade" id="registForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <form @submit.prevent = "register()">
             <div class="form-group">
              <label for="nameRegis">Name</label>
              <input type="text" class="form-control" id="nameRegis" v-model="nameRegis">
            </div>
            <div class="form-group">
              <label for="emailRegis">Email address</label>
              <input type="email" class="form-control" id="emailRegis" aria-describedby="emailHelp" v-model="emailRegis">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="passregis">Password</label>
              <input type="password" class="form-control" id="passregis" v-model="passRegis">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Modal ADD -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">add new task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent = "addTask()">
          <div class="form-group">
            <label for="titleAdd">Title</label>
            <input type="text" class="form-control" id="titleAdd" v-model="titleAddTask">
          </div>
          <div class="form-group">
            <label for="dateAdd">Date</label>
            <input type="date" class="form-control" id="dateAdd" v-model="dateAddTask">
          </div>
          <div class="form-group">
            <label for="descriptionAdd">Description</label>
            <input type="text" class="form-control" id="descriptionAdd" v-model="descriptionAddTask">
          </div>
          <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import axios from "axios"
export default {
  methods: {
    checkLogin() {
            let token = localStorage.getItem("token")
            if(token) {
              this.isLogin = true
            } else {
              this.isLogin = false
            }
          },

    register() {
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          name: this.nameRegis,
          email: this.emailRegis,
          password: this.passRegis
        }
      })
      .then(data => {
        console.log(data)
        $("#registForm").modal("hide")
        this.checkLogin()
      })
      .catch(err => {
        console.log(err.response)
        let errors = `<ul style="color:red; list-style:none;">`
        err.response.data.forEach(dataErr => {
          errors += `<li> ${dataErr}</li>`
        })
        errors += `</ul>`
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errors
        })
      })
    },

    login() {
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email: this.emailLogin,
          password: this.passLogin
        }
      })
      .then(data => {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("userLogin", data.data.user.name)
        this.userLogin = data.data.user.name
        
        console.log(data, "<<<<<<<<<<<<<<<<<<")
        $("#loginForm").modal("hide")
        this.checkLogin()
      })
      .catch(err => {
        console.log(err.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'name or email invalid!'
        })
      })
    },

    logout() {
      localStorage.clear()
      this.checkLogin()
      Swal.fire({
        title:'successfully logout!',
        timer: 1500
      })

    },

    addTask() {
      console.log("masuk add data")
      axios({
        url: "http://localhost:3000/tasks",
        method: "POST",
        data: {
          title: this.titleAddTask,
          date: this.dateAddTask,
          status: this.descriptionAddTask
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(data => {
        this.$emit("getAllData")
        console.log(data)
        $("#addModal").modal("hide")
      })
      .catch(err => {
        console.log(err.response.data.msg)
        let errors
        if(err.response.data.msg == "please login or register first to do this task!") {
          errors = `<p style="color:red;">${err.response.data.msg}</p>`
        } else {
          errors = `<ul style="color:red; list-style:none;">`
          err.response.data.forEach(dataErr => {
          errors += `<li> ${dataErr}</li>`
        })
        }
        errors += `</ul>`
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errors
        })
      })
   },

    
  },
  data(){
    return {
      titleAddTask: null,
      dateAddTask: null,
      descriptionAddTask: null,

      nameRegis: null,
      emailRegis: null,
      passRegis: null,
  
      emailLogin: null,
      passLogin: null,
  
      isLogin: false,
      userLogin: localStorage.getItem("userLogin")

    }
  },
  mounted(){
    this.checkLogin()
  },
  created(){
    this.checkLogin()
  }
  
}
</script>

<style>

</style>