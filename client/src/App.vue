<template >
<div>
  <login 
  v-if="logoutstatus"
  @data-login="checklogin" :loginstatus="loginstatus" 
  @data-register="postregister" :registerstatus="registerstatus" 
  :local="local"
  ></login>
  <navbar @logout="logoutStatus"></navbar>
  <barcontrol @add-data="addData"></barcontrol>

  <kanban  
  :datakanban="datakanban" 
  @movedata="movedata"
  @toDelete="destroyData"

  
  ></kanban>

</div>
</template>

<script>

 import navbar from "./navbar"
 import barcontrol from "./barcontrol"
 import edit from "./formedit"
 import kanban from "./kanban"
 import login from "./login"
 import axios from "axios"
 
 

  export default {

    components: {
      login,
      navbar,
      barcontrol,
      kanban,
      edit
    },

    data(){
      return {
          baseUrl: `https://secure-sea-05063.herokuapp.com`,
          loginstatus: false,
          registerstatus : false,
          logoutstatus : true,
          datakanban : {},
          local : false,
          selectedTask: "",
        
      }
    },

    created(){
       
        this.readData()
      
    },

   

    methods:{
      checklogin(datalogin){
        let data = {
          email : datalogin.email,
          password : datalogin.password
        }
          console.log(data)
        axios({
          method : "POST",
          url : `${this.baseUrl}/login`,
          data : data
        })
        .then(result=>{
          this.loginstatus = true
          this.logoutstatus = false
          localStorage.setItem("token", result.data.token)

          let timerInterval
           Swal.fire({
             title: 'Succes Login',
             html: 'wait..',
             timer: 1000,
             timerProgressBar: true,
             onBeforeOpen: () => {
               Swal.showLoading()
               timerInterval = setInterval(() => {
                 const content = Swal.getContent()
                 if (content) {
                   const b = content.querySelector('b')
                   if (b) {
                     b.textContent = Swal.getTimerLeft()
                   }
                   }
               }, 100)
              },
               onClose: () => {
                 clearInterval(timerInterval)
                 }
               }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                   
                  }
              })
        })
        .catch(err=>{
          console.log(err)
        })
      },

      postregister(dataregister){
        let data ={
          name : dataregister.name,
          email : dataregister.email,
          password : dataregister.password
        }
        
        axios({
          method: 'POST',
          url : `${this.baseUrl}/register`,
          data : data
        })
        .then(res=>{
          this.registerstatus = true
          Swal.fire(
             'Succes Register!',
             'go to login!',
             'success'
            )
        })

      },

      logoutStatus(status){
        this.logoutstatus = true
        this.loginstatus = false
      },

      readData(){
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

       
          let objData = {
            backlog : tasksBl,
            todo : tasksTd,
            done : tasksDn,
            complete : tasksCp
          }

     
           

          this.datakanban = objData
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

      movedata(e){
      
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

      addData(newdata){
        axios({
          method: "POST",
          url :`${this.baseUrl}`,
          headers :{token : localStorage.token},
          data : {title : newdata , category: "backlog" }
        })
        .then(res=>{
          this.readData()
        })
        .catch(err=>{
          console.log(err)
        })
      },

      editData(newData){
         axios({
          method: "PUT",
          url :`${this.baseUrl}/${newData.id}`,
          headers :{token : localStorage.token},
          data : {title : newData.title }
        })
        .then(res=>{
          this.readData()
        })
        .catch(err=>{
          console.log(err)
        })
      }
    // selected(selectedtask){
    //   console.log(selectedtask)
    //   this.selectedTask = selectedtask
     
    // }

    }
   }

  //  checkLogin(){
  //     let data = {
  //       email : this.email,
  //       password : this.password
  //     }
  //     axios.post(`${this.baseUrl}/login`,data)
  //     .then(result=>{
  //       this.$emit('reload-page')
  //       this.pagelogin = false
  //       this.register = false
  //       localStorage.setItem("token", result.data.token)
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   },


</script>



<style scoped>

</style>

 