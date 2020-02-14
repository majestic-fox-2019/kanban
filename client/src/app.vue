<template>
    <div>
        <Login v-if="!login" @logged='userLoggedIn'></Login>
        <NavBar v-if="login" @loggedOut="userLoggedOut"></NavBar>
        <Main v-if="login" :projectData="projects" @newProjectCreated="getUserProjects"></Main>
    </div>
</template>

<script>
import NavBar from "./components/NavBar"
import Main from "./components/Main"
import Login from "./components/Login"
import axios from 'axios'

export default {
  data() {
    return {
      login:false,
      projects: [],
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.getUserProjects()
    }
  },
  components:{
    NavBar,
    Main,
    Login
  },
  methods: {
    userLoggedIn() {
      this.getUserProjects()
    },
    userLoggedOut() {
      this.login = false
    },
    getUserProjects() {
            axios({
                url: 'http://localhost:3000/projects',
                method: 'get',
                headers: {
                token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                if(data){
                this.login = true
                let userProjects = []
                data.forEach(element => {
                userProjects.push({
                    projectId: element.Project.id,
                    name: element.Project.name,
                    leader: element.Project.projectLeader
                })
                })
                this.projects = userProjects
                } else {
                  this.projects = null
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
  }
};
</script>

<style>

</style>