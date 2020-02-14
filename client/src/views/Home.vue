<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <b-container class="mt-3">
      <b-row>
        <TaskList v-for="(task, index) in taskList" :key="index" :task="task" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import socket from 'socket.io-client/dist/socket.io';
import TaskList from "@/components/TaskList";

export default {
  name: "Home",
  components: {
    TaskList
  },
  data() {
    return {
      taskList: [
        {
          title: "Backlog",
          status: "backlog",
          items: []
        },
        {
          title: "Todo",
          status: "todo",
          items: []
        },
        {
          title: "Done",
          status: "done",
          items: []
        },
        {
          title: "Completed",
          status: "completed",
          items: []
        }
      ]
    };
  },
  methods: {
    isLogin() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/login");
      }
    },
    filterData(data) {
      // cleaning
      for (const category of this.taskList) {
        category.items = [];
      }
      // filling
      for (const item of data) {
        switch (item.category) {
          case "backlog":
            this.taskList[0].items.push(item);
            break;
          case "todo":
            this.taskList[1].items.push(item);
            break;
          case "done":
            this.taskList[2].items.push(item);
            break;
          case "completed":
            this.taskList[3].items.push(item);
            break;
        }
      }
    },
    renderTasks() {
      this.$axios({
        url: `${this.$SERVER_URL}/kanbans/`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.filterData(data);
        })
        .catch(err => {
          console.error(err);
          localStorage.clear();
          // this.$router.push("/login");
        });
    }
  },
  created() {
    this.isLogin();
    if (localStorage.getItem("access_token")) {
      this.renderTasks();
    }
  },
  mounted() {
    this.$socket.on("reRender", () => {
      this.renderTasks();
    })
  }
};
</script>
