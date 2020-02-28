<template>
  <div
    class="modal fade"
    id="addKanban"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Add New Kanban</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            style="outline: none;"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3" id="exampleModalCenterTitle">
            <form method="post" @submit.prevent="addKanban"></form>
            <label for="validationServer03">Title :</label>
            <input v-model="addTitle" type="text" class="form-control" id="add-title" required />
            <label for="validationServer03">Description :</label>
            <input
              v-model="addDescription"
              type="text"
              class="form-control"
              id="add-description"
              required
            />
            <label for="validationServer03">Assign To :</label>
            <input
              v-model="addAssignTo"
              type="text"
              class="form-control"
              id="add-assign-to"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="addKanban"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
          >Add Kanban</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      addTitle: "",
      addDescription: "",
      addAssignTo: ""
    };
  },
  methods: {
    addKanban() {
      axios({
        url: "http://localhost:3000/kanbans",
        method: "POST",
        data: {
          title: this.addTitle,
          description: this.addDescription,
          assignTo: this.addAssignTo
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$socket.emit("add-kanban");
          this.$emit("getKanban");
          this.addTitle = "";
          this.addDescription = "";
          this.addAssignTo = "";
          Swal.fire("Welcome Back", "Success add " + data.title, "success");
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    }
  }
};
</script>

<style>
</style>