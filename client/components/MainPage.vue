<template>
  <div>
    <div>
      <Navbar @logout="$emit('logout')" :email=email />
    </div>
    <div v-if="page.project">
      <ProjectList 
      :host="host"
      :toaster="toaster"
      :project_list="projects" />
    </div>
    <div v-if="page.board">
      <Board :host="host" :boardList="boardList" />
    </div>
  </div>  
</template>

<script>
  import Navbar from './Navbar'
  import Board from './Board'
  import ProjectList from './ProjectList'
  import axios from 'axios'

  export default {
    name : 'MainPage',
    components : {
      Navbar,
      Board,
      ProjectList
    },
    data() {
      return {
        page : {
          project: true,
          board : false
        },
        boardList : null,
        projects : null,
        activeBoard : null
      }
    },
    props : ['email', 'host', 'toaster'],
    mounted(){
      this.getProject()
      if(!localStorage.ProjectId){
        this.page.project = true
      }else{
        this.boardRender(localStorage.ProjectId)
        this.page.board = true
      }
    },
    sockets: {
    connect() {
      console.log('socket connected')
    },
    loadProject(){
      this.getProject()
    },
    loadTask(){
      this.boardRender(localStorage.ProjectId)
    }
    },
    methods : {
      getProject(){
        axios.get(`${this.host}/projects`,{
          headers : {
            token : localStorage.token
          }
        })
        .then(response => {
          this.projects = response.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      boardRender(id){
        axios.get(`${this.host}/tasks/${id}`, {
          headers : {
            token : localStorage.token
          }
        })
        .then(response => {
          this.page.project = false
          this.page.board = true
          this.boardList = response.data
          localStorage.ProjectId = id
        })
        .catch(err => {
          console.log(err)
        })
      },
      projectList(){
        this.page.project = true
        this.page.board = false
        localStorage.removeItem('ProjectId')
      },
      deleteProject(id){
        this.projects = this.projects.filter(project => project.id !== id)
      },
      removeElement(keys, id){
        this.activeBoard = [...this.boardList]

        for(let i  = 0; i < this.activeBoard.length; i++){
          if(keys === i){
            this.activeBoard[i].Tasks = this.activeBoard[i].Tasks.filter(task => task.id != id)
          }
        }
        
        this.boardList = this.activeBoard
      }
    }
  }
</script>

<style>

</style>