<template>
  <div class="layout">
  <input name="nav" type="radio" class="nav home-radio" id="home" checked="checked" />
  <div class="page home-page">
    <div class="page-contents">
      <div>
        <div style="text-align:center;display:flex;justify-content:space-around; margin-bottom:10vh;">
          <h1 style="color:white;">Start a Project</h1>
        </div>
      </div>
        <div class="box">
            <a href="#" class="btn btn-white btn-animation-1" @click="$bvModal.show('createProjectModal')">Create Project</a> 
        </div>
    </div>
  </div>
  <label class="nav" for="home">
    <span>
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      Home
    </span>
  </label>

  <input v-if="projectDatas.length<1" name="nav" type="radio" class="about-radio" id="about" />
  <input v-if="projectDatas.length>0" name="nav" type="radio" class="about-radio" id="about" />
  <div class="page about-page">
    <div v-if="!cardsLoading" class="page-contents" style="width: 100%;text-align:center;padding-top:1%;">
        <h1 v-if="projectDatas.length>0 && !selectedProject" style="color:white;">Select a Project to View it's tasks</h1>
        <h1 v-if="projectDatas.length>0 && selectedProject" style="color:white;">Project: {{selectedProject.name}} <a href='#' @click="$bvModal.show('memberListModal')" v-b-popover.hover.top="`Click Me to see This project's Details`"><sup><i class="fas fa-info-circle"></i></sup></a></h1>
            <b-button pill variant="primary" v-if="projectDatas.length>0  && selectedProject" class="mx-2" @click="$bvModal.show('createTaskModal')">Add Task</b-button>
            <b-button pill variant="primary" v-if="projectDatas.length>0  && selectedProject" class="mx-2" @click="$bvModal.show('addMemberModal')">Add Member</b-button>
        <div class="main-tab-content">
            <div>
                <Projects :forProjects="projectDatas" @clickedProject="newSelectedProject($event)" v-if="projectDatas.length>0"></Projects>
                <h3 v-if="projectDatas.length<1">You don't have any Projects yet</h3>
            </div>
        <div class="kanban-content" v-if="projectDatas.length>0 && selectedProject">
        <StatusCard v-for="(category, i) in categories" :key="i" :projectTitle="selectedProject" :catTitle="category" @refreshTasks="getPropjectTasks($event)"></StatusCard>
        </div>
        </div>
    </div>
    <div v-if="cardsLoading && projectDatas.length>0" class="page-contents" style="width: 100%;text-align:center;padding-top:1%;">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner
        variant="light"
        type="grow"
        style="width: 3rem; height: 3rem;"
      ></b-spinner>
      </div>
    </div>
  </div>
  <label class="nav" for="about">
    <span>
    <i class="far fa-folder-open"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></i>
    Projects
      </span>
    </label>
