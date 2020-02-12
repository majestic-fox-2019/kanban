<template>
  <div>
    <div id="projectPage" v-if="detailProject == null">
      <v-container>
        <v-toolbar dense>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn color="green darken-4" dark v-on="on">
                <v-icon>mdi-plus</v-icon>
                <h5>Create new</h5></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headline">Create new Project</v-card-title>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="projectName"
                  label="Project Name"
                  single-line
                  outlined
                ></v-text-field>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="green darken-1"
                  text
                  @click.prevent="createProject"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-toolbar-title class="ml-4"
            ><h3>All Kanban Board</h3></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn text @click.prevent="personal = true">
            <v-icon>mdi-account</v-icon>
            <h5>Personal</h5>
          </v-btn>
          <v-btn text @click.prevent="personal = false">
            <v-icon>mdi-folder</v-icon>
            <h5>Group</h5>
          </v-btn>
        </v-toolbar>

        <div id="personal" v-if="personal">
          <h1 class="mt-4"><center>Personal Projects</center></h1>
          <v-row>
            <h4 v-if="allProjects.personal.length == 0">
              You dont have any projects yet
            </h4>
            <v-col
              v-else
              md="4"
              v-for="(project, i) in allProjects.personal"
              :key="i"
              @click.prevent="getDetail(project.ProjectId)"
            >
              <ProjectCard
                :project="project"
                v-on:DELETE_PROJECT="deleteProject"
              ></ProjectCard>
            </v-col>
          </v-row>
        </div>

        <div id="team" v-else>
          <h1 class="mt-4"><center>Group Projects</center></h1>
          <v-row>
            <h4 v-if="allProjects.other.length == 0">
              You dont have any projects yet
            </h4>
            <v-col
              md="4"
              v-for="(project, i) in allProjects.other"
              :key="i"
              @click.prevent="getDetail(project.ProjectId)"
            >
              <ProjectCard
                :project="project"
                v-on:LEAVE_PROJECT="leaveProject"
              ></ProjectCard>
            </v-col>
          </v-row>
        </div>

        <Invitation
          v-on:LOAD_PROJECT="loadProjects"
          v-on:LEAVE_PROJECT="leaveProject"
        ></Invitation>
      </v-container>
    </div>

    <div id="kanbanPage" class="mt-5 ml-5 mr-5" v-else>
      <KanbanBoard :project="detailProject"></KanbanBoard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import ProjectCard from './ProjectCard'
import KanbanBoard from './KanbanBoard'
import Invitation from './Invitation'

const BASE_URL = 'http://localhost:3000'

export default {
  name: 'MainPage',
  data() {
    return {
      dialog: false,
      personal: true,
      projectName: null,
      projectId: null,
      detailProject: null
    }
  },
  props: ['allProjects', 'home'],
  components: {
    ProjectCard,
    KanbanBoard,
    Invitation
  },
  methods: {
    createProject() {
      const form = {
        name: this.projectName
      }
      axios
        .post(`${BASE_URL}/projects`, form, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.dialog = false
          Swal.fire('Gratz!', 'A new project created', 'success')
          return this.$emit('FETCH_PROJECT')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteProject(val) {
      axios
        .delete(`${BASE_URL}/projects/${val}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          this.detailProject = null
          Swal.fire('Success', 'A project deleted', 'success')
          return this.$emit('FETCH_PROJECT')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    leaveProject(val) {
      axios
        .delete(`${BASE_URL}/projects/leave/${val}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          Swal.fire('Success', 'A project deleted', 'success')
          return this.$emit('FETCH_PROJECT')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getDetail(val) {
      this.projectId = val
      localStorage.setItem('projectId', val)
      axios
        .get(`${BASE_URL}/projects/${val}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.detailProject = data.data
          console.log(this.detailProject)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadProjects() {
      return this.$emit('FETCH_PROJECT')
    }
  },
  watch: {
    home: function(val, old) {
      this.detailProject = null
      this.projectId = null
    }
  }
}
</script>

<style lang="css" scoped></style>
