<template>
    <div>
    <div class="container w-25" style="margin-top: 70px;">
      <div class="text-center editTask">
        <form class="form-edittask" v-on:submit.prevent="saveEditTask(idTask)">
          <input type="text" id="idTask" v-model="idTask" style="display: none;">
          <h1 class="h3 mb-3 font-weight-normal">Edit Task</h1>
          <label for="inputTitle" class="sr-only">Title</label>
          <input type="text" id="inputTitle" class="form-control" placeholder="Title" v-model="title" required autofocus>
          <label for="inputDescription" class="sr-only">Description</label>
          <textarea name="inputDescription" id="inputDescription" class="form-control" placeholder="Description" v-model="description" cols="30" rows="10"></textarea>
          <button class="btn btn-lg btn-warning btn-block mt-2" type="submit">Save</button>
          <button class="btn btn-lg btn-secondary btn-block" v-on:click.prevent="cancelEditTask">Cancel</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000'
// const baseURL = 'https://kanban-km.herokuapp.com'

export default {
    name: 'edittask',
    data: function() {
        return {
            idTask: '',
            title: '',
            descriptioo: '',
        }
    },
    props: [ 'item' ],
    created() {
        this.idTask = this.item.id
        this.title = this.item.title
        this.description = this.item.description
    },
    methods: {
        saveEditTask(id) {
            axios({
              url: `${baseURL}/tasks/${id}`,
              method: 'PUT',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                title: this.title,
                description: this.description
              }
            })
            .then(result => {
              this.idTask = ''
              this.title = ''
              this.description = ''
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Task has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('afterEditTask')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
        },

        cancelEditTask() {
            this.idTask = ''
            this.title = ''
            this.description = ''
            this.$emit('cancelEditTask')
        },

    },
}
</script>

<style scoped>

</style>