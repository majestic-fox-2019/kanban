<template>
  <!-- Default form login -->
  <b-container
    class="d-flex justify-content-center align-items-center"
    style="height: 100%;"
  >
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h1>Login</h1>
      <b-form-group
        id="input-group-email"
        label="Email address:"
        label-for="input-email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="Your Password:"
        label-for="input-password"
        description="We'll never share your password with anyone else."
      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <div class="d-flex justify-content-center my-3">
        <!-- <div class="g-signin2" :data-onsuccess="onSignIn"></div> -->
        <div id="google-signin-button"></div>
      </div>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      isLogin: false
    };
  },
  methods: {
    loginCheck() {
      if (localStorage.getItem("access_token")) {
        this.isLogin = true;
      }
      if (this.isLogin) {
        this.$router.push("/");
      }
    },
    onSignIn(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      this.$axios({
        url: `${this.$SERVER_URL}/users/g-signin`,
        method: "post",
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          for (const key in data) {
            const value = data[key];
            localStorage.setItem(key, value);
          }
          this.loginCheck();
        })
        .catch(err => {
          console.error(err);
        });
    },
    onSubmit(e) {
      e.preventDefault();
      // alert(JSON.stringify(this.form, null, 2));
      this.$axios({
        url: `${this.$SERVER_URL}/users/login`,
        method: "post",
        data: this.form
      })
        .then(({ data }) => {
          for (const key in data) {
            const value = data[key];
            localStorage.setItem(key, value);
          }
          this.loginCheck();
        })
        .catch(err => {
          console.error(err);
        });
    },
    onReset(e) {
      e.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  created() {
    this.loginCheck();
  }
};
</script>

<style></style>
