<template>
<div>
    <login @reload-page="readData()"></login>
  <form-add @add-data="postData"></form-add>
  <form-edit :show="showedit" :selectdata="selectedData" @closeform="close" @edit-data="putData"></form-edit>
  <div class="kanban">
    <tasks-list :tasks="tasksBacklog" :cate="'Backlog'" @move-data="moveData" @data-edit="sendedit" @destroy-data="destroyData"></tasks-list>
    <tasks-list :tasks="tasksTodo" :cate="'Todo'" @move-data="moveData" @data-edit="sendedit" @destroy-data="destroyData"></tasks-list>
    <tasks-list :tasks="tasksDone" :cate="'Done'" @move-data="moveData" @data-edit="sendedit" @destroy-data="destroyData"></tasks-list>
    <tasks-list :tasks="tasksComplete" :cate="'Complete'" @move-data="moveData" @data-edit="sendedit" @destroy-data="destroyData"></tasks-list>
  </div>
</div>
</template>

<script> 

  import axios from 'axios'
  import tasks from './tasks'
  import form from './barcontrol'
  import edit from './formedit'
  import login from "./login"

export default {
  components:{
    'tasks-list' : tasks,
    'form-add' : form,
    'form-edit': edit
     login
  },
  props: ['addData'],
  data(){
    return {
      baseUrl: `http://localhost:3000`,
      tasksBacklog : [],
      tasksTodo: [],
      tasksDone: [],
      tasksComplete: [],
      showedit: false,
      selectedData:null
    }
  },
  created(){
      if(localStorage.token){
        this.readData()
      }else{
        console.log('a')
      }
  },

  methods:{
    checklocal(){
    
    }

    readData(){
      console.log('from emit')
      axios({
        method: "GET",
        url: this.baseUrl ,
        headers: {token : localStorage.token}
      })
      .then(result=>{
          
          let tasksBl= result.data.filter(el => {return el.category == 'backlog'})
          let tasksTd= result.data.filter(el => {return el.category == 'todo'})
          let tasksDn= result.data.filter(el => {return el.category == 'done'})
          let tasksCp= result.data.filter(el => {return el.category == 'complete'})

          this.tasksBacklog = tasksBl
          this.tasksTodo = tasksTd
          this.tasksDone = tasksDn
          this.tasksComplete = tasksCp
      })
    },

    moveData(e){
      axios({
        method: "PUT",
        url :`${this.baseUrl}/${e.id}`,
        headers :{token : localStorage.token},
        data : {category : e.category }
      })
      .then(res=>{
        this.readData()
      })
      .catch(err=>{
        console.log(err)
      })
     
    },

    postData(title){
      axios({
        method: "POST",
        url :`${this.baseUrl}`,
        headers :{token : localStorage.token},
        data : {title : title , category: "backlog" }
      })
      .then(res=>{
        this.readData()
      })
      .catch(err=>{
        console.log(err)
      })

    },

    putData(data){
     axios({
        method: "PUT",
        url :`${this.baseUrl}/${data.id}`,
        headers :{token : localStorage.token},
        data : {title : data.title }
      })
      .then(res=>{
        this.readData()
        this.close()
      })
      .catch(err=>{
        console.log(err)
      })
    },

    destroyData(data){
     axios({
        method: "DELETE",
        url :`${this.baseUrl}/${data.id}`,
        headers :{token : localStorage.token},
      })
      .then(res=>{
        this.readData()
      })
    },

    close(){
      this.showedit = !this.showedit
    },

    sendedit(data){
      this.showedit = !this.showedit
      this.selectedData = data

    }
  }
}

</script>
<style scoped>

</style>