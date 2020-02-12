<template>
  <div>
    <v-row align="center">
      <v-col md="8" lg="8">
        <v-img src="../assets/task.svg" aspect-ratio="1.5"></v-img>
      </v-col>
      <v-col md="4" lg="4">
        <h1>Welcome to Kanban</h1>
        <h3 v-if="register">Please register to start</h3>
        <h3 v-else>Login to your account and start</h3>
        <v-form>
          <v-row>
            <v-col md="10">
              <v-text-field
                v-model="form.name"
                label="Name"
                required
                md="8"
                v-if="register"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                type="email"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                type="password"
                name="input-10-1"
                label="Password"
                hint="At least 6 characters"
                counter
                required
              ></v-text-field>

              <v-btn
                color="success"
                class="mr-4"
                @click.prevent="registerUser"
                v-if="register"
              >
                Register
              </v-btn>

              <v-btn color="success" class="mr-4" @click.prevent="login" v-else>
                Login
              </v-btn>
            </v-col>
            <h4 v-if="register">
              Already have an account?
              <a href="#" @click.prevent="changeRegister">Login here</a>
            </h4>
            <h4 v-else>
              Dont have an account?
              <a href="#" @click.prevent="changeRegister">Register here</a>
            </h4>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      register: true,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  props: ['isLogin', 'changeForm'],
  methods: {
    changeRegister() {
      this.register = !this.register
    },
    registerUser() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      return this.$emit('REGISTER', this.form)
    },
    login() {
      const loginForm = {
        email: this.form.email,
        password: this.form.password
      }
      this.form.email = ''
      this.form.password = ''
      return this.$emit('LOGIN', loginForm)
    }
  },
  watch: {
    changeForm: function(val, old) {
      this.register = false
    }
  }
}
</script>

<style lang="css" scoped></style>
