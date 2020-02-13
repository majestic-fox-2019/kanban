<template>
<div>
  <div >
        <div class="cards mt-3" v-if="task.User">
          <div class="card text-center card text-white bg-dark " style="width: 15rem;">
            <div class="card-body" >
              <h5 class="card-title">{{task.title}}</h5>
              <p class="card-text"><i class="far fa-user"></i> {{task.User.name}}</p>
              <p class="card-text"><i class="far fa-calendar-alt"></i> {{formatDate(task.date)}}</p>
              <p class="card-text">{{task.status}}</p>
              <div class="d-flex justify-content-between">
                <a class="list-group-item" href="#" @click = "moveBack(task.id)"><i class="fas fa-arrow-circle-left"></i></a>
                <a class="list-group-item" href="#" @click = "deleteTask(task.id)"><i class="far fa-trash-alt" aria-hidden="true"></i></a>     
                <a class="list-group-item" href="#" @click = "moveNext(task.id)"><i class="fas fa-arrow-circle-right"></i></a> 
              </div>
            </div>
          </div>
        </div>

</div>
  
</template>

<script>
import axios from "axios"
export default {
  props: ["task", "categoryTask", "thatUser"],
  created(){
  },
  data() {
    return{
      isiTask: [],
      userName:''
    }
  },
  methods: {
    formatDate(date){
      return new Date(date).toDateString()
    },
    deleteTask(id) {
      axios({
        url: `http://localhost:3000/tasks/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(data => {
        this.$emit("getData")
        console.log(data)
      })
      .catch(err => {
        console.log(err.response.data.msg)
         let errors = `<p style="color:red;">${err.response.data.msg}</p>`
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errors
        })
      })
    },

    moveNext(id) {
      console.log("masuuuuk")
      axios({
        url: `http://localhost:3000/tasks/next/${id}`,
        method:"PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(data => {
        this.$emit("getData")
        console.log(data)
    
      })
      .catch(err => {
        console.log(err.response.data)
        let errors = `<p style="color:red;">${err.response.data.msg}</p>`
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errors
        })
      })
    },

    moveBack(id) {
      console.log("masuuuuk bACK")
      axios({
        url: `http://localhost:3000/tasks/back/${id}`,
        method:"PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(data => {
        this.$emit("getData")
        console.log(data)
       
      })
      .catch(err => {
        console.log(err.response)
         let errors = `<p style="color:red;">${err.response.data.msg}</p>`
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: errors
        })
      })
    }
  },
  mounted(){

  }
}
</script>

<style>

</style>