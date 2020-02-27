<template>
  <div id="register-page" class="col-md-12 bg-primary registerpage">
    <div class="col-md-4 mx-auto form-register-container">
      <h2 class="text-center text-primary pt-2">Kanban | Register</h2>
      <form @submit.prevent="doRegister">
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            placeholder="Put your name"
            v-model="register_data.form.name"
            :class="`form-control ${register_data.error.errorClass.name}`"
          />
          <span class="invalid-feedback">{{ register_data.error.errorMessage.name }}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            placeholder="Put your email"
            v-model="register_data.form.email"
            :class="`form-control ${register_data.error.errorClass.email}`"
          />
          <span class="invalid-feedback">{{ register_data.error.errorMessage.email }}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            placeholder="Put your password"
            v-model="register_data.form.password"
            :class="`form-control ${register_data.error.errorClass.password}`"
          />
          <span class="invalid-feedback">{{ register_data.error.errorMessage.password }}</span>
        </div>
        <button type="submit" class="btn full-width-btn btn-primary">
          Register
        </button>
        <p class="pt-4 text-primary text-center">
          <a href="#" @click.prevent="redirectToLogin">Already have account ? login here</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  props : ['host','register_data', 'page'],
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    doRegister(){
      this.$parent.doRegister()
    },
    redirectToLogin(){
      this.$parent.redirectAuthPage()
    }
  }
};
</script>

<style></style>
