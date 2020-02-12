<template>
  <div>
    <h2>{{ project.name }} Project</h2>
    <v-row>
      <v-col md="3" lg="3" v-for="(category, i) in categories" :key="i">
        <v-card :color="category.color">
          <v-card-title class="headline text-center">{{
            category.name
          }}</v-card-title>

          <div id="taskCard"></div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'KanbanBoard',
  data() {
    return {
      categories: [
        {
          name: 'Backlog',
          status: 'backlog',
          color: 'red darken-1',
          task: []
        },
        {
          name: 'Todo',
          status: 'todo',
          color: 'orange darken-1',
          task: []
        },
        {
          name: 'Ongoing',
          status: 'ongoing',
          color: 'blue darken-1',
          task: []
        },
        {
          name: 'Completed',
          status: 'completed',
          color: 'green darken-1',
          task: []
        }
      ]
    }
  },
  props: ['project']
}
</script>

<style lang="css" scoped>
.v-btn,
.v-card {
  color: white !important;
  font-weight: 500;
  min-height: 15vh;
}
</style>
