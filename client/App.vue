<template>
  <div id="kanban">
    <div class="container-kanban" v-if="showsidebar">
      <sidebar v-on:addtask="addTask" v-on:logOutButton="logOutButton"></sidebar>
      <div class="board">
        <cardcategory
          :lists="backlog"
          :name="'backlog'"
          @deletetask="deleteTask"
          @updatetask="updateTask"
        ></cardcategory>
        <cardcategory
          :lists="todo"
          :name="'todo'"
          @deletetask="deleteTask"
          @updatetask="updateTask"
        ></cardcategory>
        <cardcategory
          :lists="done"
          :name="'done'"
          @deletetask="deleteTask"
          @updatetask="updateTask"
        ></cardcategory>
        <cardcategory
          :lists="complete"
          :name="'complete'"
          @deletetask="deleteTask"
          @updatetask="updateTask"
        ></cardcategory>
      </div>
    </div>

    <homepage
      v-on:registerUser="registerUser"
      v-on:gsignin="gSignIn"
      v-on:loginUser="loginUser"
      :registerpage="registerpage"
    ></homepage>
  </div>
</template>

<script>
// const server = "http://localhost:3000";
const server = "https://kanban-ajengrf.herokuapp.com";
import axios from "axios";
import sidebar from "./components/sidebar";
import register from "./components/register";
import login from "./components/login";
import cardcategory from "./components/cardCategory";
import homepage from "./components/homepage";

export default {
  components: {
    sidebar,
    register,
    login,
    cardcategory,
    homepage
  },
  data: function() {
    return {
      lists: null,
      backlog: [],
      todo: [],
      done: [],
      complete: [],
      showsidebar: false,
      registerpage: false,
      loginpage: false
    };
  },
  created: function() {
    if (localStorage.token) {
      this.showsidebar = true;
      this.homepage = true;
      this.registerpage = false;
      this.showTask();
    } else {
      this.showsidebar = false;
      this.registerpage = true;
    }
  },
  // mounted() {
  //   this.showTask();
  // },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    addTask() {
      console.log("add live nih");
      this.lists;
    },
    deleteTask() {
      console.log("delete live nih");
      this.lists;
    }
  },
  methods: {
    gSignIn(id_token) {
      axios({
        method: "post",
        url: `${server}/login/google`,
        data: { id_token }
      })
        .then(result => {
          console.log(result.data, "< berhasil");
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("UserId", result.data.UserId);
          this.showTask();
          this.showsidebar = true;
        })
        .catch(function(result) {
          console.log(result);
        });
    },
    registerUser: function(userData) {
      axios({
        method: "post",
        url: `${server}/register`,
        data: userData
      })
        .then(result => {
          console.log(result.data);
          Swal.fire({
            icon: "success",
            title: " Registration Success!",
            showConfirmButton: false,
            timer: 1500
          });
          this.registerpage = false;
          this.registerpage = true;
        })
        .catch(err => {
          console.log(err.response.data, "< register");
          Swal.fire({
            icon: "error",
            title: err.response.status + " Register Failed!",
            text: Object.values(err.response.data).join(", ")
          });
        });
    },
    loginUser: function(userLogin) {
      axios({
        method: "post",
        url: `${server}/login`,
        data: userLogin
      })
        .then(result => {
          console.log(result.data);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("UserId", result.data.UserId);
          this.showTask();
          this.showsidebar = true;
          this.registerpage = false;
          console.log(localStorage.token, "< ini token");
        })
        .catch(err => {
          console.log(err.response, "< error login");
          Swal.fire({
            icon: "error",
            title: err.response.status + " Login Failed!",
            text: err.response.data
          });
        });
    },
    logOutButton() {
      localStorage.removeItem("token");
      localStorage.removeItem("UserId");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
      this.showsidebar = false;
      this.registerpage = true;
    },
    showTask: function() {
      axios({
        method: "get",
        headers: {
          token: localStorage.token
        },
        url: `${server}/task`
      })
        .then(result => {
          this.lists = result.data;
          result.data.forEach(el => {
            if (el.status == "backlog") {
              this.backlog.push(el);
            } else if (el.status == "todo") {
              this.todo.push(el);
            } else if (el.status == "done") {
              this.done.push(el);
            } else if (el.status == "complete") {
              this.complete.push(el);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTask: function(task) {
      axios({
        method: "post",
        url: `${server}/task`,
        headers: {
          token: localStorage.token
        },
        data: task
      })
        .then(result => {
          console.log(result.data);
          this.backlog.push(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(task) {
      axios({
        method: "delete",
        url: `${server}/task/${task.list.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          let deletethis = result.data.status;
          this[deletethis].splice(task.index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTask(task) {
      console.log(task);
      axios({
        method: "put",
        url: `${server}/task/${task.list.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: task.list.title,
          description: task.list.description,
          status: task.getStatus
        }
      })
        .then(result => {
          this[task.list.status].splice(task.index, 1);
          this[task.getStatus].push(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>