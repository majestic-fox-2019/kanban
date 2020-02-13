
const server = 'http://localhost:3000'
new Vue({
  el: '#boardKanbanApp',
  data: {
    tasks: [],
    categorys: [
      { name: 'backlog', img: '/asset/img/book-open.svg' },
      { name: 'todo', img: '/asset/img/crosshair.svg' },
      { name: 'completed', img: '/asset/img/activity.svg' },
      { name: 'done', img: '/asset/img/hexagon.svg' }
    ],
    isLogin: false,
    loginForm: true,
    registerForm: false,
    login: {
      email: null,
      password: null
    },
    register: {
      name: null,
      email: null,
      password: null
    },
    createTask: {
      title: null,
      description: null,
      category: null
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true
      this.showAllTask()
    } else {
      this.isLogin = false
    }
  },
  methods: {
    showAllTask() {
      axios({
        method: 'get',
        url: `${server}/task`,
        headers: {
          token: localStorage.token
        }
      })
        .then(resultAllTask => {
          this.tasks = resultAllTask.data
          console.log(resultAllTask.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    loginUser() {
      axios({
        method: 'post',
        url: `${server}/user/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data
          this.isLogin = true
        })
        .catch(err => {
          console.log(err)
        })
    },

    toRegister() {
      this.loginForm = false
      this.registerForm = true
    },
    toLogin() {
      this.loginForm = true
      this.registerForm = false
    },

    registerUser() {
      axios({
        method: 'post',
        url: `${server}/user/register`,
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token
          this.isLogin = true
        })
        .catch(err => {
          console.log(err)
        })
    },

    logoutUser: function () {
      localStorage.clear()
      this.isLogin = false
    },

    createKanband() {
      axios({
        method: 'post',
        url: `${server}/task`,
        data: {
          title: this.createTask.title,
          description: this.createTask.description,
          category: this.createTask.category
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // this.task.push(data)
          this.showAllTask()
          console.log(data)
          this.createTask.title = null
          this.createTask.description = null
          this.createTask.category = null

        })
        .catch(err => {
          console.log(err)
        })
    },



  }
})

//----------- END VUE ----------------//


