<template>

  <!-- <login @reload-page="readData()"></login>
  <form-add @add-data="postData"></form-add>
  <form-edit :show="showedit" :selectdata="selectedData" @closeform="close" @edit-data="putData"></form-edit> -->
  
  <div class="kanban"> 
    <tasks-list 
    :datatasks="tasksBacklog" :cate="'Backlog'" 
    @move-data="moveData"
    @data-edit="sendedit" 
    @destroy-data="destroyData"
    ></tasks-list>
    <tasks-list 
    :datatasks="tasksTodo" :cate="'Todo'" 
    @move-data="moveData" 
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>
    <tasks-list 
    :datatasks="tasksDone" :cate="'Done'"
    @move-data="moveData"
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>
    <tasks-list 
    :datatasks="tasksComplete" :cate="'Complete'" 
    @move-data="moveData" 
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>

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
    // 'form-edit': edit,
  },
  props: ['addData','datakanban'],
  data(){
    return {
      baseUrl: ``,
      tasksBacklog : [],
      tasksTodo: [],
      tasksDone: [],
      tasksComplete: [],
      showedit: false,
      selectedData:null
    }
  },
  created(){
     
     this.loaddata()
  },

  watch:{
    datakanban : function(){
      this.loaddata()
    }
  },

  
  methods:{
    
    loaddata(){
      let allLoadedData = this.datakanban
      this.tasksBacklog = allLoadedData.backlog 
      this.tasksTodo = allLoadedData.todo  
      this.tasksDone = allLoadedData.done   
      this.tasksComplete = allLoadedData.complete
    },

    destroyData(data){
      this.$emit('toDelete',data)
    },

    moveData(data){
      
      this.$emit('movedata',data)
    },

    sendedit(selectedTask){
      this.SelectedData(selectedTask)
    },

    getEdited(newData){
      this.$parent.editData(newData)
    }
    // readData(){
    //   console.log('from emit')
    //   axios({
    //     method: "GET",
    //     url: this.baseUrl ,
    //     headers: {token : localStorage.token}
    //   })
    //   .then(result=>{
          
    //       let tasksBl= result.data.filter(el => {return el.category == 'backlog'})
    //       let tasksTd= result.data.filter(el => {return el.category == 'todo'})
    //       let tasksDn= result.data.filter(el => {return el.category == 'done'})
    //       let tasksCp= result.data.filter(el => {return el.category == 'complete'})

    //       this.tasksBacklog = tasksBl
    //       this.tasksTodo = tasksTd
    //       this.tasksDone = tasksDn
    //       this.tasksComplete = tasksCp
    //   })
    // },

    // moveData(e){
    //   axios({
    //     method: "PUT",
    //     url :`${this.baseUrl}/${e.id}`,
    //     headers :{token : localStorage.token},
    //     data : {category : e.category }
    //   })
    //   .then(res=>{
    //     this.readData()
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // },

    // postData(title){
    //   axios({
    //     method: "POST",
    //     url :`${this.baseUrl}`,
    //     headers :{token : localStorage.token},
    //     data : {title : title , category: "backlog" }
    //   })
    //   .then(res=>{
    //     this.readData()
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })

    // },

    // putData(data){
    //  axios({
    //     method: "PUT",
    //     url :`${this.baseUrl}/${data.id}`,
    //     headers :{token : localStorage.token},
    //     data : {title : data.title }
    //   })
    //   .then(res=>{
    //     this.readData()
    //     this.close()
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // },

    

    // close(){
    //   this.showedit = !this.showedit
    // },

    // sendedit(data){
    //   this.showedit = !this.showedit
    //   this.selectedData = data

    // }
  }
}

</script>
<style scoped>

</style>