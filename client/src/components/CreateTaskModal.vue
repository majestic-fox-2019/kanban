<template>
  <b-modal
    id="create-task-modal"
    centered
    title="Create Task"
    body-class="bg-gray-200"
    title-class="text-center font-bold w-100"
    header-class="bg-gray-400"
    footer-class="bg-gray-400"
    no-close-on-esc
    no-close-on-backdrop
    hide-footer
  >
    <b-form @submit.prevent="create">
      <b-form-group description="Task Title">
        <b-form-input
          v-model="title"
          type="text"
          placeholder="ex. Conquer the world!"
          required
        ></b-form-input>
      </b-form-group>

      <div class="w-100 flex justify-evenly">
        <b-button type="submit" variant="primary">
          <b-icon icon="archive-fill"></b-icon>
          Add
        </b-button>
        <b-button
          @click="$bvModal.hide('create-task-modal')"
          class="flex align-items-center"
        >
          <b-icon class="mr-1" icon="x-circle-fill"></b-icon>
          Close
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateTaskModal',
  data() {
    return {
      title: null
    }
  },
  methods: {
    create() {
      this.$alertify.confirm('Add this task?', () => {
        this.$emit('createTask', this.title)
        this.title = null
      })
    }
  }
}
</script>

<style></style>
