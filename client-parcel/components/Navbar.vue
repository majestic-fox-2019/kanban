<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../public/icons/logo.png" alt="Logo" />
    </div>
    <Account v-bind:logout="logout"></Account>
  </nav>
</template>

<script>
import Account from "./Account";
export default {
  name: "Navbar",
  props: ["logout"],
  components: {
    Account
  }
};
</script>

<style>
</style>