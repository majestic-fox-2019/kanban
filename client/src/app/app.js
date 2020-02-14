var base_url = 'http://localhost:3000'

var vue = new Vue({
  el: "#app",
  data: {
    tabLogin: 0,
    loginPage: true,
    mainPage: false,
    addTaskBacklog: false,
    addTaskTodo: false,
    taskListBacklog: [],
    taskListTodo: [],
    formLogin: {
      email: null,
      password: null
    },
    formRegister: {
      name: null,
      email: null,
      password: null
    },
    formAddBacklog: {
      task: null
    },
    formAddTodo: {
      task: null
    }
  },
  created(){
    this.checkLocalStorage()
  },
  filters: {
    dateFormat: function (date) {
      return moment(date).format('DD MMMM YYYY');
    }
  },
  methods: {
    checkLocalStorage(){
      if(!localStorage.getItem('token')){
        this.loginPage = true
        this.mainPage = false
      }else{
        this.loginPage = false
        this.getTaskList()
        this.mainPage = true
      }
    },
    goToAddTaskBacklog(){
      this.addTaskBacklog = true
      this.scrollToEnd()
    },
    goToAddTaskTodo(){
      this.addTaskTodo = true
      this.scrollToEnd()
    },
    cancelAddTaskBacklog(){
      this.addTaskBacklog = false
    },
    cancelAddTaskTodo(){
      this.addTaskTodo = false
    },
    scrollToEnd: function() {    	
      let container = this.$el.querySelector("#card-board-content");
      container.scrollTop = container.scrollHeight;
    },
    doLogin(){
      let self = this
      if(self.formLogin.email === null || self.formLogin.password === null){
        this.notif('error', 'Email or password must be filled')
      }else{
        let dataLogin = {
          email: self.formLogin.email,
          password: self.formLogin.password
        }
        axios.post(`${base_url}/login`, dataLogin)
        .then(res => {
          if(res.data.code === 200){
            localStorage.setItem('token', res.data.payload.Token)
            this.notif('success', 'Login successfull')
            self.loginPage = false
            self.mainPage = true
            this.clearForm(this.formLogin)
            this.checkLocalStorage()
          }else{
            localStorage.removeItem('token')
            this.notif('error', 'Login failed!')
          }
        })
        .catch(err => {
          console.log(err.response)
          this.notif('error', 'Email or Password wrong!')
        })
      }
    },
    doRegister(){
      let self = this
      if(self.formRegister.name === null || self.formRegister.email === null || self.formRegister.password === null){
        this.notif('error', 'Name or email or password must be filled')
      }else{
        let dataRegister = {
          name: self.formRegister.name,
          email: self.formRegister.email,
          password: self.formRegister.password
        }
        axios.post(`${base_url}/register`, dataRegister)
        .then(res => {
          this.notif('success', 'Register successfull')
        })
        .catch(err => {
          this.notif('error', 'Register failed')
        })
      }
    },
    getTaskList(){
      let self = this
      let token = localStorage.getItem('token')
      axios.get(`${base_url}/tasks`, 
      {
        headers: { Bearer: token }
      })
      .then(res => {
        let dataBacklog = res.data.payload.filter(el => { return el.category === 'backlog' })
        let dataTodo = res.data.payload.filter(el => { return el.category === 'todo' })
        self.taskListBacklog = dataBacklog
        self.taskListTodo = dataTodo
      })
      .catch(err => {
        console.log(err)
      })
    },
    doAddTaskBacklog(){
      let self = this
      let token = localStorage.token
      if(self.formAddBacklog.task === null){
        this.notif('error', 'Task must be filled')
      }else{
        let dataAddTaskBacklog = {
          title: self.formAddBacklog.task
        }
        axios.post(`${base_url}/task`, dataAddTaskBacklog,
        {
          headers: { Bearer : token }
        })
        .then(res => {

        })
        .catch(err => {

        })
      }
    },
    doAddTaskTodo(){

    },
    doLogout(){
      localStorage.clear()
      this.mainPage = false
      this.loginPage = true
      this.notif('success', 'Log Out')
    },
    clearForm(form){
      for(key in form){
        form[key] = null
      }
    },
    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    }
  }
})