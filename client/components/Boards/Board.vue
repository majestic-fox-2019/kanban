<template>
  <main>
    <div class="container main">
      <div class="boards">
        <category-board 
          :name="'Backlog'" 
          :datalist="listBacklog"
          :add_task_active="addTaskBacklog"
          :form_add="formAddBacklog"
          :email="data_email"
          @addTask="goToAddTask"
          @doAddTask="goDoAddTask"
          @cancelAddTask="goCancelAddTask"
        ></category-board>
        <category-board 
          :name="'Todo'" 
          :datalist="listTodo"
          :add_task_active="addTaskTodo"
          :form_add="formAddTodo"
          :email="data_email"
          @addTask="goToAddTask"
          @doAddTask="goDoAddTask"
          @cancelAddTask="goCancelAddTask"
        ></category-board>
        <category-board 
          :name="'Done'" 
          :datalist="listDone"
          :add_task_active="addTaskDone"
          :form_add="formAddDone"
          :email="data_email"
          @addTask="goToAddTask"
          @doAddTask="goDoAddTask"
          @cancelAddTask="goCancelAddTask"
        ></category-board>
        <category-board 
          :name="'Completed'" 
          :datalist="listCompleted"
          :add_task_active="addTaskCompleted"
          :form_add="formAddCompleted"
          :email="data_email"
          @addTask="goToAddTask"
          @doAddTask="goDoAddTask"
          @cancelAddTask="goCancelAddTask"
        ></category-board>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { url } from '../../mixins/mixins'
import CategoryBoard from './CategoryBoard'

