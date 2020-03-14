<template>
  <div style="background-color: #6fbed6;" class="ui menu navbar">
    <div class="header item">Kanban</div>
    <a @click="addTodo" class="active item">Add todo</a>
    <div class="right menu">
      <a @click.prevent="logout" class="item">LogOut</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout() {
      this.$emit('logout', true)
    },
    addTodo() {
      this.$emit('addTodo', true)
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: darkgray;
}
</style>
