<template>
  <div>
    <Navbar :isLogin="isLogin" @logout="getLogout" />
    <div class="mt-10" v-if="!isLogin">
      <Frontpage @login="login" />
    </div>
    <div class="animated fadeIn fast" v-else>
      <Homepage />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Frontpage from './components/Frontpage'
import Homepage from './components/Homepage'
export default {
  name: 'App',
  components: {
    Navbar,
    Frontpage,
    Homepage
  },
  data() {
    return {
      isLogin: false
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    login(value) {
      this.isLogin = value
    },
    getLogout() {
      this.isLogin = false
      localStorage.clear()
      this.$alertify.success('Logout Success')
    }
  }
}
</script>

<style></style>
