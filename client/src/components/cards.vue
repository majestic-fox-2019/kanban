<template>
  <div class="card mb-3 mt-3" style="width: 100%;
  box-shadow: 10px 10px 5px grey;">
    <div class="card-body">
      <h5 class="card-title">{{item.title}}</h5>
      <p class="card-text">{{item.assignTo}}</p>
      <div class="d-flex">
        <div v-if="authorize">
          <b-button @click="$bvModal.show(realId); findOne(item.id)">Update</b-button>

          <b-modal :id="(realId)" title="Update" hide-footer>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button
                @click.prevent="updateTask(item.id)"
                type="button"
                class="btn btn-primary"
              >Submit</button>
            </form>
          </b-modal>
        </div>
        <div v-if="authorize">
          <button type="button" @click="deleteTask(item.id)" class="btn btn-danger mr-2 ml-2">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div v-if="item.assignTo && authorize">
          <button type="button" @click="decline(item.id)" class="btn btn-warning">Decline</button>
        </div>
        <div v-else-if="!item.assignTo">
          <button type="button" @click="accept(item.id)" class="btn btn-success">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      assignTo: ""
    };
  },
  props: ["item"],
  computed: {
    realId() {
      return String(this.item.id);
    },
    authorize() {
      if (localStorage.getItem("userId") == this.item.UserId) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    accept(id) {
      axios({
        method: "patch",
        url: `http://localhost:3000/tasks/${id}/assign`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.$socket.emit("accept");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    decline(id) {
      axios({
        method: "patch",
        url: `http://localhost:3000/tasks/${id}/decline`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.$socket.emit("decline");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            return axios({
              method: "delete",
              url: `http://localhost:3000/tasks/${id}`,
              headers: {
                access_token: localStorage.getItem("access_token")
              }
            });
          }
        })
        .then(({ data }) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.$socket.emit("delete");
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    findOne(id) {
      axios({
        method: "get",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.title = data.title;
          this.assignTo = data.assignTo;
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    updateTask(id) {
      axios({
        method: "put",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.title
        }
      })
        .then(({ data }) => {
          console.log(data);
          // this.$emit("fetch");
          this.$socket.emit("update");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    }
  }
};
</script>
    
<style>
</style>