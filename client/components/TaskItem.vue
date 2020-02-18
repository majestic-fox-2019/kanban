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
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="showViewTask(item)">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click.prevent="showEditTask(item)">Edit</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click.prevent="deleteTask(item.id)">Delete</button>
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
// const baseURL = 'https://kanban-km.herokuapp.com'

export default {
    name: 'taskitem',
    props: ['item'],
    methods: {
        showViewTask(item) {
            this.$emit('showViewTask', item)
        },

        showEditTask(item) {
            this.$emit('showEditTask', item)
        },

        deleteTask(id) {
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
                        url: `${baseURL}/tasks/${id}`,
                        method: 'DELETE',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'Task has been deleted.',
                            'success'
                        )
                        this.$emit('afterDeleteTask')
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