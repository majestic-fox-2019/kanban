<template>
  <div class="all-cards">
    <div class="all-task" :key="index" v-for="(list,index) in lists">
      <div class="task" v-if="list.status === name">
        <p>{{ list.title}}</p>
        <article>{{list.description}}</article>
        <div class="action" v-if="UserId == list.UserId">
          <div class="backward">
            <i
              v-if="list.status !== 'backlog'"
              class="fas fa-arrow-circle-left"
              v-on:click="backStatus(list.status); $emit('updatetask', {list, getStatus, index})"
            ></i>
          </div>
          <div class="forward">
            <i class="fas fa-trash" v-on:click="$emit('deletetask', {list, index})"></i>
            <i
              v-if="list.status !== 'complete'"
              class="fas fa-arrow-circle-right"
              v-on:click="nextStatus(list.status); $emit('updatetask', {list, getStatus, index})"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const server = "https://kanban-ajengrf.herokuapp.com";

export default {
  props: ["lists", "name"],
  data: function() {
    return {
      getStatus: null,
      UserId: localStorage.UserId,
      isLogin: false
    };
  },
  methods: {
    currentUser(task) {},
    nextStatus(status) {
      if (status == "backlog") {
        this.getStatus = "todo";
      } else if (status == "todo") {
        this.getStatus = "done";
      } else if (status == "done") {
        this.getStatus = "complete";
      }
    },
    backStatus(status) {
      if (status == "todo") {
        this.getStatus = "backlog";
      } else if (status == "done") {
        this.getStatus = "todo";
      } else if (status == "complete") {
        this.getStatus = "done";
      }
    }
  }
};
</script>