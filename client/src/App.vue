<template>
  <div id="app">
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#"
        ><img alt="Vue logo" src="./assets/logo.png" style="height: 50px"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#" v-b-modal.add-task
              >Add Task</b-dropdown-item
            >
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
    </div> -->

    <router-view />

    <!-- Add Task -->
    <AddTask idName="add-task" />
  </div>
</template>

<script>
import AddTask from "@/components/AddTask";

export default {
  components: {
    AddTask
  },
  methods: {
    loginCheck() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/login");
      }
    },
    logout() {
      // eslint-disable-next-line
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
      auth2.disconnect();
      if (localStorage.length !== 0) {
        localStorage.clear();
        this.loginCheck();
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#navbar {
  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #0ae615;
    }
  }
}
</style>
