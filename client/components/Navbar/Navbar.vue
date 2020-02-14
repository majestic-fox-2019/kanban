<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-special justify-content-between">
      <a class="navbar-brand bold" href="#">KANBAN</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <right-navbar :users="data_name"></right-navbar>
    </nav>
  </header>
</template>

<script>
import RightNavbar from './RightNavbar'

export default {
  props: ['data_name'],
  components: {
    'right-navbar': RightNavbar
  },
  data(){
    return {}
  },
  methods: {
    doLogout(){
      localStorage.clear()
      this.$emit('mainpage')
      this.$emit('loginpage')
      this.mainPage = false
      this.loginPage = true
      this.notif('success', 'Log Out')
    },
    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    }
  },
  
}
</script>

<style>
</style>