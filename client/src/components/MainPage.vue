<template>
  <div>
    <Navbar @logout="emitLogout"></Navbar>
    <div class="d-flex my-4">
      <div class="ml-3 col-6">
        <div>
          <mdb-btn color="primary" class="m-0">My Projects</mdb-btn>
          <mdb-dropdown btn-group split dropright>
            <mdb-dropdown-toggle slot="toggle" color="primary" class="px-3"></mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <Projects
                @nambahtask="getAll"
                @all-todo-project="tambahTodosOuter"
                @memberNambah="getMyProjects"
                @projectCreated="getMyProjects"
                v-for="one in projects"
                :perProject="one"
                :key="one.ProjectId"
              ></Projects>
              <div class="dropdown-divider"></div>
              <mdb-dropdown-item>Separated link</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </div>
      </div>
      <div class="ml-3">
        <mdb-container>
          <mdb-btn color="default" @click.native="create=true">
            Create new Project
            <mdb-icon icon="eye" class="ml-1" />
          </mdb-btn>
          <mdb-modal :show="create" @close="create = false">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h4" bold class="w-100">Sign in</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-input
                v-model="projectName"
                label="Your Project's Name"
                icon="envelope"
                type="text"
                class="mb-5"
              />
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="create = false" v-on:click="newProject">Create</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>
        </mdb-container>
      </div>
    </div>
    <div class="d-flex mx-auto">
      <MainCard @sudahUpdate="getAll" :category="'Backlog'" :datas="backlog"></MainCard>
      <MainCard @sudahUpdate="getAll" :category="'To do'" :datas="todo"></MainCard>
      <MainCard @sudahUpdate="getAll" :category="'Doing'" :datas="doing"></MainCard>
      <MainCard @sudahUpdate="getAll" :category="'Done'" :datas="done"></MainCard>

      <!-- </draggable> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbContainer,
  mdbBtn,
  mdbIcon,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbModalFooter,
  mdbInput,
  mdbModalTitle
} from "mdbvue";
import Projects from "./Projects";
import draggable from "vuedraggable";
import MainCard from "./MainCard";
import Navbar from "./Navbar";
export default {
  name: "MainPage",
  components: {
    draggable,
    Navbar,
    MainCard,
    Projects,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbContainer,
    mdbBtn,
    mdbIcon,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbModalTitle
  },
  methods: {
    getMyProjects() {
      this.projects = null;
      axios({
        url: `${this.baseUrl}/projects/myProjects`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data, "<<<<");
          // console.log(data, "<<<my project");
          this.projects = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    newProject() {
      axios({
        url: `${this.baseUrl}/projects`,
        method: "POST",
        data: {
          name: this.projectName
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.getMyProjects();
        })
        .catch(err => {
          console.log(err.response, "<<<<");
        });
    },
    getMyTodos() {
      axios({
        url: `${this.baseUrl}/todos/all/mine`,
        headers: {
          token: localStorage.getItem("token")
        },
        method: "GET"
      })
        .then(({ data }) => {
          // console.log(data, "<< ini my todosnya");
          for (let i of data) {
            if (i.status == "Backlog") {
              this.backlog.push(i);
            } else if (i.status == "To-do") {
              this.todo.push(i);
            } else if (i.status == "Doing") {
              this.doing.push(i);
            } else if (i.status == "Done") {
              this.done.push(i);
            }
          }
        })
        .catch(err => {
          console.log(err.response, "<< ini gagal fetch todo");
        });
    },
    getAll() {
      this.projects = null;
      this.backlog = [];
      this.todo = [];
      this.doing = [];
      this.done = [];
      this.getMyProjects();
      this.getMyTodos();
    },
    tambahTodosOuter(value) {
      // console.log(value, "<< ini di main page");
      for (let j of value) {
        if (j.UserId.toString() !== localStorage.getItem("userId")) {
          if (j.status == "Backlog") {
            this.backlog.push(j);
          } else if (j.status == "To-do") {
            this.todo.push(j);
          } else if (j.status == "Doing") {
            this.doing.push(j);
          } else if (j.status == "Done") {
            this.done.push(j);
          }
        }
      }
    },
    emitLogout() {
      // console.log("ini emit logout di main page");
      this.$emit("logoutya");
    }
  },
  data() {
    return {
      categories: ["Backlog", "To do", "Doing", "Done"],
      username: localStorage.getItem("username"),
      projects: null,
      create: false,
      projectName: "",
      baseUrl: "http://localhost:3000",
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  mounted() {
    this.getMyProjects();
    this.getMyTodos();
  }
};
</script>

<style>
</style>