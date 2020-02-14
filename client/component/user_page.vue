<template>
  <div>
    <!-- <div v-if="isLoggedIn"> -->
    <div class="container-fluid" id="main">
      <div class="navbar">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="logo" />
          <h2>KANBAN</h2>
        </div>
        <a href @click.prevent="logout">Logout</a>
      </div>
      <div id="project">
        <h2>Project List</h2>
        <div class="project-list" v-if="!showForm">
          <card-project
            @load-category="test"
            v-for="(project, i) in projects"
            :key="i"
            :project="project"
          ></card-project>
          <add-project @show="showForm = !showForm"></add-project>
        </div>
        <div>
          <project-form v-if="showForm" @close="close" @load-data="getProject"></project-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Project from "./project";
import AddProject from "./add_project";
import ProjectForm from "./project_form";
import axios from "axios";
export default {
  components: {
    "card-project": Project,
    "add-project": AddProject,
    "project-form": ProjectForm
  },
  data: function() {
    return {
      showForm: false,
      projects: null,
      endpoint_project: "http://localhost:3000/project"
      // endpoint_project: "https://api-kanban.herokuapp.com/project"
    };
  },
  methods: {
    test: function(value) {
      this.$emit("load-category", value);
    },
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.$emit("logout");
    },
    request: function(params) {
      const { method, data } = params;
      return axios({
        method: method,
        url: this.endpoint_project,
        data,
        headers: {
          token: localStorage.token
        }
      });
    },
    close: function() {
      this.showForm = !this.showForm;
      this.$emit("close");
    },
    getProject: function() {
      this.request({ method: "get" })
        .then(res => {
          this.projects = res.data;
        })
        .catch(err => {
          this.alert({
            title: "Failed",
            icon: "warning",
            msg: err
          });
        });
    }
  },
  created: function() {
    this.getProject();
  },
  alert: function({ title, icon, msg }) {
    return Swal.fire({
      title: title,
      icon: icon,
      text: msg
    });
  }
};
</script>

<style>
</style>