<template>
  <div class="displaypage" v-show="showpage">
    <MenuBar></MenuBar>
    <div class="row">
      <div v-for="(category, i) in getAllTask" :key="i" class="col-3">
        <Category :tasks="category" :category="i" @showAllTask="showTask"></Category>
      </div>
    </div>
    <footer class="page-footer font-small blue">
      <div class="footer-copyright text-center py-3">
        <a href="https://mdbootstrap.com/education/bootstrap/">WIESO</a>
      </div>
    </footer>
  </div>
</template>

<script>
import MenuBar from "./menubar";
import Category from "./kanban-category";
import axios from "axios";
export default {
  name: "displaypage",
  props: ["showpage"],
  components: {
    MenuBar,
    Category
  },
  data() {
    return {
      categories: ["Backlog", "Todo", "Development", "Completed"],
      status: null,
      allTask: []
    };
  },
  methods: {
    showTask() {
      axios({
        method: "GET",
        url: `http://localhost:3000/task`,
        headers: { token: localStorage.token }
      })
        .then(res => {
          this.allTask = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getAllTask: function() {
      let obj = [];
      for (let i = 0; i < this.categories.length; i++) {
        let newObj = {
          value: this.categories[i]
        };
        let arrTask = [];
        for (let j = 0; j < this.allTask.length; j++) {
          if (i === this.allTask[j].status) {
            arrTask.push(this.allTask[j]);
          }
        }
        newObj.task = arrTask;
        obj.push(newObj);
      }
      return obj;
    }
  },
  created() {
    this.showTask();
  }
};
</script>

<style></style>
