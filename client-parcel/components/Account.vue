<template>
  <div class="akun" v-on:click="toggleLogout">
    <h4>
      {{name}}
      <i class="fas fa-sort-down" style="position:relative;margin-left: 10px;top: -2px;"></i>
    </h4>
    <div class="dropdown" v-if="showLogout==true" v-on:click="newLogout">logout</div>
  </div>
</template>

<script>
export default {
  name: "Account",
  props: ["logout"],
  data() {
    return {
      name: localStorage.getItem("name"),
      showLogout: false
    };
  },
  methods: {
    newLogout() {
      this.logout();
    },
    toggleLogout() {
      this.showLogout = !this.showLogout;
    }
  }
};
</script>

<style>
</style>