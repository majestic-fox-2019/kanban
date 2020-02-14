<template>
  <b-modal id="task-detail-modal" title="Task Detail" centered hide-footer>
    <!-- <pre>{{ task }}</pre> -->
    <b-form v-if="task">
      <b-form-group label="Assigned To:" v-if="task.User">
        <div class="border-bottom w-full"></div>
        <div class="flex justify-between">
          <b-form-group label="Name:" class="my-1" style="max-width:50%;">
            <b-form-input
              class=""
              v-model="task.User.name"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email:" class="my-1" style="max-width:50%;">
            <b-form-input v-model="task.User.email" disabled></b-form-input>
          </b-form-group>
        </div>
      </b-form-group>
      <div class="border-bottom w-full" v-if="task.User"></div>
      <b-form-group
        class="mt-1"
        :description="!onEdit ? 'Click edit button to modify' : ''"
        label="Task Title:"
      >
        <b-form-input
          placeholder="Title"
          v-model="task.title"
          :disabled="!onEdit"
        ></b-form-input>
      </b-form-group>
      <div class="flex justify-evenly">
        <b-button
          variant="warning"
          @click="onEdit = true"
          v-if="!onEdit && task.User && task.User.email === userEmail"
        >
          <b-icon icon="pencil"></b-icon>
          Edit
        </b-button>
        <b-button
          variant="primary"
          @click="edit(task)"
          v-if="onEdit && task.User && task.User.email === userEmail"
        >
          <b-icon icon="archive-fill"></b-icon>
          Save</b-button
        >
        <b-button
          variant="danger"
          @click="deleteTask(task)"
          v-if="task.User && task.User.email === userEmail"
        >
          <b-icon icon="trash-fill"></b-icon>
          Delete
        </b-button>
        <b-button variant="danger" @click="deleteTask(task)" v-if="!task.User">
          <b-icon icon="trash-fill"></b-icon>
          Delete
        </b-button>
        <b-button @click="cancel" class="flex align-items-center">
          <b-icon class="mr-1" icon="x-circle-fill"></b-icon>
          Cancel
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'DetailModalVue',
  props: ['task'],
  data() {
    return {
      onEdit: false,
      userEmail: localStorage.email
    }
  },
  methods: {
    edit(task) {
      this.$alertify.confirm('Update this task?', () => {
        this.$emit('editTask', task)
      })
    },
    deleteTask(task) {
      this.$alertify.confirm('Delete this task?', () => {
        this.$emit('deleteTask', task.id)
      })
    },
    cancel() {
      this.onEdit = false
      this.$bvModal.hide('task-detail-modal')
    }
  }
}
</script>

<style></style>
