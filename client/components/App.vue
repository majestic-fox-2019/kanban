<template>
  <div id="app">
    <div :style="{display: loginPage ? 'block' : 'none' }">
      <LoginRegisterPage v-on:login ="login" v-on:register="register" @logingoogle="onSuccess"  :style="{display: loginPage ? 'block' : 'none' }"></LoginRegisterPage>
    </div>
    <div :style="{display: allProjectPage ? 'block' : 'none' }">
      <NavbarProject></NavbarProject>
      <ProjectPage :projectsapp="projects"></ProjectPage>
    </div>
    <div :style="{display: allTaskPage ? 'block' : 'none' }">
      <NavbarTask></NavbarTask>
      <div v-for="(cat, i) in categories" :key="i">
        <BodyTask :addtask="addTask" :category="cat" :name="i" @update-data="updateForm" @delete-id="deleteTask" @categorytitle="getCategory" @updatecategory="changeCategory"></BodyTask>
      </div>
    </div>

  <!-- Modal Update-->
    <div class="modal" id="updateTaskForm" tabindex="-1" role="dialog" aria-labelledby="updateTaskFormTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateTaskFormTitle">Add Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <form @submit.prevent="updateTask">
        <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Task Title</label>
              <input v-model="form.title" type="text" class="form-control" placeholder="Enter your porject">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Task Description</label>
              <textarea v-model="form.description" type="textarea" class="form-control" placeholder="Enter your porject"></textarea>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
          </form>
      </div>
    </div>
  </div>

  <!-- Modal Add -->
  <div class="modal fade" id="addTaskForm" tabindex="-1" role="dialog" aria-labelledby="addTaskFormTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTaskFormTitle">Add Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <form @submit.prevent="addTask">
        <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Task Title</label>
              <input v-model="form.title" type="text" class="form-control" placeholder="Enter your porject">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Task Description</label>
              <input v-model="form.description" type="text" class="form-control" placeholder="Enter your porject">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
          </form>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios'
import LoginRegisterPage from './User'
import ProjectPage from './Projects'
import BodyTask from './BodyTask'
import NavbarTask from './NavbarTask'
import NavbarProject from './NavbarProject'