export default {
  props: ['dataTask', 'data_email'],
  components:{
    'category-board' : CategoryBoard
  },
  mixins:[url],
  data(){
    return {
      addTaskBacklog: false,
      addTaskTodo: false,
      addTaskDone: false,
      addTaskCompleted: false,
      formAddBacklog: {
        task: null
      },
      formAddTodo: {
        task: null
      },
      formAddDone: {
        task: null
      },
      formAddCompleted: {
        task: null
      }
    }
  },
  computed: {
    listBacklog:function(){
      return this.dataTask.filter(el => { return el.category === 'backlog' })
    },
    listTodo:function(){
      return this.dataTask.filter(el => { return el.category === 'todo' })
    },
    listDone:function(){
      return this.dataTask.filter(el => { return el.category === 'done' })
    },
    listCompleted:function(){
      return this.dataTask.filter(el => { return el.category === 'completed' })
    }
  },
  methods: {
    goToAddTask(name){
      switch(name){
        case 'Backlog':
          this.addTaskBacklog = true
          break
        case 'Todo':
          this.addTaskTodo = true
          break
        case 'Done':
          this.addTaskDone = true
          break
        case 'Completed':
          this.addTaskCompleted = true
          break
      }
    },
    goDoAddTask(name){
      switch(name){
        case 'Backlog':
          this.doAddTaskBacklog()
          break
        case 'Todo':
          this.doAddTaskTodo()
          break
        case 'Done':
          this.doAddTaskDone()
          break
        case 'Completed':
          this.doAddTaskCompleted()
          break
      }
    },
    goCancelAddTask(name){
      switch(name){
        case 'Backlog':
          this.cancelAddTask(name)
          break
        case 'Todo':
          this.cancelAddTask(name)
          break
        case 'Done': 
          this.cancelAddTask(name)
          break
        case 'Completed': 
          this.cancelAddTask(name)
          break
      }
    },
    cancelAddTask(name){
      switch(name){
        case 'Backlog':
          this.addTaskBacklog = false
          break
        case 'Todo':
          this.addTaskTodo = false
          break
        case 'Done':
          this.addTaskDone = false
          break
        case 'Completed':
          this.addTaskCompleted = false
          break
      }
    },
    doAddTaskBacklog(){
      let self = this
      let token = localStorage.getItem('token')
      if(self.formAddBacklog.task === null){
        self.notif('error', 'Task must be filled')
      }else{
        let dataAddTaskBacklog = {
          title: self.formAddBacklog.task,
          category: 'backlog'
        }
        axios.post(`${this.url}/task`, dataAddTaskBacklog,
        {
          headers: { Bearer : token }
        })
        .then(res => {
          self.dataTask.concat(res.data.payload)
          self.notif('success', 'Task added in Backlog')
          self.addTaskBacklog = false
          self.clearForm(self.formAddBacklog)
          self.$parent.getTaskList()
        })
        .catch(err => {
          self.notif('error', 'Add task failed!')
        })
      }
    },
    doAddTaskTodo(){
      let self = this
      let token = localStorage.getItem('token')
      if(self.formAddTodo.task === null){
        self.notif('error', 'Task must be filled')
      }else{
        let dataAddTaskTodo = {
          title: self.formAddTodo.task,
          category: 'todo'
        }
        axios.post(`${this.url}/task`, dataAddTaskTodo,
        {
          headers: { Bearer : token }
        })
        .then(res => {
          self.dataTask.concat(res.data.payload)
          self.notif('success', 'Task added in Todo')
          self.addTaskTodo = false
          self.clearForm(self.formAddTodo)
          self.$parent.getTaskList()
        })
        .catch(err => {
          self.notif('error', 'Add task failed!')
        })
      }
    },
    doAddTaskDone(){
      let self = this
      let token = localStorage.getItem('token')
      if(self.formAddDone.task === null){
        self.notif('error', 'Task must be filled')
      }else{
        let dataAddTaskDone = {
          title: self.formAddDone.task,
          category: 'done'
        }
        axios.post(`${this.url}/task`, dataAddTaskDone,
        {
          headers: { Bearer : token }
        })
        .then(res => {
          self.dataTask.concat(res.data.payload)
          self.notif('success', 'Task added in Done')
          self.addTaskDone = false
          self.clearForm(self.formAddDone)
          self.$parent.getTaskList()
        })
        .catch(err => {
          self.notif('error', 'Add task failed!')
        })
      }
    },
    doAddTaskCompleted(){
      let self = this
      let token = localStorage.getItem('token')
      if(self.formAddCompleted.task === null){
        self.notif('error', 'Task must be filled')
      }else{
        let dataAddTaskCompleted = {
          title: self.formAddCompleted.task,
          category: 'completed'
        }
        axios.post(`${this.url}/task`, dataAddTaskCompleted,
        {
          headers: { Bearer : token }
        })
        .then(res => {
          self.dataTask.concat(res.data.payload)
          self.notif('success', 'Task added in Completed')
          self.addTaskCompleted = false
          self.clearForm(self.formAddCompleted)
          self.$parent.getTaskList()
        })
        .catch(err => {
          self.notif('error', 'Add task failed!')
        })
      }
    },
    doUpdateTask(id, item){
      let self = this
      let token = localStorage.getItem('token')
      let dataUpdate = item
      axios.put(`${self.url}/task/${id}`, dataUpdate,
      {
        headers : { Bearer : token }
      })
      .then(res => {
        self.notif('success', 'Edit task sucessfull')
        self.$parent.getTaskList()
      })
      .catch(err => {
        self.notif('error', 'Edit task failed!')
      })
    },
    doMoveTask(item, category){
      let self = this
      let token = localStorage.getItem('token')
      let dataUpdate = {
        title: item.title,
        category: category
      }
      axios.put(`${this.url}/task/${item.id}`, dataUpdate,
      {
        headers : { Bearer : token }
      })
      .then(res => {
        self.notif('success', 'Move task sucessfull')
        self.$parent.getTaskList()
      })
      .catch(err => {
        self.notif('error', 'Move task failed!')
      })
    },
    deleteTask(id){
      let self = this
      let token = localStorage.getItem('token')
      this.$swal({
        icon: "warning",
        title: "Do you want delete this task ?",
        closeOnClickOutside: false,
        dangerMode: true,
        buttons: true,
      })
      .then(confirm => {
        if(confirm){
          axios.delete(`${self.url}/task/${id}`,
          {
            headers: { Bearer : token }
          })
          .then(res => {
            self.notif('success', 'Task has been deleted')
            self.$parent.getTaskList()
          })
          .catch(err => {
            self.notif('success', 'Delete task failed')
          })
        }
      })
    },
    clearForm(form){
      for(let key in form){
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
}
</script>