<template>
  <div class="mt-5 mb-3 taskCard">
      <div class="taskCardContent">
          <div class="taskCardHeader">
              <div></div>
              <div>
              <h5>{{taskDetails.title}} <a v-if="taskDetails.UserId == userId || !taskDetails.UserId" href="#" @click="toggleEdit"><sup><i class="far fa-edit"></i></sup></a></h5>
              </div>
              <div>
              <b-button @click="deleteTask" variant="danger" style="max-height:100%;">X</b-button>
              </div>
          </div>
        <p>Assigned to: </p>
        <p v-if="taskDetails.User">{{taskDetails.User.email}}</p>
        <p v-else> - </p>
        <b-button v-if="taskDetails.category == 'Back-Log'" variant="success" @click="nextStatus">Take this Task</b-button>
        <b-button v-if="taskDetails.category == 'Done'" @click="prevStatus">Prev</b-button>
        <div v-if="taskDetails.category !== 'Back-Log' && taskDetails.category !== 'Done'" class="bottom-button">
            <b-button style="width:50%;" @click="prevStatus">prev</b-button>
            <b-button style="width:50%;" @click="nextStatus">next</b-button>
        </div>
      </div>
      <b-modal :id="`editTaskModal-${taskDetails.id}`" centered hide-footer size="sm">
    <template v-slot:modal-title>
      Edit Task
    </template>
    <b-form class="d-flex flex-column justify-content-center">
      <b-form-group
        id="input-group-1"
        label="Task Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="button" @click="editTask" variant="primary">Edit Task</b-button>
    </b-form>
  </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            title: '',
            userId: ''
        }
    },
    props: {
        taskDetails: {
            type: Object
        },
        projectName: {
            type: Object
        }
    },
    methods: {
        toggleEdit() {
            this.$bvModal.show(`editTaskModal-${this.taskDetails.id}`)
            this.title = this.taskDetails.title
        },
        editTask() {
            Swal.fire({
                title: 'Are you sure you want to edit this Task?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.value) {
                        return axios({
                            url: 'https://kanban-v2.herokuapp.com/tasks/' + this.taskDetails.id,
                            method: 'put',
                            headers: {
                                token: localStorage.getItem('token')
                            },
                            data: {
                                title: this.title
                            }
                        })
                    }
                })
            .then(({ data }) => {
                Swal.fire(
                        'Task Edited!',
                        '',
                        'success'
                        )
                this.$emit('statusChange', this.taskDetails.ProjectId)
                this.$socket.emit('taskUpdated', {id: this.taskDetails.ProjectId, msg: `The task on Project: ${this.projectName.name} has been updated!`, color: 'success'})
            })
            .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
            })
        },
        deleteTask() {
            Swal.fire({
                title: `Are you sure you want to delete task: ${this.taskDetails.title}?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        return axios({
                            url: 'https://kanban-v2.herokuapp.com/tasks/' + this.taskDetails.id,
                            method: 'delete',
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                    }
                })
            
            .then(({ data }) => {
                Swal.fire(
                        'Deleted!',
                        `Task: ${this.taskDetails.title} has been deleted.`,
                        'success'
                        )
                this.$emit('statusChange', this.taskDetails.ProjectId)
                this.$socket.emit('taskUpdated', {id: this.taskDetails.ProjectId, msg: `The task on Project: ${this.projectName.name} has been updated!`, color: 'danger'})
            })
            .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )
            })
        },
        nextStatus() {
            let message
            let change = {
                status: null
            }
            switch (this.taskDetails.category) {
                case 'Back-Log':
                    message = `Are you sure you want to take the task: ${this.taskDetails.title}?`
                    change.status = 'To-Do'
                    break;
                case 'To-Do':
                    change.status = 'On-Progress'
                    message = `Change task: ${this.taskDetails.title} to On Progress?`
                    break;
                case 'On-Progress':
                    change.status = 'Done'
                    message = `Change task: ${this.taskDetails.title} to Done?`
                    break;
                default:
                    break;
            }
            Swal.fire({
                title: message,
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continue'
                }).then((result) => {
                    if (result.value) {
                        return axios({
                            url: 'https://kanban-v2.herokuapp.com/tasks/' + this.taskDetails.id,
                            method: 'patch',
                            headers: {
                                token: localStorage.getItem('token')
                            },
                            data: change
                        })
                    }
                })
            .then(({ data }) => {
                Swal.fire(
                        'Status Changed!',
                        `${this.taskDetails.title} is now on ${change.status}`,
                        'success'
                        )
                this.$emit('statusChange', this.taskDetails.ProjectId)
                this.$socket.emit('taskUpdated', {id: this.taskDetails.ProjectId, msg: `The task on Project: ${this.projectName.name} has been updated!`, color: 'primary'})
            })
            .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )  
            })
        },
        prevStatus() {
            let message
            let change = {
                status: null
            }
            switch (this.taskDetails.category) {
                case 'Done':
                    change.status = 'On-Progress'
                    message = `Change task: ${this.taskDetails.title} to ${change.status}?`
                    break;
                case 'On-Progress':
                    change.status = 'To-Do'
                    message = `Change task: ${this.taskDetails.title} to ${change.status}?`
                    break;
                case 'To-Do':
                    change.status = 'Back-Log'
                    message = `Are you sure you want to release the task: ${this.taskDetails.title}?`
                    break;
                default:
                    break;
            }
            
            Swal.fire({
                title: message,
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continue'
                }).then((result) => {
                    if (result.value) {
                        return axios({
                            url: 'https://kanban-v2.herokuapp.com/tasks/' + this.taskDetails.id + '/prev',
                            method: 'patch',
                            headers: {
                                token: localStorage.getItem('token')
                            },
                            data: change
                        })
                    }
                })
            .then(({ data }) => {
                Swal.fire(
                        'Status Changed!',
                        `${this.taskDetails.title} is now on ${change.status}`,
                        'success'
                        )
                this.$emit('statusChange', this.taskDetails.ProjectId)
                this.$socket.emit('taskUpdated', {id: this.taskDetails.ProjectId, msg: `The task on Project: ${this.projectName.name} has been updated!`, color: 'warning'})
            })
            .catch(err => {
            Swal.fire(
                'Oops..',
                err.response.data,
                'error'
              )    
            })
        } 
    },
    created() {
        this.userId = localStorage.getItem('id')
    }
}
</script>

<style scoped>
    .taskCard {
        max-height: 80%;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .taskCardContent {
        height: 100%;
        width: 90%;
        background: aliceblue;
        border-radius: 15px;
        padding: 0.5em;
    }
    .taskCardHeader {
        display: flex;
        justify-content: space-between;
    }
    .bottom-button {
        display: flex;
        justify-content: center;
    }
</style>