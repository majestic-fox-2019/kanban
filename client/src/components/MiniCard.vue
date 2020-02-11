<template>
  <div>
    <b-card :title="task.title">
      <b-card-text>
        <div class="d-flex justify-content-around">
          <div class="col">{{name}}</div>
          <div class="col">{{projectName}}</div>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <a href="#" v-b-modal="'modalTodo' + this.task.id">See Details</a>
        </div>
      </b-card-text>
    </b-card>
    <div>
      <b-modal :id="'modalTodo' + task.id" :title="task.title" hide-footer>
        <h5>Project</h5>
        <p>{{projectName}}</p>
        <h5>Assigned to</h5>
        <p>{{name}}</p>
        <div class="d-flex justify-content-between">
          <mdb-btn
            class="buttonCard"
            gradient="young-passion"
            v-on:click="changeStatus('Backlog')"
            @click="$bvModal.hide('modalTodo' + task.id)"
          >Backlog</mdb-btn>
          <mdb-btn
            gradient="sunny-morning"
            class="buttonCard"
            v-on:click="changeStatus('To-do')"
            @click="$bvModal.hide('modalTodo' + task.id)"
          >To do</mdb-btn>
          <mdb-btn
            gradient="tempting-azure"
            class="buttonCard"
            v-on:click="changeStatus('Doing')"
            @click="$bvModal.hide('modalTodo' + task.id)"
          >Doing</mdb-btn>
          <mdb-btn
            gradient="dusty-grass"
            class="buttonCard"
            v-on:click="changeStatus('Done')"
            @click="$bvModal.hide('modalTodo' + task.id)"
          >Done</mdb-btn>
          <div
            class="btn btn-danger"
            v-on:click="deleteTodoProject"
            @click="$bvModal.hide('modalTodo' + task.id)"
          >Delete</div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { ToastPlugin } from "bootstrap-vue";
import Swal from "sweetalert2";
import { mdbBtn } from "mdbvue";
import axios from "axios";
export default {
  name: "minicard",
  props: ["task"],
  components: {
    mdbBtn
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      name: "",
      projectName: ""
    };
  },
  methods: {
    getMemberById() {
      axios({
        url: `${this.baseUrl}/user/${this.task.UserId}`,
        method: "GET"
      })
        .then(({ data }) => {
          //   console.log(data, "ini dari get member")
          this.name = data.username;
        })
        .catch(err => {
          console.log(err.response, "<ini gagal get memebr");
        });
    },
    getProjectById() {
      axios({
        url: `${this.baseUrl}/projects/${this.task.ProjectId}`,
        method: "GET"
      })
        .then(({ data }) => {
          //   console.log(data, "<< ini dari project id");
          this.projectName = data.name;
        })
        .catch(err => {
          console.log(err.response, "<< ini gagal get project");
        });
    },
    changeStatus(value) {
      axios({
        url: `${this.baseUrl}/projects/todo/${this.task.id}`,
        method: "PUT",
        data: {
          title: this.task.title,
          status: value
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("updateStatus");
        })
        .catch(err => {
          let errMSG = err.response.statusText;
          Swal.fire("Oopss", errMSG, "error");
        });
    },
    deleteTodoProject() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            url: `${this.baseUrl}/projects/todo/${this.task.id}`,
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              this.$emit("updateStatus");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              // console.log(err.response, "<< ini gagal deletee");
              let errMSG = err.response.statusText;
              Swal.fire("Oopss", errMSG, "error");
            });
        }
      });
    },
    handleError(value) {
      this.$bvToast.toast(value, {
        title: "Oopss",
        variant: danger,
        solid: true
      });
    }
  },
  created() {
    // console.log("ini minicard", this.task);
    this.getMemberById();
    this.getProjectById();
  }
};
</script>

<style scoped>
.buttonCard {
  font-size: 14px;
  color: whitesmoke;
  font-weight: bold;
}
</style>