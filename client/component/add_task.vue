<template>
  <div class="task-container">
    <div class="task">
      <textarea v-model="newTask" placeholder="Write your task here"></textarea>
      <div class="action">
        <a href @click.prevent="cancel">
          <i class="fa fa-arrow-left"></i> cancel
        </a>
        <a href @click.prevent="postTask">
          <i class="fa fa-check"></i>
          add
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["catid", "projectid"],
  data: function() {
    return {
      newTask: "",
      endpoint_task: "https://api-kanban.herokuapp.com/task"
    };
  },
  methods: {
    cancel: function() {
      this.$emit("hide");
    },
    postTask: function() {
      const data = {
        categoryId: this.catid,
        projectId: this.projectid,
        task: this.newTask
      };
      this.request({ method: "post", data })
        .then(res => {
          this.$emit("hide");
          this.$emit("load-data");
        })
        .catch(err => {
          err = err.response.data.message;
          this.alert({
            title: "Failed",
            icon: "warning",
            msg: err
          });
        });
    },
    alert: function({ title, icon, msg }) {
      return Swal.fire({
        title: title,
        icon: icon,
        text: msg
      });
    },
    request: function(params) {
      const { method, data } = params;
      const url = this.endpoint_task;
      return axios({
        method: method,
        url: url,
        data,
        headers: {
          token: localStorage.token
        },
      });
    }
  }
};
</script>