<!-- modals -->
<b-modal id="createProjectModal" centered hide-footer size="sm">
    <template v-slot:modal-title>
      Create a Project
    </template>
    <b-form class="d-flex flex-column justify-content-center">
      <b-form-group
        id="input-group-1"
        label="Project name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.projectName"
          type="text"
          required
          placeholder="Enter project name"
        ></b-form-input>
      </b-form-group>
      <b-button @click="createProject" type="button" id="createProjectButton" variant="primary">Create Project</b-button>
    </b-form>
  </b-modal>

  <b-modal id="createTaskModal" centered hide-footer size="sm">
    <template v-slot:modal-title>
      Create a Task for {{selectedProject.name}}
    </template>
    <b-form class="d-flex flex-column justify-content-center">
      <b-form-group
        id="input-group-1"
        label="Task Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.taskTitle"
          type="text"
          required
          placeholder="Enter task title"
        ></b-form-input>
      </b-form-group>
      <b-button type="button" @click="createTask" variant="primary">Create Task</b-button>
    </b-form>
  </b-modal>

   <b-modal v-if="selectedProject" id="memberListModal" size="lg" centered hide-footer>
    <template v-slot:modal-title>
      {{selectedProject.name}}
    </template>
    <div class="d-block text-center">
      <b-row style="height:50vh;overflow:scroll;">
        <b-col style="border-right:solid black 1px">
          <h5>Member List:</h5>
          <hr>
          <ul style="list-style: none;">
        <li class="projectMembers" v-for="(member, i) in selectedProjectMembers" :key="i">
          <div>
            <p>{{member.email}}</p>
          </div>
          <div>
            <p v-if="member.id==selectedProject.leader">-Project Leader-</p>
          </div>
          <div v-if="selectedProject.leader == userId">
            <button v-if="member.id!==selectedProject.leader" class="deleteMember" @click="kickMember(member.email)"> X </button>
          </div>
        </li>
      </ul>
        </b-col>
        <b-col>
          <h5>Actions</h5>
          <hr>
          <b-button @click="deleteProject">Delete Project</b-button>
        </b-col>
      </b-row>
      
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('memberListModal')">Close</b-button>
  </b-modal>

  <b-modal id="addMemberModal" centered hide-footer size="sm">
    <template v-slot:modal-title>
      Add member to {{selectedProject.name}}
    </template>
    <b-form class="d-flex flex-column justify-content-center">
      <b-form-group
        id="input-group-1"
        label="Member email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.memberEmail"
          type="email"
          required
          placeholder="Enter email here"
        ></b-form-input>
      </b-form-group>
      <b-button type="button" variant="primary" @click="addMember">Add Member</b-button>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import StatusCard from './StatusCard'
