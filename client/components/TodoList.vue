<template>
    <div>
      <div class="container-fluid text-center fixed-top" style="margin-top: 70px;">
        <div class="row">
            <h6 class="col mx-2 py-2" style="color:floralwhite; background-color: darkorange;"><span>Backlog</span></h6>
            <h6 class="col mx-2 py-2" style="color:floralwhite; background-color: darkviolet;"><span>Todo</span></h6>
            <h6 class="col mx-2 py-2" style="color:floralwhite; background-color: darkgreen;"><span>Doing</span></h6>
            <h6 class="col mx-2 py-2" style="color:floralwhite; background-color: dodgerblue;"><span>Done</span></h6>
        </div>
        <div class="row">
            <div v-for="(data,i) in todoData" :key="i" class="backlog col p-1">
                <todoitem
                    v-for="(item,j) in todoData[i].item" :key="j" :item="item"
                    @showViewTodo="showViewTodo"
                    @showEditTodo="showEditTodo"
                    @afterDeleteTodo="afterDeleteTodo"
                ></todoitem>
            </div>
        </div>
      </div>

        <div class="modal fade" id="viewTodo" tabindex="-1" role="dialog" v-if="page=='viewTodo'" aria-labelledby="viewTodoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header" style="background-color: yellowgreen;">
                    <h5 class="modal-title" id="viewTodoLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.prevent="cancelViewTodo">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ description }}</p>
                    <p>{{ assignedTo }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" v-on:click.prevent="buttonLeftClick(idTodo)">{{ buttonLeft}}</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.prevent="cancelViewTodo">Close</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click.prevent="buttonRightClick(idTodo)">{{ buttonRight}}</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

import todoitem from './TodoItem.vue'

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://kanban-km.herokuapp.com'

export default {
    name: 'todolist',
    components: {
        todoitem
    },
    data: function() {
        return {
          todoData : [
            {
              name: 'Back-Log',
              item: []
            },
            {
              name: 'Todo',
              item: []
            },
            {
              name: 'Doing',
              item: []
            },
            {
              name: 'Done',
              item: []
            },
          ],
          page: '',
          idTodo: '',
          title: '',
          description: '',
          assignedTo: '',
          category: '',
          buttonLeft: '',
          buttonRight: '',
          item: null,
          socket: io('https://kanban-km.herokuapp.com'),
        }
    },
    created(){
        this.fetchData()
    },
    mounted() {
        this.socket.on('CHANGE', () => {
          this.fetchData()
        })
    },
    methods: {
        fetchData() {
            axios({
              url: `${baseURL}/todos`,
              method: 'GET',
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              this.todoData[0].item = []
              this.todoData[1].item = []
              this.todoData[2].item = []
              this.todoData[3].item = []
              data.forEach(element => {
                switch(element.category) {
                  case 'backlog':
                    this.todoData[0].item.push(element)
                    break;
                  case 'todo':
                    this.todoData[1].item.push(element)
                    break;
                  case 'doing':
                    this.todoData[2].item.push(element)
                    break;
                  case 'done':
                    this.todoData[3].item.push(element)
                    break;
                }
              })
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
        },

        showViewTodo(item) {
            this.item = item
            this.page = 'viewTodo'
            this.title = item.title
            this.description = item.description
            this.idTodo = item.id
            this.assignedTo = item.assignedTo
            this.category = item.category

            switch(item.category) {
              case "backlog":
                this.buttonLeft = '#'
                this.buttonRight = 'Todo'
                break;
              case "todo":
                this.buttonLeft = 'Back-Log'
                this.buttonRight = 'Doing'
                break;
              case "doing":
                this.buttonLeft = 'Todo'
                this.buttonRight = 'Done'
                break;
              case "done":
                this.buttonLeft = 'Doing'
                this.buttonRight = '#'
                break;
            }
            $('#viewTodo').modal('show')
        },

        cancelViewTodo() {
            this.idTodo = ''
            this.title = ''
            this.description = ''
            this.assignedTo = ''
            this.category = ''
            this.buttonLeft = ''
            this.buttonRight = ''
            this.page = 'kanban'
        },

        buttonLeftClick(id) {
            let status = ''
            switch(this.buttonLeft) {
              case "Back-Log":
                status = 'backlog';
                break;
              case "Todo":
                status = 'todo';
                break;
              case "Doing":
                status = 'doing';
                break;
            }

            axios({
              url: `${baseURL}/todos/${id}`,
              method: 'PATCH',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                category: status
              }
            })
            .then(result => {
              this.idTodo = ''
              this.title = ''
              this.description = ''
              this.assignedTo = ''
              this.category = ''
              this.buttonLeft = ''
              this.buttonRight = ''
              this.page = 'kanban'
              this.fetchData()
              this.socket.emit('SOMETHING_CHANGE')
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

        buttonRightClick(id) {
            let status = ''
            switch(this.buttonRight) {
              case "Done":
                status = 'done';
                break;
              case "Todo":
                status = 'todo';
                break;
              case "Doing":
                status = 'doing';
                break;
            }

            axios({
              url: `${baseURL}/todos/${id}`,
              method: 'PATCH',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                category: status
              }
            })
            .then(result => {
              this.idTodo = ''
              this.title = ''
              this.description = ''
              this.assignedTo = ''
              this.category = ''
              this.buttonLeft = ''
              this.buttonRight = ''
              this.page = 'kanban'
              this.fetchData()
              this.socket.emit('SOMETHING_CHANGE')
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

        showEditTodo(item) {
          this.$emit('showEditTodo', item)
        },

        afterDeleteTodo() {
          this.fetchData()
          this.socket.emit('SOMETHING_CHANGE')
        }
    },
}
</script>

<style>

</style>