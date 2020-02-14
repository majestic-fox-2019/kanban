<template>
  <div>
    <!-- NAVBAR -->
    <navbar
      v-if="!loginRegisterPage"
      @addTodo="showAddTodoModal"
      @logout="logout"
      style="margin-bottom:0;"
    >
    </navbar>

    <!-- PAGE -->
    <div
      class="ui main text container mainPage"
      style="min-width: -webkit-fill-available; padding:0;"
    >
      <!-- todo details -->
      <cardDetail
        @deleteSuccess="deleteSuccess"
        @hideEditPage="hideEditPage"
        v-if="todoDetailPage"
        :todoDetail="todoDetailData"
      ></cardDetail>
      <!-- Login REgister -->
      <loginRegister
        @loginSuccess="showCardPages"
        v-show="loginRegisterPage"
      ></loginRegister>
      <!-- Task Item -->
      <taskItem
        @showTodoDetails="showTodoDetails"
        v-show="cardPage"
        :progressCards="progressCards"
      ></taskItem>
    </div>

    <!-- MODAL -->
    <b-modal id="add-todo">
      <template v-slot:modal-header="{}">
        <h5>Add Todo</h5>
      </template>

      <template v-slot:default="{}">
        <b-form-group label="Title:">
          <b-form-input
            v-model="form.title"
            type="text"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Hint:">
          <b-form-input
            v-model="form.hint"
            type="text"
            required
            placeholder="Enter hint"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-input
            v-model="form.description"
            type="text"
            required
            placeholder="Enter description"
          ></b-form-input>
        </b-form-group>
      </template>

      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="createTodo">
          Add Kanban
        </b-button>
      </template>
    </b-modal>
    <!-- -------- -->
  </div>
</template>

<script>
import cardDetail from './components/todoDetails'
import navbar from './components/navbar.vue'
import loginRegister from './components/registerLogin'
import taskItem from './components/taskItem'
import firebase from 'firebase'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    navbar,
    loginRegister,
    taskItem,
    cardDetail
  },
  data() {
    return {
      open: false,
      loginRegisterPage: false,
      cardPage: true,
      addTodoPage: false,
      user: null,
      todoDetailPage: false,
      todoDetailData: null,
      form: {
        title: '',
        description: '',
        hint: ''
      },
      progressCards: [
        {
          title: 'Back-Log',
          status: 'backlog',
          color: 'info',
          items: []
        },
        {
          title: 'To Do',
          status: 'todo',
          color: 'success',
          items: []
        },
        {
          title: 'In Progress',
          status: 'inprogress',
          color: 'warning',
          items: []
        },
        {
          title: 'Completed',
          status: 'completed',
          color: 'danger',
          items: []
        }
      ]
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    showCardPages() {
      this.loginRegisterPage = false
      this.cardPage = true
      // this.addTodoPage = false
    },
    showTodoDetails(data) {
      this.todoDetailData = data
      this.todoDetailPage = true
      // console.log('dapet ga nih datanya', data, 'ini datanya')
    },
    hideEditPage() {
      this.todoDetailPage = false
    },
    deleteSuccess() {
      this.getAllTodo()
      this.hideEditPage()
    },
    showLoginRegisterPage() {
      this.loginRegisterPage = true
      this.cardPage = false
      this.todoDetailPage = false
      // this.addTodoPage = false
    },
    logout() {
      console.log('udah kepencet')
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.showLoginRegisterPage()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    showAddTodoModal() {
      this.$bvModal.show('add-todo')
    },
    createTodo() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/todos',
        data: {
          title: this.form.title,
          content: this.form.description,
          creator: this.user.displayName,
          creatorImg: this.user.photoURL
        }
      })
        .then(({ data }) => {
          this.getAllTodo()
          this.$bvModal.hide('add-todo')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllTodo() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos'
      })
        .then(({ data }) => {
          this.progressCards[0].items = []
          this.progressCards[1].items = []
          this.progressCards[2].items = []
          this.progressCards[3].items = []
          data.forEach(element => {
            // console.log(element)

            switch (element.status) {
              case 'backlog':
                this.progressCards[0].items.push(element)
                break

              case 'todo':
                this.progressCards[1].items.push(element)
                break

              case 'inprogress':
                this.progressCards[2].items.push(element)
                break

              case 'completed':
                this.progressCards[3].items.push(element)
                break

              default:
                console.log(element)
                break
            }
          })
          // console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeStatus(status) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/todos/${this.todoDetailData.id}/status`,
        data: {
          status: status
        }
      })
        .then(result => {
          this.$socket.emit('updateStatus')
          // this.getAllTodo()
        })
        .catch(err => {})
    }
  },
  created() {
    // var user = firebase.auth().currentUser
    // var user = null
    console.log('masuk ke created')
    firebase.auth().onAuthStateChanged(userLogin => {
      console.log('jalanin login')
      if (userLogin) {
        console.log('ada user login', userLogin, 'dia lagi login')
        this.user = userLogin
        this.getAllTodo()
        this.showCardPages()
        // console.log(this.progressCards)
      } else {
        this.showLoginRegisterPage()
        console.log('gaada yang login')
      }
    })
  },
  mounted() {
    this.$socket.on('statusUpdated', () => {
      this.getAllTodo()
    })
  }
}
</script>

<style>
.tinggi {
  min-height: 100%;
}
.modalNya {
}
</style>
