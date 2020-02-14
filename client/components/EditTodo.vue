<template>
    <div>
    <div class="container w-25" style="margin-top: 70px;">
      <div class="text-center editTodo">
        <form class="form-edittodo" v-on:submit.prevent="saveEditTodo(idTodo)">
          <input type="text" id="idTodo" v-model="idTodo" style="display: none;">
          <h1 class="h3 mb-3 font-weight-normal">Edit Todo</h1>
          <label for="inputTitle" class="sr-only">Title</label>
          <input type="text" id="inputTitle" class="form-control" placeholder="Title" v-model="title" required autofocus>
          <label for="inputDescription" class="sr-only">Description</label>
          <textarea name="inputDescription" id="inputDescription" class="form-control" placeholder="Description" v-model="description" cols="30" rows="10"></textarea>
          <button class="btn btn-lg btn-warning btn-block mt-2" type="submit">Save</button>
          <button class="btn btn-lg btn-secondary btn-block" v-on:click.prevent="cancelEditTodo">Cancel</button>
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

export default {
    name: 'edittodo',
    data: function() {
        return {
            idTodo: '',
            title: '',
            descriptioo: '',
        }
    },
    props: [ 'item' ],
    created() {
        this.idTodo = this.item.id
        this.title = this.item.title
        this.description = this.item.description
    },
    methods: {
        saveEditTodo(id) {
            axios({
              url: `${baseURL}/todos/${id}`,
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
              this.idTodo = ''
              this.title = ''
              this.description = ''
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Todo has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('afterEditTodo')
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

        cancelEditTodo() {
            this.idTodo = ''
            this.title = ''
            this.description = ''
            this.$emit('cancelEditTodo')
        },

    },
}
</script>

<style scoped>

</style>