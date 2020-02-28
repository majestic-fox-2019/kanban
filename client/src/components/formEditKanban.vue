<template>
  <div
    class="modal fade"
    id="editKanban"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Edit Kanban</h5>
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
            <label for="validationServer03">Title :</label>
            <input
              type="text"
              class="form-control"
              id="edit-title"
              v-model="kanbanToEdit.title"
              required
            />
            <label for="validationServer03">Description :</label>
            <input
              type="text"
              class="form-control"
              id="edit-description"
              v-model="kanbanToEdit.description"
              required
            />
            <label for="validationServer03">Assign To :</label>
            <input
              type="text"
              class="form-control"
              id="edit-assign-to"
              v-model="kanbanToEdit.assignTo"
              required
            />
            <input
              type="text"
              class="form-control"
              id="edit-assign-to"
              v-model="kanbanToEdit.id"
              style="display:none"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="editKanban"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
          >Edit Kanban</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  props: ["kanbanToEdit"],
  data() {
    return {
      editTitle: "",
      editDescription: "",
      editAssignTo: "",
      idEdit: ""
    };
  },
  methods: {
    editKanban() {
      this.editTitle = this.kanbanToEdit.title;
      this.editDescription = this.kanbanToEdit.description;
      this.editAssignTo = this.kanbanToEdit.assignTo;
      this.idEdit = this.kanbanToEdit.id;
      axios({
        url: `http://localhost:3000/kanbans/${this.idEdit}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title: this.editTitle,
          description: this.editDescription,
          assignTo: this.editAssignTo
        }
      })
        .then(() => {
          this.$socket.emit("edit-kanban");
          this.$emit("getKanban");
          this.editTitle = "";
          this.editDescription = "";
          this.editAssignTo = "";
          this.idEdit = "";
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your kanban has been edited",
            showConfirmButton: false,
            timer: 1000
          });
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