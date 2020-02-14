<template>
  <div class="col-md-4 col-xs-12">
    <form id="login" @submit.prevent="register">
      <h2 style="color:white;">Register</h2>
      <input v-model="email" type="text" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <input class="btn" type="submit" value="Register" />
      <p>
        Aleady have an account?
        <a href style="color: white;" @click.prevent="$emit('hide')">Login</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      email: "",
      password: "",
      endpoint_register: "https://api-kanban.herokuapp.com/register"
    };
  },
  methods: {
    register: function() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.request({ method: "post", data })
        .then(res => {
          this.alert({
            title: "Success",
            icon: "success",
            msg: "Successfully registered an account"
          });
          this.$emit('hide')
        })
        .catch(err => {
          err = err.response.data.message;
          if (err instanceof Array) {
            err = err.join('\n')
          }
          this.alert({
            title: "Failed",
            icon: "warning",
            msg: err
          });
        });
    },
    request: function(param) {
      const { method, data } = param;
      return axios({
        method,
        data,
        url: `${this.endpoint_register}`
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