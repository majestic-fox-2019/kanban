<template>
  <div class="flex flex-col" style="min-height: 100%;">
    <div class="flex justify-end my-10 px-5">
      <b-button variant="primary" @click="$bvModal.show('create-task-modal')">
        <b-icon icon="plus"></b-icon>
        NEW TASK
      </b-button>
      <CreateTaskModal @createTask="createTask"/>
    </div>
    <div class="row my-auto px-4">
      <DetailTaskModal :task="taskDetail" @editTask="updateTask" @deleteTask="deleteTask"/>
      <b-card
        class="col-sm-12 col-md-6 col-lg-3 bg-green-600"
        header="Backlogs"
        header-class="text-center text-white font-bold text-xl border-bottom"
        style="overflow-y:auto; height:70vh;"
      >
        <div class="card bg-gray-800 flex align-middle" v-if="task.backlogs.length == 0">
          <h2 class="text-center text-white my-auto">No Task Yet</h2>
        </div>
        <div v-else>
          <div class="mt-3" v-for="(task, i) in task.backlogs" :key="i">
            <TaskCard class="my-auto task-card" :task="task" @toDetail="showDetailModal" @patchCategory="patchCategory"/>
          </div>
        </div>
      </b-card>
      <b-card
        class="col-sm-12 col-md-6 col-lg-3 bg-indigo-600"
        header="To-Do"
        header-class="text-center text-white font-bold text-xl border-bottom"
        style="overflow-y:auto; height:70vh; "
      >
        <div class="card bg-gray-800 flex align-middle" v-if="task.todos.length == 0">
          <h2 class="text-center text-white my-auto">No Task Yet</h2>
        </div>
        <div v-else>
          <div class="mt-3" v-for="(task, i) in task.todos" :key="i">
            <TaskCard class="my-auto" :task="task" @toDetail="showDetailModal" @patchCategory="patchCategory"/>
          </div>
      </b-card>
      <b-card
        class="col-sm-12 col-md-6 col-lg-3 bg-yellow-600"
        header="On Progress"
        header-class="text-center text-white font-bold text-xl border-bottom"
        style="overflow-y:auto; height:70vh; "
      >
        <div class="card bg-gray-800 flex align-middle" v-if="task.onprogresses.length == 0">
          <h2 class="text-center text-white my-auto">No Task Yet</h2>
        </div>
        <div v-else>
          <div class="mt-3" v-for="(task, i) in task.onprogresses" :key="i">
            <TaskCard class="my-auto" :task="task" @toDetail="showDetailModal" @patchCategory="patchCategory"/>
          </div>
      </b-card>
      <b-card
        class="col-sm-12 col-md-6 col-lg-3 bg-blue-800"
        header="Completed"
        header-class="text-center text-white font-bold text-xl border-bottom"
        style="overflow-y:auto; height:70vh; "
      >
        <div class="card bg-gray-800 flex align-middle" v-if="task.completedList.length == 0">
          <h2 class="text-center text-white my-auto">No Task Yet</h2>
        </div>
        <div v-else>
          <div class="mt-3" v-for="(task, i) in task.completedList" :key="i">
            <TaskCard class="my-auto" :task="task" @toDetail="showDetailModal" @patchCategory="patchCategory"/>
          </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import DetailTaskModal from './DetailTaskModal'
import CreateTaskModal from './CreateTaskModal'
import TaskCard from './TaskCard'
import axios from 'axios'
export default {
  name: 'Homepage',
  components: {
    CreateTaskModal,
    TaskCard,
    DetailTaskModal
  },
  data() {
    return {
      task: {
        backlogs: [],
        todos: [],
        onprogresses: [],
        completedList: []
      },
      taskDetail: null,
      categories: ['backlog', 'todo', 'onprogress', 'completed']
    }
  },
  created() {
    this.getAllTasks()
  },
  mounted(){
    this.$socket.on('taskUpdated',  () => {
      this.getAllTasks()
    })
  },
  methods: {
    getAllTasks(){
      axios({
      method: 'GET',
      url: 'http://localhost:3000/tasks/',
      headers: {
        token: localStorage.token
      }
    })
      .then(({ data }) => {
        // console.log(data)
        this.task = {
          backlogs: [],
          todos: [],
          onprogresses: [],
          completedList: []
        }
        data.forEach((taskData) => {
          if (taskData.category == 'backlog') {
            this.task.backlogs.push(taskData)
          } else if (taskData.category == 'todo') {
            this.task.todos.push(taskData)
          } else if (taskData.category == 'onprogress') {
            this.task.onprogresses.push(taskData)
          } else if (taskData.category == 'completed') {
            this.task.completedList.push(taskData)
          }
        })
      })
      .catch((err) => {
        console.log(err.response.data)
      })
    },
    createTask(title){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/tasks/',
        headers: {
          token: localStorage.token
        },
        data: {
          title: title
        }
      })
        .then(({ data }) => {
          //   console.log(data)
          this.$socket.emit('updateTaskList')
          this.$alertify.success(`${data.title.toUpperCase()} has been added`)
          this.$bvModal.hide('create-task-modal')
        })
        .catch((err) => {
          //   console.log(err.response)
          err.response.data.forEach((error) => {
            this.$alertify.success(error)
          })
        })
    },
    patchCategory(task){
      const categoryToUpdate = this.getCategoryToUpdate(task.category, task.status)
      // console.log(categoryToUpdate);
      axios({
        method: 'PATCH',
        url: 'http://localhost:3000/tasks/'+task.id,
        headers: {
          token: localStorage.token
        },
        data: {
          category: categoryToUpdate,
          status: task.status
        }
      })
      .then(({data}) => {
        // console.log(data);
        this.$socket.emit('updateTaskList')
        this.$alertify.success(`${data.title.toUpperCase()} updated to ${data.category.toUpperCase()}`)
      }).catch((err) => {
        console.log(err.response);
      });
    },
    updateTask(task){
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/tasks/'+task.id,
          headers: {
            token: localStorage.token
          },
          data: {
            title: task.title
          }
        })
        .then(({data}) => {
          // console.log(data);
          this.$bvModal.hide('task-detail-modal')
          this.$socket.emit('updateTaskList')
          this.$alertify.success(`${data.title} updated`)
        }).catch((err) => {
          console.log(err.response.data);
        });
    },
    deleteTask(taskId){
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/tasks/'+taskId,
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        // console.log(data);
        this.$bvModal.hide('task-detail-modal')
        this.$socket.emit('updateTaskList')
        this.$alertify.success(`${data.title} deleted`)
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    getCategoryToUpdate(currentCategory, status){
      let category = this.categories.indexOf(currentCategory)
      if (status == 'update') {
        return this.categories[category + 1]
      } else {
        return this.categories[category - 1]
      } 
    },
    showDetailModal(task) {
      this.taskDetail = task
      this.$bvModal.show('task-detail-modal')
    }
  }
}
</script>

<style scoped>
.task-card{
  transition: 0.5s
}

.task-card:hover{
  transition: 0.5s;
  background-color: rgb(243, 243, 243)
}

</style>
