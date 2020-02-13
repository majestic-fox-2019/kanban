<template>
  <section>
    <!-- login form -->
    <div id="loginForm" v-if="loginForm">
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">KANBAND</div>

            <div class="input-fields">
              <!-- <input type='text' placeholder='Username' class='input-line full-width'></input> -->
              <input
                type="email"
                placeholder="Email"
                class="input-line full-width"
                id="email"
                v-model="loginData.email"
              />
              <input
                type="password"
                placeholder="Password"
                class="input-line full-width"
                id="password"
                v-model="loginData.password"
              />
            </div>

            <div>
              <button class="ghost-round full-width" id="login" @click="loginHandle">Login</button>
              <button
                class="ghost-round full-width"
                id="register"
                @click="toRegister"
              >to Create Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end login form -->

    <!-- register form -->
    <div id="loginForm" v-if="registerForm">
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">KANBAND</div>

            <div class="input-fields">
              <input
                type="text"
                placeholder="Username"
                class="input-line full-width"
                id="name"
                required
                v-model="registerData.name"
              />
              <input
                type="email"
                placeholder="Email"
                class="input-line full-width"
                id="email"
                required
                v-model="registerData.email"
              />
              <input
                type="password"
                placeholder="Password"
                class="input-line full-width"
                id="password"
                required
                v-model="registerData.password"
              />
            </div>

            <div>
              <button
                class="ghost-round full-width"
                id="register"
                @click="registerHandle"
              >Create Account</button>
              <button class="ghost-round full-width" id="login" @click="toLogin">to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end logi form -->
  </section>
</template>

<script>
export default {
  name: "loginRegister",
  data() {
    return {
      loginForm: true,
      registerForm: false,
      loginData: {
        email: null,
        password: null
      },
      registerData: {
        name: null,
        email: null,
        password: null
      }
    };
  },
  methods: {
    toRegister() {
      this.loginForm = false;
      this.registerForm = true;
    },
    toLogin() {
      this.loginForm = true;
      this.registerForm = false;
    },
    loginHandle() {
      this.$emit("fromLogin", this.loginData);
    },
    registerHandle() {
      this.$emit("fromRegister", this.registerData);
    }
  }
};
</script>