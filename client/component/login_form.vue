<template>
  <div class="col-md-4 col-xs-12">
    <form id="login">
      <h2 style="color: white;">Login</h2>
      <input v-model="email" type="text" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <input class="btn" type="submit" value="Login" @click.prevent="login" />
      <small style="text-align:center; color: white;margin: 1em 0">atau login dengan</small>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <p>
        Don't have an account?
        <a
          href
          style="color: white;"
          @click.prevent="$emit('hide')"
        >Create account</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";
export default {
  components: {
    GoogleLogin
  },
  data: function() {
    return {
      email: "",
      password: "",
      endpoint_login: "http://localhost:3000/login",
      params: {
        client_id:
          "296527354511-ljb6felanads0etlm9rlt1qo7uodhal1.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  methods: {
    onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        data: { id_token },
        url: "http://localhost:3000/google-signin"
      })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email);
          this.$emit("login");
        })
        .catch(err => {
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
    onFailure: function(err) {
      this.alert({
        title: "Failed",
        icon: "warning",
        msg: err
      });
    },
    login: function() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.request({ method: "post", data })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email);
          this.$emit("login");
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
    request: function(param) {
      const { method, data } = param;
      return axios({
        method,
        data,
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