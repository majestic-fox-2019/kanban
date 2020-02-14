<template>
  <div>
      <div class="card bg-light">
        <div class="card-body">
          <div class="card-title pl-2">
            <h4>{{task.title}}</h4>
          </div>
          <div class="card-info d-flex justify-content-between border-top p-2">
            <div class="action" @click="deletetask(task.id)">
            </div>
            <div class="image">
              {{task.User.name}}
              <img class="border rounded-circle" src="../assets/rocket.svg" alt="">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import instance from '../apis/axios'
import {Swal,Toast} from '../apis/sweetalert'
export default {
  props:['task','islogin'],
  methods:{
    deletetask(id){
      instance
      .delete(`task/${id}`,{
        headers: {'token': this.islogin.token}
      })
      .then(response => {
        console.log(response.data)
        Swal.fire(
          'Success Delete Task',
          'success'
        )
      })
      .catch(err => {
        console.log(err.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        })
      })
    },
  }
}
</script>
<style>

</style>