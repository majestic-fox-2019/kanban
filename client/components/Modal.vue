<template>
  <div>
    <div class="viewModal">
        <div class="border" style="background-color: rgba(37, 29, 29, 0.267);z-index: 10;position: fixed;top:0;left:0;width: 100%;height:100%;">
          <div style="margin:auto;width: 50vw;height:50vh;margin-top:25vh;opacity:1.0;" class="bg-light p-4">
            <div class="d-flex justify-content-between">
              <h2>Add Task</h2>
              <button class="btn btn-danger" @click="closemodal">Close</button>
            </div>
            <hr>
            <div>
              <form @submit.prevent="add">
                <div class="form-group">
                  <label for="exampleInputEmail1">Title</label>
                  <input type="text" class="form-control" v-model="title">
                </div>
                <button type="submit" class="btn btn-success">Add</button>
              </form>
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
  props:['islogin','modal'],
  data(){
    return {
      title:''
    }
  },
  methods: {
    closemodal(){
      this.modal.showModal = false
    },
    add(){
      instance
        ({
          method:"POST",
          url:"task",
          headers: {'token': this.islogin.token},
          data:{
            CategoryId: this.modal.CategoryId,
            title:this.title
          }
        })
        .then(response => {
          console.log(response.data)
          this.modal.CategoryId = null
          this.title = null
          this.modal.showModal = false
          Swal.fire(
            'Success Add Task',
            'success'
          )
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(err.response.data),
          })
        })
    },
  },
}
</script>

<style>

</style>