<template>
  <div class="mt-2 pl-2 pr-2 pb-3">
    <v-card>
      <v-card-title class="headline text-center">{{ task.title }}</v-card-title>
      <v-card-text>
        {{ task.description }}
        <p>Assigned to : {{ task.assigned_to }}</p>
      </v-card-text>
      <v-btn
        class="mr-1"
        color="red"
        style="color: white;"
        @click.prevent="deleteTask(task)"
        >Delete</v-btn
      >
      <v-btn
        class="mr-1"
        color="orange"
        style="color: white;"
        @click.prevent="editTask(task)"
        >Edit</v-btn
      >

      <div id="taskCard"></div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['task'],
  methods: {
    deleteTask(task) {
      return this.$emit('DELETE_TASK', task)
    },
    editTask(task) {
      return this.$emit('EDIT_TASK', task)
    }
  }
}
</script>

<style lang="css" scoped>
.v-card {
  cursor: grab;
}
</style>
