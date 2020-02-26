<template>
<div>
    <registerlogin
        v-if="page=='login'"
        @afterRegisterLogin="afterRegisterLogin"
    ></registerlogin>
    <navbar
        v-if="page=='kanban' || page=='addTask' || page=='editTask' || page=='viewTask'"
        @logout="logout"
        :email="dataUser.email"
        @addTask="addTask"
        @kanban="kanban"
    ></navbar>
    <addtask
        v-if="page=='addTask'"
        @cancelAddTask="cancelAddTask"
        @afterAddTask="afterAddTask"
    ></addtask>
    <tasklist
        v-if="page=='kanban'"
        @showEditTask="showEditTask"
    ></tasklist>
    <edittask
        v-if="page=='editTask'"
        :item="item"
        @cancelEditTask="cancelEditTask"
        @afterEditTask="afterEditTask"
    ></edittask>
</div>
</template>

<script>
import io from 'socket.io-client'
import Swal from 'sweetalert2'

import registerlogin from './components/RegisterLogin.vue'
import navbar from './components/NavBar.vue'
import addtask from './components/AddTask.vue'
import tasklist from './components/TaskList.vue'
import edittask from './components/EditTask.vue'

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://kanban-km.herokuapp.com'

export default {
    name: 'app',
    components: {
        registerlogin,
        navbar,
        addtask,
        tasklist,
        edittask,
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
            this.page = 'login'
        },
        addTask() {
            this.page = 'addTask'
        },
        cancelAddTask() {
            this.page = 'kanban'
        },
        afterAddTask() {
            this.page = 'kanban'
            this.socket.emit('SOMETHING_CHANGE')
        },
        showEditTask(item) {
            this.item = item
            this.page = 'editTask'
        },
        cancelEditTask() {
            this.page = 'kanban'
        },
        afterEditTask() {
            this.page = 'kanban'
            this.socket.emit('SOMETHING_CHANGE')
        },

    }
}
</script>

<style scoped>

</style>