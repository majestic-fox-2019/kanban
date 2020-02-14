<template>
  <div>
    <div class="register">
      <loading :active.sync="isLoading"></loading>
      <form method="post" @submit.prevent="signup">
        <input v-model="email" type="text" placeholder="email" id="email" />
        <input v-model="password" type="password" placeholder="password" id="password" />
        <input v-model="name" type="text" placeholder="name" id="name" />
        <a style="cursor:pointer" @click="goSignin" class="signIn">have account? Sign In</a>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
    <div class="shadow"></div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      isLoading: false,
      name: "",
      email: "",
      password: ""
    };
  },
  components: {
    Loading
  },
  methods: {
    goSignin() {
      this.$emit("showLogin");
    },
    signup() {
      this.isLoading = true;
      axios({
        url: "https://my-kanban-cool.herokuapp.com/users/register",
        method: "post",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.isLoading = false;
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            this.$root.nama = data.user.name;
            this.$emit("statusLoginTrue");
          }, 1000);
        })
        .catch(({ response }) => {
          setTimeout(() => {
            this.isLoading = false;
            if (this.email === "" || this.password === "" || this.name === "") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "please fill email / password / name"
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data
              });
            }
          }, 1000);
        });
    }
  }
};
</script>

<style scoped>
.register {
  background: #eceeee;
  box-shadow: 0 42px 150px 0 rgba(0, 0, 0, 0.2),
    0 40px 70px 0 rgba(0, 0, 0, 0.19);
  border: 2px solid #696a6d6c;
  border-radius: 6px;
  height: 330px;
  margin: 150px auto 0;
  width: 298px;
}
input[type="password"],
input[type="text"] {
  border-radius: 10px;
  box-shadow: 0 1px #fff;
  box-sizing: border-box;
  color: #696969;
  height: 40px;
  margin: 31px 0 0 29px;
  padding-left: 15px;
  padding-right: 15px;
  transition: box-shadow 0.3s;
  width: 240px;
}
input[type="password"]:focus,
input[type="text"]:focus {
  box-shadow: 0 0 4px 1px rgba(55, 166, 155, 0.3);
  outline: 0;
}
.show-password {
  display: block;
  height: 16px;
  margin: 26px 0 0 28px;
  width: 87px;
}
.signIn {
  color: #7f7f7f;
  margin-left: 35px;
  font: 12px/1 sans-serif;
  position: relative;
  text-decoration: none;
  top: 10px;
  transition: color 0.4s;
}
.signIn:hover {
  color: #8c9595ad;
}
input[type="submit"] {
  width: 240px;
  height: 35px;
  display: block;
  font-family: Arial, "Helvetica", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  outline: none;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px #37a69b;
  padding-top: 6px;
  margin: 29px 0 0 29px;
  position: relative;
  background-color: #37a69b;
  border-radius: 5px;
  box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #497a78,
    0px 10px 5px #999;
}

.shadow {
  background: #000;
  border-radius: 4px 4px 15px 15px;
  height: 14px;
  margin: auto;
  opacity: 0.2;
  width: 295px;
}

input[type="submit"]:active {
  top: 3px;
  box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #31524d,
    0px 5px 3px #999;
}
</style>