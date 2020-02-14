<template>
  <div class="task-container">
    <div class="task">
      <textarea
        :style="`${!disable ? 'background-color: #ddd ;box-shadow: 2px 5px 24px #ddd;' : ''}`"
        v-model="task.name"
        :disabled="disable"
      ></textarea>
      <small>{{task.updatedAt}}</small>
      <div class="action">
        <a href class="action" @click.prevent="edit" v-if="!disable">
          <i class="fa fa-check"></i> confirm
        </a>
        <a href class="action" @click.prevent="done" v-if="disable">
          <i class="fa fa-check"></i> done
        </a>
        <a href class="action" @click.prevent="show" v-if="disable">
          <i class="fa fa-edit"></i> edit
        </a>
        <a href class="action" @click.prevent="deleteTask">
          <i class="fa fa-trash"></i> delete
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["task"],
  data: function() {
    return {
      disable: true,
      endpoint_task: "https://api-kanban.herokuapp.com/task"
    };
  },
  methods: {
    show: function() {
      this.disable = !this.disable;
    },
    edit: function() {
      this.disable = !this.disable;
      const data = {
        name: this.task.name
      };
      this.request({ method: "put", data })
        .then(res => {
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
    done: function() {
      const data = {
        CategoryId:
          this.task.CategoryId < 4
            ? this.task.CategoryId + 1
            : this.task.CategoryId
      };

      this.confirm().then(result => {
        if (result.value) {
          this.request({ method: "put", data })
            .then(res => {
              Swal.fire("Moved!", "Your task has been moved.", "success");
              this.$emit("load-data");
            })
            .catch(err => {
              this.alert({
                title: "Failed",
                icon: "warning",
                msg: err
              });
            });
        }
      });
    },
    alert: function({ title, icon, msg }) {
      return Swal.fire({
        title: title,
        icon: icon,
        text: msg
      });
    },
    deleteTask: function() {
      this.confirm().then(res => {
        if (res.value) {
          this.request({ method: "delete" })
            .then(res => {
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
              this.$emit("load-data");
            })
            .catch(err => {
              this.alert({
                title: "Failed",
                icon: "warning",
                msg: err
              });
            });
        }
      });
    },
    request: function(params) {
      const { method, data } = params;
      const url = `${this.endpoint_task}/${this.task.id}`;
      return axios({
        method: method,
        url: url,
        data,
        headers: {
          token: localStorage.token
        }
      });
    },
    confirm: function() {
      return Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      });
    }
  }
};
</script>