<template>
  <div class="bg">
    <div class="cover">
      <Login
        v-if="page=='login'"
        v-bind:loginGoogle="loginGoogle"
        v-bind:login="login"
        v-on:changePage="changePage"
        v-bind:page="page"
      ></Login>
      <Register
        v-if="page=='register'"
        v-bind:register="register"
        v-on:changePage="changePage"
        v-bind:page="page"
      ></Register>
      <Content
        v-if="page=='content'"
        v-bind:categories="categories"
        v-bind:addCategory="addCategory"
        v-bind:updateCategory="updateCategory"
        v-bind:deleteCategory="deleteCategory"
        v-bind:addTask="addTask"
        v-bind:goLeft="goLeft"
        v-bind:goRight="goRight"
        v-bind:editTask="editTask"
        v-bind:deleteTask="deleteTask"
        v-bind:logout="logout"
      ></Content>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Login from "./components/Login";
import Register from "./components/Register";
import Content from "./components/Content";
import { provider, firebase } from "./firebase/firebaseLogin";

const baseURL = `https://quiet-sierra-31826.herokuapp.com`;
export default {
  name: "App",
  components: {
    Login,
    Register,
    Content
  },
  data() {
    return {
      page: "login",
      categories: null
    };
  },
  sockets: {
    reload() {
      this.getCategories();
    }
  },
  methods: {
    checkToken() {
      if (!localStorage.getItem("token")) {
        this.page = "login";
      } else {
        this.getCategories();
        this.page = "content";
      }
    },
    changePage(data) {
      this.page = data;
    },
    loginGoogle() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          const obj = {
            name: user.displayName,
            email: user.email
          };
          return axios.post(`${baseURL}/loginGoogle`, obj);
        })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.checkToken();
          this.page = "content";
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },
    login(email, password) {
      const obj = {
        email: email,
        password: password
      };
      axios.post(`${baseURL}/login`, obj).then(data => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("name", data.data.name);
        this.checkToken();
        this.page = "content";
      });
    },
    logout() {
      localStorage.clear();
      this.page = "login";
      this.$gAuth.signOut().then(() => {});
    },
    register(name, email, password) {
      const obj = {
        name: name,
        email: email,
        password: password
      };
      axios.post(`${baseURL}/register`, obj).then(data => {
        this.page = "login";
      });
    },
    getCategories() {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.get(`${baseURL}/categories`, headers).then(data => {
        this.categories = data.data;
      });
    },
    addCategory(title) {
      const obj = {
        title: title
      };
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.post(`${baseURL}/categories`, obj, headers).then(data => {
        data.data.Tasks = [];
        this.categories.push(data.data);
      });
    },
    updateCategory(id, title, i) {
      const obj = {
        title: title
      };
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.patch(`${baseURL}/categories/${id}`, obj, headers).then(data => {
        this.categories[i].title = title;
      });
    },
    deleteCategory(id, i) {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.delete(`${baseURL}/categories/${id}`, headers).then(data => {
        this.categories.splice(i, 1);
      });
    },
    addTask(title, id, i) {
      const obj = {
        title: title,
        CategoryId: id
      };
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.post(`${baseURL}/tasks`, obj, headers).then(data => {
        this.categories[i].Tasks.push(data.data);
      });
    },
    editTask(title, id, i, j) {
      const obj = {
        title: title
      };
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.patch(`${baseURL}/tasks/${id}`, obj, headers).then(data => {
        const obj = data.data;
        this.categories[i].Tasks.splice(j, 1, data.data);
      });
    },
    goLeft(id, CategoryId, i, j) {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      if (i > 0) {
        const temp = this.categories[i].Tasks[j];
        const obj = {
          CategoryId: this.categories[i - 1].id
        };

        axios
          .patch(`${baseURL}/tasks/${id}/patch2`, obj, headers)
          .then(data => {
            this.categories[i].Tasks.splice(j, 1);
            this.categories[i - 1].Tasks.push(temp);
          });
      }
    },
    goRight(id, CategoryId, i, j, length) {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      if (i < length) {
        const temp = this.categories[i].Tasks[j];
        const obj = {
          CategoryId: this.categories[i + 1].id
        };

        axios
          .patch(`${baseURL}/tasks/${id}/patch2`, obj, headers)
          .then(data => {
            this.categories[i].Tasks.splice(j, 1);
            this.categories[i + 1].Tasks.push(temp);
          });
      }
    },
    deleteTask(id, i, j) {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      };
      axios.delete(`${baseURL}/tasks/${id}`, headers).then(data => {
        this.categories[i].Tasks.splice(j, 1);
      });
    }
  },
  created() {
    this.checkToken();
  }
};
</script>

<style>
</style>