import Projects from './Projects'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'Tabs',
    data() {
        return {
            categories: [{status: 'Back-Log', bg: '#fd6d6d'}, {status: 'To-Do', bg: '#fdf36d'}, {status: 'On-Progress', bg: '#6d98fd'}, {status: 'Finish', bg: '#6dfd80'}],
            selectedProject: '',
            cardsLoading: false,
            form: {
              projectName: '',
              taskTitle: '',
              memberEmail: ''
            },
            selectedProjectMembers: [],
            userId: ''
        }
    },
    props: {
        projectDatas: {
            type: Array
        }
    },
    components: {
        StatusCard,
        Projects
    },
    methods: {
      makeToast(append = false, message, color) {
        this.$bvToast.toast(message, {
          title: '',
          autoHideDelay: 5000,
          appendToast: append,
          variant: color
        })
      },
      kickMember(email) {
        Swal.fire({
          title: `Are you sure you want to kick ${email} from ${this.selectedProject.name}?`,
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            return axios({
          url: 'https://kanban-v2.herokuapp.com/projects/members/'+ this.selectedProject.id +'/?member=' + email,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          }
        })
        .then(({ data }) => {
          Swal.fire(
              `${email} has been successfully kicked from ${this.selectedProject.name}`,
              '',
              'success'
            )
          this.getProjectMembers()
          this.getPropjectTasks(this.selectedProject.id)
          this.$socket.emit('memberKicked', {projectId: this.selectedProject.id, memberId: data, msg:`You have been kicked from the Project: ${this.selectedProject.name}`, color:'danger'})
        })
        .catch(err => {
          Swal.fire(
            'Oops..',
            err.response.data,
            'error'
          )
        })
      },
      deleteProject() {
        Swal.fire({
          title: `Are you sure you want to delete Project: ${this.selectedProject.name}?`,
          text: `All of ${this.selectedProject.name}'s tasks and members will all be deleted`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Yes, delete Project: ${this.selectedProject.name}!`
        }).then((result) => {
          if (result.value) {
            return axios({
                url: 'https://kanban-v2.herokuapp.com/projects/' + this.selectedProject.id,
                method: 'delete',
                headers: {
                  token: localStorage.getItem('token')
                }
            })
          }
        })  
            .then(({ data }) => {
              Swal.fire(
              'Deleted!',
              `Project: ${this.selectedProject.name} has been deleted.`,
              'success'
            )
              this.$socket.emit('projectUpdated', {id: this.selectedProject.id, msg: `Project: ${this.selectedProject.name} has been deleted by the owner`, color: 'danger'})
              this.$emit('projectCreated', true)
              this.selectedProject = null
              this.$bvModal.hide('memberListModal')
            })
            .catch(err => {
              Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
            })
        },
        addMember() {
          Swal.fire({
            title: `Add ${this.form.memberEmail} to Project: ${this.selectedProject.name}?`,
            text: "Please make sure the email and project is correct",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
          }).then((result) => {
            if (result.value) {
              return axios({
                url: 'https://kanban-v2.herokuapp.com/projects/members',
                method: 'post',
                headers: {
                  token: localStorage.getItem('token')
                },
                data: {
                  userId: this.form.memberEmail,
                  projectId: this.selectedProject.id
                }
              })
            }
          })
          .then(({ data }) => {
            Swal.fire(
                'Added!',
                `${this.form.memberEmail} has successfully added to Project: ${this.selectedProject.name}`,
                'success'
              )
            this.getProjectMembers()
            this.$bvModal.hide('addMemberModal')
            this.form.memberEmail = ''
            this.$socket.emit('memberUpdated', {projectId: this.selectedProject.id, memberId: data.UserId, msg: `You have been aded to the project: ${this.selectedProject.name}`, color: 'success'})
          })
          .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
          })
        },
        getProjectMembers() {
          let members = []
          axios({
            url: 'https://kanban-v2.herokuapp.com/projects/members/' + this.selectedProject.id,
            method: 'get',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            data.members.forEach(element => {
              members.push(element)
            });
            this.selectedProjectMembers = members
          })
          .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
          })
        },
        newSelectedProject(SelectedProjectName) {
          this.selectedProject = {id: SelectedProjectName.id, name: SelectedProjectName.name, leader: SelectedProjectName.leader}
          this.getProjectMembers()
          this.getPropjectTasks(SelectedProjectName.id)
        },
        createTask() {
          axios({
            url: 'https://kanban-v2.herokuapp.com/tasks',
            method: 'post',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              title: this.form.taskTitle,
              projectId: this.selectedProject.id
            }
          })
          .then(({ data }) => {
            Swal.fire(
              'Task Created!',
              '',
              'success'
            )
            this.$bvModal.hide('createTaskModal')
            this.form.taskTitle = ''
            this.getPropjectTasks(this.selectedProject.id)
            this.$socket.emit('taskUpdated', {id: this.selectedProject.id, msg: `The task on Project: ${this.selectedProject.name} has been updated!`, color: 'success'})
          })
          .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              ) 
          })
        },
        createProject() {
          axios({
            url: 'https://kanban-v2.herokuapp.com/projects',
            method: 'post',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              name: this.form.projectName
            }
          })
          .then(({ data }) => {
            Swal.fire(
              'Project Created!',
              '',
              'success'
            )
            this.$bvModal.hide('createProjectModal')
            this.$emit('projectCreated', true)
            this.form.projectName = ''
          })
          .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
          })
        },
        getPropjectTasks(id) {
          this.cardsLoading = true
          axios({
          url: 'https://kanban-v2.herokuapp.com/projects/tasks/'+ id,
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          let BL = []
          let TD = []
          let OP = []
          let FIN = []
          data.forEach(element => {
            switch (element.category) {
              case 'Back-Log':
                BL.push(element)
                break;
              case 'To-Do':
                TD.push(element)
                break;
              case 'On-Progress':
                OP.push(element)
                break;
              case 'Done':
                FIN.push(element)
                break;
            }
          });
          this.categories[0].tasks = BL
          this.categories[1].tasks = TD
          this.categories[2].tasks = OP
          this.categories[3].tasks = FIN
          this.cardsLoading = false
        })
        .catch(err => {
          Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
        })
    }
    },
    created() {
      this.userId = localStorage.getItem('id')
    },
    mounted() {
      this.$socket.on('someoneUpdatedaTask', (projectIdChanged) => {
        if(projectIdChanged.id == this.selectedProject.id) {
          this.getPropjectTasks(projectIdChanged.id)
        }
        this.projectDatas.forEach(element => {
          if(element.projectId == projectIdChanged.id) {
            this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
          }
        })
      })

      this.$socket.on('someoneUpdatedAMember', (projectIdChanged) => {
        if(this.selectedProject && projectIdChanged.projectId == this.selectedProject.id) {
          this.getProjectMembers()
          this.$emit('projectCreated', true)
          this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
        }
        if(projectIdChanged.memberId == this.userId) {
          this.$emit('projectCreated', true)
          this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
        }
      })

      this.$socket.on('kickedMember', (projectIdChanged) => {        
        if(this.selectedProject && projectIdChanged.projectId == this.selectedProject.id && projectIdChanged.memberId != Number(this.userId)) {
          this.getProjectMembers()
          this.getPropjectTasks(this.selectedProject.id)
        } else if( projectIdChanged.memberId == this.userId) {
          this.selectedProject = null
          this.$emit('projectCreated', true)
          this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
        }
      })

      this.$socket.on('projectUpdate', (projectIdChanged) => {
        if (this.selectedProject && projectIdChanged.id == this.selectedProject.id) {
          this.selectedProject = null
          this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
          this.$emit('projectCreated', true)
        }
        this.projectDatas.forEach(element => {
          if(element.projectId == projectIdChanged.id && !this.selectedProject) {
            this.makeToast(false, projectIdChanged.msg, projectIdChanged.color)
            this.$emit('projectCreated', true)
          }
        })
      })
    }
}
</script>

<style scoped>
.deleteMember {
  background: none;
  border: none;
}
.deleteMember:active {
  box-shadow: inset 0px -1px 5px 1px rgba(0,0,0,0.75);
  transition: 0.2s;
}
.projectMembers {
  height: 3vh;
  display: flex;
  justify-content: space-between;
}
.projectMembers:hover {
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  transition: 0.5s;
}
.projectMembers:active {
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  transition: 0.5s;
}
.main-tab-content {
    display: flex;
    width: 100%;
}
.kanban-content {
    display: flex;
    justify-content: space-evenly;
    width: 90%;
}

label, a {
	 cursor: pointer;
	 user-select: none;
	 text-decoration: none;
	 display: inline-block;
	 color: inherit;
	 transition: border 0.2s;
	 border-bottom: 5px solid rgba(142, 68, 173, 0.2);
	 padding: 3px 2px;
}
 label:hover, a:hover {
	 border-bottom-color: linear-gradient(to right, #005c97, #363795);
}
 .layout {
	 display: grid;
	 height: 100%;
	 width: 100%;
	 overflow: hidden;
	 grid-template-rows: 50px 1fr;
	 grid-template-columns: 1fr 1fr 1fr;
}
 input[type="radio"] {
	 display: none;
}
 label.nav {
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 cursor: pointer;
	 border-bottom: 2px solid #363795;
	 background: #ecf0f1;
	 user-select: none;
	 transition: background 0.4s, padding-left 0.2s;
	 padding-left: 0;
}
 input[type="radio"]:checked + .page + label.nav {
	 background: linear-gradient(to right, #005c97, #363795);;
	 color: #fff;
	 padding-left: 20px;
}
 input[type="radio"]:checked + .page + label.nav span {
	 padding-left: 20px;
}
 input[type="radio"]:checked + .page + label.nav svg {
	 opacity: 1;
}
 label.nav span {
	 padding-left: 0px;
	 position: relative;
}
 label.nav svg {
	 left: 0;
	 top: -3px;
	 position: absolute;
	 width: 15px;
	 opacity: 0;
	 transition: opacity 0.2s;
}
 .page {
	 grid-column-start: 1;
	 grid-row-start: 2;
	 grid-column-end: span 3;
	 padding: 0px 20px;
	 display: flex;
	 align-items: center;
}
 .page-contents > * {
	 opacity: 0;
	 transform: translateY(20px);
	 transition: opacity 0.2s, transform 0.2s;
}
 .page-contents > *:nth-child(1) {
	 transition-delay: 0.4s;
}
 .page-contents > *:nth-child(2) {
	 transition-delay: 0.6s;
}
 .page-contents > *:nth-child(3) {
	 transition-delay: 0.8s;
}
 .page-contents > *:nth-child(4) {
	 transition-delay: 1s;
}
 .page-contents > *:nth-child(5) {
	 transition-delay: 1.2s;
}
 .page-contents > *:nth-child(6) {
	 transition-delay: 1.4s;
}
 .page-contents > *:nth-child(7) {
	 transition-delay: 1.6s;
}
 .page-contents > *:nth-child(8) {
	 transition-delay: 1.8s;
}
 .page-contents > *:nth-child(9) {
	 transition-delay: 2s;
}
 .page-contents > *:nth-child(10) {
	 transition-delay: 2.2s;
}
 .page-contents > *:nth-child(11) {
	 transition-delay: 2.4s;
}
 .page-contents > *:nth-child(12) {
	 transition-delay: 2.6s;
}
 .page-contents > *:nth-child(13) {
	 transition-delay: 2.8s;
}
 .page-contents > *:nth-child(14) {
	 transition-delay: 3s;
}
 .page-contents > *:nth-child(15) {
	 transition-delay: 3.2s;
}
 .page-contents > *:nth-child(16) {
	 transition-delay: 3.4s;
}
 .page-contents > *:nth-child(17) {
	 transition-delay: 3.6s;
}
 .page-contents > *:nth-child(18) {
	 transition-delay: 3.8s;
}
 .page-contents > *:nth-child(19) {
	 transition-delay: 4s;
}
 .page-contents > *:nth-child(20) {
	 transition-delay: 4.2s;
}
 input[type="radio"] + .page {
	 transition: transform 0.2s;
	 transform: translateX(100%);
}
 input[type="radio"]:checked + .page {
	 transform: translateX(0%);
}
 input[type="radio"]:checked + .page .page-contents > * {
	 opacity: 1;
	 transform: translateY(0px);
}
 .page-contents {
	 max-width: 100%;
	 width: 500px;
	 margin: 0 auto;
}

.box{
  top:50%;
  left:50%;
  transform : translate(-50% ,-50%);
  text-align: center;
}

.btn:link,
.btn:visited{
  text-decoration: none;
  text-transform:uppercase;
  position:relative;
  top:0;
  left:0;
  padding:20px 40px;
  border-radius:100px;
  display:inline-block;
  transition: all .5s;
}

.btn-white{
  background:#fff;
  color:#000;
}

.btn:hover{
   box-shadow:0px 10px 10px rgba(0,0,0,0.2);
   transform : translateY(-3px);
}

.btn:active{
  box-shadow:0px 5px 10px rgba(0,0,0,0.2);
  transform:translateY(-1px);
}

.btn-bottom-animation-1{
  animation:comeFromBottom 1s ease-out .8s;
}

.btn::after{
  content:"";
  text-decoration: none;
  text-transform:uppercase;
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  border-radius:100px;
  display:inline-block;
  z-index:-1;
  transition: all .5s;
}

.btn-white::after {
    background: #fff;
}

.btn-animation-1:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

@keyframes comeFromBottom{
  0%{
    opacity:0;
    transform:translateY(40px);
  } 
  100%{
    opacity:1;
    transform:translateY(0);
  }
}
 
</style>