export default {
  name: 'app',
  components: {
    LoginRegisterPage,
    ProjectPage,
    BodyTask,
    NavbarProject,
    NavbarTask
  },
  data: function(){
    return {
      baseUrl: `https://kanban-fancy.herokuapp.com/api`,
      categories: {
        'Backlog':[],
        'Will Do': [],
        'On Progress':[],
        'Done': []
      },
      loginPage: true,
      allProjectPage: false,
      allTaskPage: false,
      onTaskList: false,
      projects: null,
      tasks: [],
      taskId: null,
      form: {
        title: null,
        description:null,
        category: null
      }
    }
  },
  methods: {
    changeCategory: function(value){
      console.log(value)
      axios.put(`${this.baseUrl}/projects/${this.projectId}/tasks/${value.taskcard.id}`, {
        title: value.taskcard.title,
        description: value.taskcard.description,
        category: value.getCategoryStatus
      }, {headers: {token: localStorage.token}})
      .then(task => {
        this.showAllTask()
        // console.log(this.form)
      })
      .catch(error => {
        console.log(error)
      })
      this.form.title = value.title
      this.form.description = value.description
      this.form.category = value.category
      this.taskId = value.id
    },
    updateForm: function(value){
      this.form.title = value.title
      this.form.description = value.description
      this.taskId = value.id
    },
    getCategory: function(value){
      console.log(value, 'masuk')
      this.form.category = value
    },
    addTask: function() {
      console.log(this.form)
        axios.post(`${this.baseUrl}/projects/${this.projectId}/tasks`, {
            title: this.form.title,
            description: this.form.description,
            category: this.form.category
        }, {headers: {token: localStorage.token}})
        .then(task => {
          $('#addTaskForm').modal('hide')
          this.showAllTask()
          this.form.title = ''
          this.form.description = ''
        })
        .catch(error => {
            console.log(error)
        })
    },
    deleteTask: function(value) {
      console.log(value)
        axios.delete(`${this.baseUrl}/projects/${this.projectId}/tasks/${value}`, {headers: {token: localStorage.token}})
        .then(result => {
            this.showAllTask()
        })
        .catch(error => {
            console.log(error)
        })
    },
    updateTask: function() {
        axios.put(`${this.baseUrl}/projects/${this.projectId}/tasks/${this.taskId}`, {
            title: this.form.title,
            description: this.form.description
        }, {headers: {token: localStorage.token}})
        .then(task => {
          $('#updateTaskForm').modal('hide')
          this.showAllTask()
          console.log(this.form)
        })
        .catch(error => {
          console.log(error)
        })
    },
    selectProjectId: function(project_id) {
      this.projectId = project_id
      this.allProjectPage = false
      this.allTaskPage = true
      this.onTaskList = true
      this.showAllTask()
    },
    addProject: function(form_title) {
      axios.post(`${this.baseUrl}/projects`, {
          title: form_title
      }, {headers: {token: localStorage.token}})
      .then(project => {
          
          this.showAllProjects()
      })
      .catch(error => {
          console.log(error.response)
      })
    },
    deleteProject: function(project_id) {
        axios.delete(`${this.baseUrl}/projects/${project_id}`, {headers: {token: localStorage.token}})
        .then(result => {
            this.showAllProjects()
        })
        .catch(error => {
            console.log(error)
        })
    },
    updateProject: function(id, title) {
        axios.put(`${this.baseUrl}/projects/${id}`, {
            title: title,
        }, {headers: {token: localStorage.token}})
        .then(task => {
            this.showAllProjects()
            // console.log(this.form)
        })
        .catch(error => {
            console.log(error)
        })
    },
    showAllTask: function() {
        for(let key in this.categories) {
          if(this.categories[key].length > 0) {
            this.categories[key] = [];
          }
        }
        axios.get(`${this.baseUrl}/projects/${this.projectId}/tasks`, {headers: {token: localStorage.token}})
        .then(foundTasks => {
            // this.tasks = foundTasks.data
            foundTasks.data.forEach(el => {
              for(let key in this.categories) {
                if(el.category == key) {
                  this.categories[key].push(el);
                  continue;
                }
              }
            });
        })
        .catch(err => {
            console.log(err)
        });
    },
    showAllProjects: function() {
        axios.get(`${this.baseUrl}/projects`, {headers: {token: localStorage.token}})
        .then(projects => {
          this.projects = projects.data
          this.allProjectPage = true
          this.allTaskPage = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    login: function(data) {
      console.log(data)
        axios.post(`${this.baseUrl}/login`, {
            email: data.email,
            password: data.password
        })
        .then(result => {
          data.email = ''
          data.password = ''
          localStorage.setItem('token', result.data.token)
          Swal.fire({
            icon: 'success',
            title: 'Successfully login',
            showConfirmButton: false,
            timer: 1300
          })
          this.loginPage = false
          this.allProjectPage = true
          this.navbar = true
          this.showAllProjects()
        })
        .catch(error => {
          console.log(error.response)
          data.email = ''
          data.password = ''
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    register: function(data){
      console.log(data.email, 'masuk')
      // let registerData = 
      axios.post(`${this.baseUrl}/register`, {
        name: data.name,
        email: data.email,
        password: data.password
      })
      .then(user => {
        console.log( 'masuk then')
        this.loginPage = true
        this.allProjectPage = true
        this.navbar = true
        data.name = ''
        data.email = ''
        data.password = ''
        // this.showAllProjects()
        
      })
      .catch(error => {
        console.log('masuk catch')
        console.log(error.response.data[0].msg)
        Swal.fire({
          icon: 'error',
          title: error.response.data[0].msg,
          showConfirmButton: false,
          timer: 1000
        })
      })
    },
    logout: function(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      console.log('User signed out.');
      });
      localStorage.removeItem('token')
      this.loginPage = true,
      this.allProjectPage = false,
      this.allTaskPage = false
    },
    onSuccess: function(id_token) {
      axios({
        method: "post",
        url: `${this.baseUrl}/google`,
        data: {
          googleToken: id_token
        }
      })
      .then(response => {
        console.log(response.data.token, 'masuk')
        localStorage.setItem('token', response.data.token)
        Swal.fire({
            icon: 'success',
            title: 'Successfully login',
            showConfirmButton: false,
            timer: 1300
          })
          this.loginPage = false
          this.allProjectPage = true
          this.navbar = true
          this.showAllProjects()
      })
      .catch(error => {
        console.log(error.response);
      })
    }
  },
  created(){
    if (!localStorage.token){
      this.loginPage = true,
      this.allProjectPage = false,
      this.allTaskPage = false,
      this.onTaskList = false
    } else {
      this.loginPage = false,
      this.allProjectPage = true,
      this.showAllProjects()
      this.allTaskPage = false,
      this.onTaskList = false
    }
    // this.showAllTask()
  }
}
</script>

<style scoped>

</style>