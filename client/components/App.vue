<template>
  <div>
    <navbar></navbar>
    <loginregister v-if="showlogin" v-on:showlist="showlist($event)"></loginregister>
    <modal :dataUpdate="dataUpdate" v-on:editData="editData($event)"></modal>
    <kanbans
      v-if="showkanban"
      hidden
      :taskcategory="taskcategory"
      :title="title"
      v-on:destroy="destroy($event)"
      v-on:addData="addData($event)"
      v-on:showUpdate="showUpdate($event)"
    ></kanbans>
  </div>
</template>
<script>
import loginregister from "./login";
import modal from "./editmodal";
import navbar from "./navbar";
import kanbans from "./body";
import axios from "axios";
import Vue from "vue";

export default {
  name: "app",
  components: {
    navbar,
    kanbans,
    modal,
    loginregister
  },
  data() {
    return {
      showlogin: true,
      showkanban: true,
      taskcategory: null,
      urlBase: "http://localhost:3000",
      title: {},
      dataUpdate: {}
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
    },

    showUpdate(task) {
      console.log(task, "SILAHKAN");
      this.dataUpdate = task;
    },

    editData(data) {
      // updatedItem: "Todo";
      // updatedTitle: "kjbsbasj";
      // idItem: 2;
      // taskId: 51;

      let { updatedItem, updatedTitle, idItem, taskId } = data.data;
      console.log(updatedTitle, updatedItem, idItem, taskId, "HAHEHOYEEEE!!");
      let objData = {
        title: updatedTitle,
        category: updatedItem,
        CategoryId: idItem
      };

      axios
        .put(`${this.urlBase}/tasks/${taskId}`, objData)
        .then(result => {
          this.loadData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    showlist() {
      this.showloginregister = false;
      this.showkanban = true;
    }
  }
};
</script>

<style></style>
