<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 col-xs-8">
      <div class="form-project">
        <div class="top-form-add-project">
          <span>Create Project</span>
          <a href class="close" @click.prevent="$emit('close')">
            <i class="fa fa-close"></i>
          </a>
        </div>
        <br />
        <form @submit.prevent="post">
          <input type="text" v-model="name" value placeholder="Project Name" />
          <br />
          <textarea placeholder="Description" v-model="description"></textarea>
          <br />
          <input class="btn-add-project" type="submit" value="Save" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      name: "",
      description: "",
      endpoint_login: "http://localhost:3000/project"
    };
  },
  methods: {
    post: function() {
      const data = {
        name: this.name,
        description: this.description
      };
      this.request({ method: "post", data })
        .then(res => {
          this.alert({
            title: "Success",
            icon: "success",
            msg: 'Successfully added project'
          });
          this.$emit("close");
          this.$emit("load-data");
        })
        .catch(err => {
          err = err.response.data;
          this.alert({
            title: "Failed",
            icon: "warning",
            msg: err.message
          });
        });
    },
    request: function(param) {
      const { method, data } = param;
      return axios({
        method,
        data,
        headers: {
          token: localStorage.token
        },
        url: `${this.endpoint_login}`
      });
    },
    alert: function({ title, icon, msg }) {
      return Swal.fire({
        title: title,
        icon: icon,
        text: msg
      });
    }
  }
};
</script>