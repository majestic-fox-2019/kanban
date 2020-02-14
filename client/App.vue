<template>
<div>
    <registerlogin
        v-if="page=='login'"
        @afterRegisterLogin="afterRegisterLogin"
    ></registerlogin>
    <navbar
        v-if="page=='kanban' || page=='addTodo' || page=='editTodo' || page=='viewTodo'"
        @logout="logout"
        :email="dataUser.email"
        @addTodo="addTodo"
        @kanban="kanban"
    ></navbar>
    <addtodo
        v-if="page=='addTodo'"
        @cancelAddTodo="cancelAddTodo"
        @afterAddTodo="afterAddTodo"
    ></addtodo>
    <todolist
        v-if="page=='kanban'"
        @showEditTodo="showEditTodo"
    ></todolist>
    <edittodo
        v-if="page=='editTodo'"
        :item="item"
        @cancelEditTodo="cancelEditTodo"
        @afterEditTodo="afterEditTodo"
    ></edittodo>
</div>
</template>

<script>
import io from 'socket.io-client'
import Swal from 'sweetalert2'

import registerlogin from './components/RegisterLogin.vue'
import navbar from './components/NavBar.vue'
import addtodo from './components/AddTodo.vue'
import todolist from './components/TodoList.vue'
import edittodo from './components/EditTodo.vue'

const baseURL = 'http://localhost:3000'

export default {
    name: 'app',
    components: {
        registerlogin,
        navbar,
        addtodo,
        todolist,
        edittodo,
    },
    data: function() {
        return {
            page :'',
            dataUser: {},
            item: null,
            socket: io(`${baseURL}`),
        }
    },
    created(){
        if(localStorage.token === undefined || localStorage.token === "") {
            this.page = 'login'
        } else {
            this.page = 'kanban'
            this.dataUser.email = localStorage.email
        }

    },
    methods: {
        kanban() {
            this.page = 'kanban'
        },
        afterRegisterLogin(user){
            this.dataUser = user
            this.page = 'kanban'
        },
        logout() {
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut()
            .then(function() {
              console.log('User sign out from google.')
            })
            Swal.fire(
                'Success',
                localStorage.email + ' just logout',
                'success'
            )
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            // window.location.href = 'http://localhost:1234'
            this.page = 'login'
        },
        addTodo() {
            this.page = 'addTodo'
        },
        cancelAddTodo() {
            this.page = 'kanban'
        },
        afterAddTodo() {
            this.page = 'kanban'
            this.socket.emit('SOMETHING_CHANGE')
        },
        showEditTodo(item) {
            this.item = item
            this.page = 'editTodo'
        },
        cancelEditTodo() {
            this.page = 'kanban'
        },
        afterEditTodo() {
            this.page = 'kanban'
            this.socket.emit('SOMETHING_CHANGE')
        },

    }
}
</script>

<style scoped>

</style>