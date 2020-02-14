<template>
  <div>
    <navbar></navbar>
    <kanbans
      :taskcategory="taskcategory"
      :title="title"
      v-on:destroy="destroy($event)"
      v-on:addData="addData($event)"
    ></kanbans>
  </div>
</template>
<script>
import navbar from "./navbar";
import kanbans from "./body";
import axios from "axios";
import Vue from "vue";

export default {
  name: "app",
  components: {
    navbar,
    kanbans
  },
  data() {
    return {
      title: null,
      taskcategory: null,
      urlBase: "http://localhost:3000",
      title: {}
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      // console.log("hahhhh???");
      axios
        .get(`${this.urlBase}/tasks/`)
        .then(res => {
          console.log(res);
          let newObj = {};
          let objButton = {};
          res.data.forEach(el => {
            newObj[el.nameCategory] = null;
            el.Tasks.forEach(taskId => {
              objButton[taskId.id];
            });
          });
          this.title = newObj;
          this.taskcategory = res.data;

          console.log(res.data, "woeeee");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addData(data) {
      console.log(data.data.category, "apakah iniii??????");
      let category = data.data.category;
      let id = data.data.id;
      let obj = {
        title: this.title[category],
        CategoryId: id
      };
      axios
        .post(`${this.urlBase}/tasks/add`, obj)
        .then(res => {
          this.loadData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    destroy(taskId) {
      console.log(taskId, "masukkkk");

      axios
        .delete(`${this.urlBase}/tasks/${taskId}`, {
          where: {
            id: taskId
          }
        })
        .then(res => {
          this.loadData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
