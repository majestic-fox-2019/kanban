<template>
    <div>
        <div class="col">
            <div class="card mb-4 box-shadow">
                <div class="card-header">
                <p class="card-text">{{ item.title }}</p>
                </div>
                <div class="card-body">
                <p class="card-text">{{ item.description }}</p>
                <p class="card-text">{{ item.assignedTo }}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="showViewTodo(item)">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click.prevent="showEditTodo(item)">Edit</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click.prevent="deleteTodo(item.id)">Delete</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000'

export default {
    name: 'todoitem',
    props: ['item'],
    methods: {
        showViewTodo(item) {
            this.$emit('showViewTodo', item)
        },

        showEditTodo(item) {
            this.$emit('showEditTodo', item)
        },

        deleteTodo(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                console.log(result)
                //cancel = result.dismiss: cancel
                //yes = result.value: true
                if (result.value) {
                    axios({
                        url: `${baseURL}/todos/${id}`,
                        method: 'DELETE',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'Todo has been deleted.',
                            'success'
                        )
                        this.$emit('afterDeleteTodo')
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error :',
                            text: error.response.data.error,
                        })
                        console.log(error.response.data.error)
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>