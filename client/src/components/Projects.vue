<template>
  <div>
    <mdb-dropdown-item>
      <mdb-btn
        color="primary"
        v-b-modal="'modal-detail' + perProject.ProjectId"
      >{{perProject.Project.name}}</mdb-btn>
    </mdb-dropdown-item>
    <b-modal
      :id="'modal-detail' + perProject.ProjectId"
      :title="perProject.Project.name"
      hide-footer
    >
      <div>
        <div class>
          <h5>Members</h5>
        </div>
        <div v-for="one in members" :key="one.UserId">
          <div class="d-flex">
            <div class="col-6">{{one.User.username}}</div>
            <div class="col-6">{{one.User.email}}</div>
          </div>
        </div>
        <div class="mt-3">
          <div class="form-group">
            <label for="invite">
              <h5>Invite Member</h5>
            </label>
            <input
              type="email"
              class="form-control"
              id="invite"
              v-model="emailMember"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="d-flex justify-content-end mt-3">
            <div class="btn btn-primary" v-on:click="inviteMember(perProject.ProjectId)">Invite</div>
          </div>
        </div>
        <div class="mt-3">
          <div class="form-group">
            <label for="newTask">
              <h5>New Task</h5>
            </label>
            <input
              type="text"
              class="form-control"
              id="newTask"
              v-model="task"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="d-flex justify-content-end mt-2">
            <div class="btn btn-primary" v-on:click="addTaskProject(perProject.ProjectId)">Submit</div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <div
              class="btn btn-danger"
              v-b-modal="'modalDelete'+perProject.ProjectId"
            >Delete Project</div>
            <div>
              <div
                class="btn btn-primary"
                v-on:click="openChatPini"
                @click="$bvModal.hide('modal-detail'+perProject.ProjectId)"
              >Open Chat</div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal :id="'modalDelete'+perProject.ProjectId" hide-footer>
      Please type in
      <strong>{{perProject.Project.name}}</strong> before you proceed
      <form>
        <input type="text" v-model="confirmationDelete" />
      </form>
      <div class="d-flex">
        <div
          class="btn btn-danger"
          @click="$bvModal.hide('modalDelete'+perProject.ProjectId)"
          v-on:click="deleteThisProject"
        >Delete</div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {
  mdbDropdownItem,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn
} from "mdbvue";
export default {
  name: "Projects",
  components: {
    mdbDropdownItem,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
  },
  props: ["perProject"],
  methods: {
    getMembers() {
      let id = this.perProject.ProjectId;
      axios({
        method: "GET",
        url: `${this.baseUrl}/projects/all/members/${id}`
      })
        .then(({ data }) => {
          // console.log(data, "<<members");
          this.members = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    addTaskProject(id) {
      axios({
        method: "POST",
        url: `${this.baseUrl}/projects/todo/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title: this.task
        }
      })
        .then(({ data }) => {
          // console.log(data, "<< ini yang baru dibuat");
          this.$emit("projectCreated");
          // this.$emit("nambahtask");
          this.$socket.emit("tasknyaNambahya");
        })
        .catch(err => {
          console.log(err.response, "<<ini gagal buat task");
          let messageError = err.response.data[0];
          Swal.fire("Oops", messageError, "error");
        });
    },
    inviteMember(id) {
      axios({
        url: `${this.baseUrl}/projects/addMember/${id}`,
        method: "POST",
        data: {
          email: this.emailMember
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("memberNambah");
          this.$socket.emit("nambahMembernya");
        })
        .catch(err => {
          // console.log(err.response, "ini gagal add member");
          Swal.fire("Oops", "User with said email not found", "error");
        });
    },
    getAllTodoOfProjects() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/projects/all/todo/${this.perProject.ProjectId}`
      })
        .then(({ data }) => {
          this.$emit("all-todo-project", data);
        })
        .catch(err => {
          console.log(err.response, "<< ini err get todo project");
          Swal.fire("Oops", "Something went wrong", "error");
        });
    },
    deleteThisProject() {
      // console.log(this.perProject, "<<<<");
      if (this.perProject.Project.name == this.confirmationDelete) {
        axios({
          method: "delete",
          url: `${this.baseUrl}/projects/${this.perProject.ProjectId}`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            this.$emit("projectDeleted");
            this.$socket.emit("ada-project-didelete");
          })
          .catch(err => {
            // console.log(err.response, "<<gagal delete project");
            Swal.fire("Oops", "Something went wrong", "error");
          });
      } else {
        Swal.fire("OOPS", "Data does not match", "error");
      }
    },
    openChatPini() {
      this.$emit("openChatYangIni", this.perProject);
    }
  },
  data() {
    return {
      // baseUrl: "http://localhost:3000",
      baseUrl: this.$baseUrl,
      members: null,
      task: "",
      emailMember: "",
      confirmationDelete: ""
    };
  },
  created() {
    // console.log("keubah gasih");
    this.getMembers();
    this.getAllTodoOfProjects();
    // console.log(this.perProject, "<< ini projects");
  }
};
</script>

<style>
</style>