<template>
  <div class="cardDiv">
    <div class="card">
      <h2 v-if="show=='data'">{{category.title}}</h2>
      <div v-if="show=='data'" class="line"></div>
      <div class="editForm" v-if="show=='form'">
        <form method="POST" v-on:submit.prevent="newUpdateCategory(category.id, titleEdit, i)">
          <input type="text" v-model="titleEdit" />
        </form>
      </div>
      <div class="button" v-if="show=='data'">
        <a v-on:click.prevent="changeShow('form')">
          <i class="fas fa-pencil-alt"></i>
        </a>
        <a v-on:click.prevent="newDeleteCategory(category.id, i)">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
      <div class="right" v-if="show=='form'">
        <button
          type="submit"
          style="position:relative;right:10px"
          v-on:click="newUpdateCategory(category.id, titleEdit, i)"
        >
          <i class="fas fa-check"></i>
        </button>
        <a v-on:click="changeShow('data')" style="position:relative;right:10px">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <br />

      <div class="taskDiv">
        <Task
          v-for="(task, j) in category.Tasks"
          v-bind:CategoryId="category.id"
          v-bind:key="task.id"
          v-bind:task="task"
          v-bind:goRight="goRight"
          v-bind:goLeft="goLeft"
          v-bind:editTask="editTask"
          v-bind:deleteTask="deleteTask"
          v-bind:i="i"
          v-bind:j="j"
          v-bind:length="length"
        ></Task>
      </div>
      <div class="formAdd">
        <form method="POST" v-on:submit.prevent="newAddTask(title, category.id, i)">
          <input type="text" placeholder="New Task" v-model="title" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Category",
  props: [
    "updateCategory",
    "deleteCategory",
    "addTask",
    "goRight",
    "goLeft",
    "editTask",
    "deleteTask",
    "category",
    "i",
    "length"
  ],
  components: {
    Task
  },
  data() {
    return {
      title: null,
      titleEdit: this.category.title,
      show: "data"
    };
  },
  methods: {
    changeShow(str) {
      this.show = str;
    },
    newAddTask(title, id, i) {
      this.addTask(title, id, i);
      this.title = null;
    },
    newEditTask(id, title, i) {
      this.updateCategory(id, title, i);
    },
    newUpdateCategory(id, title, i) {
      this.updateCategory(id, title, i);
      this.changeShow("data");
    },
    newDeleteCategory(id, i) {
      this.deleteCategory(id, i);
    }
  }
};
</script>

<style>
</style>