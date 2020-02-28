<template>
  <div id="navbar">
    <ul>
      <li>
          <p class="h2" style="color: white">
              M's kanban
              <b-icon icon="kanban">
              </p>
        </li>
      <li>
        <img
          src="/src/logohack_white-d25227823442525b2cb35c6a03529315.png"
          alt=""
        />
      </li>
      <li><a href="" v-if="token" @click="logout">Logout</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "navbar",
  props: ['token'],
  data() {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
    }
  }
};
</script>
<style>
</style>