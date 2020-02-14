<template>
  <div>
    <h2>{{ project.name }} Project</h2>
    <p>
      <v-btn color="primary" class="mr-1" @click.stop="dialog2 = true"
        >Add task</v-btn
      >
      <v-btn color="green" class="mr-1" @click.stop="inviteMember"
        >Invite new member</v-btn
      >
    </p>
    <a href="#" @click.stop="dialog = true">View Project Members</a>
    <v-row>
      <v-col md="3" lg="3" v-for="(category, i) in categories" :key="i">
        <v-card :color="category.color">
          <v-card-title class="headline text-center">{{
            category.name
          }}</v-card-title>

          <div id="taskCard">
            <draggable
              v-model="category.task"
              group="category"
              @start="drag = true"
              @end="drag = false"
            >
              <TaskCard
                v-for="(task, i) in category.task"
                :key="i"
                :task="task"
                v-on:DELETE_TASK="deleteTask"
                v-on:EDIT_TASK="getEdit"
              ></TaskCard>
            </draggable>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <ModalMember
      :projectMembers="project.members"
      :dialog="dialog"
      :invite="invite"
      @sendInvite="sendInvite"
      @CLOSE_MODAL="dialog = false"
    ></ModalMember>

    <v-dialog v-model="dialog2" max-width="320">
      <v-card>
        <v-card-title class="headline" v-if="!editId"
          >Create new Task</v-card-title
        >
        <v-card-title class="headline" v-else>Edit Task</v-card-title>
        <v-form>
          <v-text-field
            v-model="task.title"
            type="text"
            label="Title"
            style="padding: 20px;"
          ></v-text-field>
          <v-text-field
            v-model="task.description"
            type="text"
            label="Description"
            style="padding: 20px;"
          ></v-text-field>
        </v-form>
        <v-btn
          color="green darken-1"
          text
          @click.prevent="createTask"
          v-if="!editId"
        >
          Submit
        </v-btn>
        <v-btn color="orange darken-1" text @click.prevent="editTask" v-else>
          Edit
        </v-btn>
        <v-btn color="green darken-1" text @click.prevent="dialog2 = false">
          Close
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import TaskCard from './TaskCard'
import draggable from 'vuedraggable'
import ModalMember from './ModalMember'

export default {
  name: 'KanbanBoard',
  data() {
    return {
      dialog: false,
      dialog2: false,
      editId: null,
      invite: false,
      task: {
        title: null,
        description: null,
        projectId: this.project.id
      },
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
  methods: {
    fetchProjectTasks(id) {
      axios
        .get(`${this.$BASE_URL}/tasks/${id}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.categories.forEach(el => {
            el.task = []
            data.forEach(task => {
              if (el.status == task.status) {
                el.task.push(task)
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    createTask() {
      const id = this.task.projectId
      const form = {
        title: this.task.title,
        description: this.task.description
      }
      axios
        .post(`${this.$BASE_URL}/tasks/${id}`, form, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Success', 'New task added', 'success')
          this.dialog2 = false
          this.fetchProjectTasks(id)
          this.$socket.emit('changeTask', 'new task added')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteTask(val) {
      axios
        .delete(`${this.$BASE_URL}/tasks/${val}/${this.task.projectId}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(resp => {
          this.fetchProjectTasks(this.task.projectId)
          this.$socket.emit('changeTask', 'task deleted')
          Swal.fire('Success', 'Task deleted', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getEdit(val) {
      this.editId = val.id
      this.task.title = val.title
      this.task.description = val.description
      this.dialog2 = true
    },
    editTask() {
      const data = {
        title: this.task.title,
        description: this.task.description
      }
      const id = this.task.projectId
      axios
        .put(`${this.$BASE_URL}/tasks/${this.editId}/${id}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          this.dialog2 = false
          this.fetchProjectTasks(id)
          this.$socket.emit('changeTask', 'task edited')
          Swal.fire({
            title: 'Success',
            text: 'Task edited',
            icon: 'success',
            timer: 1500
          })
        })
        .catch(({ response }) => {
          Swal.fire('Oops', response, 'error')
        })
    },
    inviteMember() {
      this.dialog = true
      this.invite = true
    },
    sendInvite(email) {
      const id = this.task.projectId
      const data = {
        email: email
      }
      axios
        .post(`${this.$BASE_URL}/projects/invite/${id}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(resp => {
          this.dialog = false
          this.email = null
          this.$socket.emit('newInvite', 'Invite member')
          Swal.fire({
            title: 'Success',
            text: 'User invited',
            icon: 'success',
            timer: 1500
          })
        })
        .catch(({ response }) => {
          const error = response.data.err[0]
          Swal.fire({ title: 'Oops', text: error, icon: 'error', timer: 1500 })
        })
    }
  },
  props: ['project'],
  components: {
    TaskCard,
    draggable,
    ModalMember
  },
  watch: {
    categories: {
      deep: true,
      handler: function(val, old) {
        val.forEach(el => {
          if (el.task.length !== 0) {
            el.task.forEach(todo => {
              if (todo.status !== el.status) {
                axios
                  .patch(
                    `${this.$BASE_URL}/tasks/${todo.id}/${todo.ProjectId}`,
                    { status: el.status },
                    { headers: { token: localStorage.getItem('token') } }
                  )
                  .then(response => {
                    // this.fetchProjectTasks(this.task.projectId)
                    this.$socket.emit('changeTask', 'task moved')
                  })
                  .catch(({ response }) => {
                    if (response.data.code == 403) {
                      Swal.fire('Forbidden', 'Unauthorized', 'error')
                    }
                  })
              }
            })
          }
        })
      }
    },
    dialog2: function(val, old) {
      if (!val) {
        this.task.title = null
        this.task.description = null
        this.editId = null
      }
    },
    dialog: function(val, old) {
      if (!val) {
        this.invite = false
      }
    }
  },
  created() {
    this.fetchProjectTasks(this.project.id)
  },
  mounted() {
    const projectId = this.project.id
    this.$socket.on('taskChanged', msg => {
      this.fetchProjectTasks(projectId)
    })
  }
}
</script>

<style lang="css" scoped>
.v-card {
  color: white !important;
  font-weight: 500;
  min-height: 15vh;
}
.v-btn {
  color: white;
}
.v-dialog .headline {
  color: black !important;
}
</style>
