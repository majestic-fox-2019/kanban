<template>
  <b-col cols="12" md="6" lg="3" class="mb-4">
    <b-card
      :header="task.title"
      header-tag="header"
      :header-bg-variant="headerBg"
      header-text-variant="white"
    >
      <draggable
        v-model="task.items"
        :group="{ name: 'task' }"
        :sortable="false"
        @add="addEvent"
        :disabled="dragDisable"
      >
        <TaskItem
          v-for="(item, index) in task.items"
          :key="index"
          :item="item"
        />
      </draggable>
    </b-card>
  </b-col>
</template>

<script>
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem";

export default {
  name: "TaskList",
  components: {
    draggable,
    TaskItem
  },
  props: ["task"],
  data() {
    return {
      dragDisable: false
    };
  },
  methods: {
    addEvent(e) {
      const id = e.item._underlying_vm_.id;
      this.dragDisable = true;
      this.$axios({
        url: `${this.$SERVER_URL}/kanbans/${id}`,
        method: "patch",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          category: this.task.status
        }
      })
        .then( () => {
          this.dragDisable = false;
          this.$socket.emit("dbChange");
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {
    headerBg() {
      let color = "";
      switch (this.task.title) {
        case "Backlog":
          color = "danger";
          break;
        case "Todo":
          color = "warning";
          break;
        case "Done":
          color = "info";
          break;
        case "Completed":
          color = "success";
          break;
        default:
          color = "primary";
          break;
      }
      return color;
    }
  }
};
</script>

<style></style>
