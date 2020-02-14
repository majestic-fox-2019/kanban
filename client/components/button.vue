<template>
  <div>
    <form @submit.prevent="addData(content.nameCategory, content.id)">
      <input class="addInput" v-model="title[content.nameCategory]" type="text" />
      <button class="btn fourth" type="submit">add a card...</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "buttonAdd",
  data() {
    return {
      url: "http://localhost:3000/",
      title: {},
      taskCategory: null
    };
  },
  getData() {
    axios
      .get(`${url}`)
      .then(data => {
        this.taskCategory = data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  created() {
    this.getData();
  },

  addData(category, id) {}
};
</script>
<style></style>
