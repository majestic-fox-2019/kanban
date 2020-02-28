<template>
  <div id="modal">
    <b-modal id="modal-1" title="Task" @ok="submit()">
      <p class="my-4">
        Title
      </p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        v-model="updatedTitle"
      ></textarea>
      <p class="my-4">Progress</p>
      <select name="select" id="" v-model="updatedItem">
        <option disabled value="">Select one please! </option>
        <option v-bind:selected="selectedItem == 1">Backlog</option>
        <option v-bind:selected="selectedItem == 2">Todo</option>
        <option v-bind:selected="selectedItem == 3">Done</option>
        <option v-bind:selected="selectedItem == 4">Completed</option>
      </select>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: ["dataUpdate"],
  data() {
    return {
      taskId: "",
      selectedItem: "",
      selectedTitle: "",
      updatedItem: "",
      updatedTitle: "",
      text: ""
    };
  },
  watch: {
    dataUpdate: function() {
      this.selectedTitle = this.dataUpdate.title;
      this.selectedItem = this.dataUpdate.CategoryId;
      // console.log(this.dataUpdate.i/d, "OWAWOAKWOAKOWako");
      this.taskId = this.dataUpdate.id;
    }
  },

  methods: {
    submit() {
      let idItem = 0;
      let updatedItem = this.updatedItem;
      let updatedTitle = this.updatedTitle;
      let taskId = this.taskId;
      if (updatedItem == "Backlog") {
        idItem = idItem + 1;
      } else if (updatedItem == "Todo") {
        idItem = idItem + 2;
      } else if (updatedItem == "Done") {
        idItem = idItem + 3;
      } else if (updatedItem == "Completed") {
        idItem = idItem + 4;
      }
      // console.log(updatedItem, updatedTitle, "PLEASE MASUKKK");
      this.$emit("editData", {
        data: { updatedItem, updatedTitle, idItem, taskId }
      });
      this.selectedItem = null;
      this.selectedTitle = null;
    }
  }
};
</script>
<style></style>
