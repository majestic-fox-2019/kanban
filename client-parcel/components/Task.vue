<template>
  <div class="task">
    <form
      method="POST"
      v-bind:key="i"
      v-on:submit.prevent="newEditTask(title, task.id, i, j)"
      v-if="show=='form'"
    >
      <textarea cols="30" rows="5" v-model="title"></textarea>
      <div class="right" v-if="show=='form'">
        <button type="submit" style="position:relative;right:10px">
          <i class="fas fa-check"></i>
        </button>
        <a v-on:click="changeShow('data')" style="position:relative;right:10px">
          <i class="fas fa-times"></i>
        </a>
      </div>
    </form>
    <p v-if="show=='data'">{{task.title}}</p>
    <div class="left" v-if="show=='data'">
      <a v-on:click="newGoLeft(task.id, CategoryId, i, j)" v-if="i > 0">
        <i class="fas fa-angle-left"></i>
      </a>
      <a v-on:click.prevent="newGoRight(task.id, CategoryId, i, j, length)">
        <i class="fas fa-angle-right" v-if="i != length-1"></i>
      </a>
    </div>
    <div class="right" v-if="show=='data'">
      <a v-on:click="changeShow('form')">
        <i class="fas fa-pencil-alt"></i>
      </a>
      <a v-on:click.prevent="newDeleteTask(task.id, i, j)">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>

    <br />
  </div>
</template>

<script>
export default {
  name: "Task",
  props: [
    "CategoryId",
    "task",
    "deleteTask",
    "goRight",
    "goLeft",
    "editTask",
    "i",
    "j",
    "length"
  ],
  data() {
    return {
      show: "data",
      title: this.task.title
    };
  },
  methods: {
    newGoLeft(id, categoryId, i, j) {
      this.goLeft(id, categoryId, i, j);
    },
    newGoRight(id, categoryId, i, j, length) {
      this.goRight(id, categoryId, i, j, length);
    },
    newEditTask(title, id, i, j) {
      this.show = "data";
      this.editTask(title, id, i, j);
    },
    newDeleteTask(id, i, j) {
      this.deleteTask(id, i, j);
    },
    changeShow(str) {
      this.show = str;
    }
  }
};
</script>

<style>
</style>