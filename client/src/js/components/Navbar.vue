<template>
  <div>
    <v-app-bar color="black accent-1" dark>
      <v-toolbar-title @click.prevent="backHome">
        <h3>Kanban</h3>
      </v-toolbar-title>
      <v-btn icon @click.prevent="backHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="!isLogin" @click.prevent="loginPage">
        <h3>Login</h3>
      </v-btn>
      <div id="logout-btn" v-else>
        <v-btn @click.prevent="logout">
          <h3>Logout</h3>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['isLogin'],
  methods: {
    logout() {
      return this.$emit('LOGOUT')
    },
    loginPage() {
      return this.$emit('changeForm')
    },
    backHome() {
      return this.$emit('BACK')
    }
  }
}
</script>

<style lang="css" scoped>
h3 {
  cursor: pointer;
}
</style>
