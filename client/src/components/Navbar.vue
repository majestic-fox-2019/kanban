<template>
  <b-navbar
    class="flex justify-between shadow"
    style="background-image: radial-gradient( circle 1437px at -2% 103.3%,  rgba(182,32,180,1) 0%, rgba(162,39,182,1) 10.5%, rgba(116,55,188,1) 47%, rgba(98,63,177,1) 57.1%, rgba(68,78,159,1) 86.1%, rgba(57,83,152,1) 100.2% );"
  >
    <b-navbar-brand
      class="flex font-bold text-white justify-center align-self-center"
    >
      <b-icon class="h2 mr-1" icon="kanban-fill"></b-icon>
      Kanban App
    </b-navbar-brand>
    <b-navbar-brand class="font-bold text-white" v-if="isLogin">
      <b-button
        class="flex align-items-center"
        variant="warning"
        @click="logout"
      >
        <b-icon class="bg-danger rounded-circle mr-1" icon="power"></b-icon>
        Logout
      </b-button>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['isLogin'],
  methods: {
    logout() {
      this.$alertify.confirm('Are you sure want to logout?', () => {
        this.$emit('logout')
      })
    }
  }
}
</script>

<style></style>
