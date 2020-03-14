<template>
  <!-- Default form login -->
  <b-container
    class="d-flex justify-content-center align-items-center"
    style="height: 100%;"
  >
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h1>Register</h1>
      <b-form-group
        id="input-group-name"
        label="Your Name:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter your name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
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
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      // alert(JSON.stringify(this.form, null, 2));
      this.$axios({
        url: `${this.$SERVER_URL}/users/register`,
        method: "post",
        data: this.form
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          console.error(err);
          this.resetForm();
        });
    },
    onReset(e) {
      e.preventDefault();
      this.resetForm();
    },
    resetForm() {
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style></style>
