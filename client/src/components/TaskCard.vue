<template>
  <b-card
    class="my-auto animated zoomInDown fast "
    border-variant="primary"
    header-class="font-bold"
    :header="task.title.toUpperCase()"
    header-bg-variant="primary"
    header-text-variant="white"
    align="center"
  >
    <!-- <pre>{{ task }}</pre> -->
    <b-card-text v-if="task.UserId == undefined">
      Not Yet Assigned
    </b-card-text>
    <b-card-text v-else> Assigned to: {{ task.User.name }} </b-card-text>

    <b-button
      class="button"
      size="sm"
      variant="success"
      v-if="
        task.category !== 'backlog' &&
          task.User &&
          task.User.email === userEmail
      "
      @click="
        patchCategory({
          id: task.id,
          category: task.category,
          status: 'undo'
        })
      "
    >
      <b-icon icon="box-arrow-left"></b-icon>
      Undo
    </b-button>

    <b-button size="sm" class="button" @click="$emit('toDetail', task)">
      <b-icon icon="document-text"></b-icon>
      Detail
    </b-button>

    <b-button
      class="button"
      size="sm"
      variant="success"
      v-if="task.category === 'backlog'"
      @click="
        patchCategory({
          id: task.id,
          category: task.category,
          status: 'update'
        })
      "
    >
      <b-icon icon="person-fill"></b-icon>
      Take this task
    </b-button>

    <b-button
      class="button"
      size="sm"
      variant="success"
      v-if="
        task.category !== 'backlog' &&
          task.category !== 'completed' &&
          task.User &&
          task.User.email === userEmail
      "
      @click="
        patchCategory({
          id: task.id,
          category: task.category,
          status: 'update'
        })
      "
    >
      <b-icon icon="box-arrow-right"></b-icon>
      Update
    </b-button>
    <!-- <a href="#" class="stretched-link"> </a> -->
  </b-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TaskCard',
  props: ['task'],
  data() {
    return {
      userEmail: localStorage.email
    }
  },
  methods: {
    patchCategory(task) {
      /* 
        task value :
        task = {
          id,
          category
        }
      */
      this.$alertify.confirm('Update this task?', () => {
        this.$emit('patchCategory', task)
      })
    }
  }
}
</script>

<style scoped>
.button {
  transition: 0.2s;
}

.button:hover {
  transition: 0.2s;
  font-size: 1rem;
}
</style>
