<template>
  <div id="app">
    <auth-page v-if="isLoggedIn" @login="isLoggedIn = !isLoggedIn"></auth-page>
    <user-page
      v-if="!isLoggedIn && !showKanban"
      @logout="session"
      @load-category="load"
    ></user-page>
    <kanban-page
      v-if="showKanban"
      :categories="categories"
      :project="project === null ? {} : project"
      @load-data="getCategory"
      @click="showKanban = !showKanban"
    ></kanban-page>
  </div>
</template>

<script>
import Auth from "./component/auth_page";
import User from "./component/user_page";
import Kanban from "./component/kanban_page";
import axios from "axios";

export default {
  components: {
    "auth-page": Auth,
    "user-page": User,
    "kanban-page": Kanban
  },
  data: () => {
    return {
      base_url: "https://api-kanban.herokuapp.com",
      endpoint_category: "/category",
      isLoggedIn: localStorage.token === undefined ? true : false,
      categories: null,
      project: null,
      showKanban: false
    };
  },
  methods: {
    load: function({ project }) {
      this.project = project;
      this.getCategory();

      this.showKanban = !this.showKanban;
    },
    request: function(params) {
      const { method, data, id, endpoint } = params;
      const url = `${this.base_url}/category/${this.project.id}`;
      return axios({
        method: method,
        url: url,
        data: data
      });
    },
    signOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    session: function() {
      this.signOut();
      this.isLoggedIn = !this.isLoggedIn;
    },
    getCategory: function() {
      this.request({ method: "get", endpoint: this.endpoint_category })
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.getCategory();
  }
};
</script>

<style>
</style>