<template>
  <div>
      <div class="container">
        <div class="categories d-flex" >
          <div class="category border rounded" v-for="(category,i) in categories" :key="i">  
            <div class="board text-dark bg-white  p-2">
              <div class="card-title text-center">
                <div class="deletecategory" @click="deletecategory(category.id)">
                </div>
                <button class="add btn btn-primary" @click="showmodal(category.id)">+Task</button>     
                <h3>{{category.name}}</h3>
              </div>
              <div class="card-body">     
                <draggable  :list="category.Tasks" :options='{group: {name:"categories"}}'  @end="drop">      
                  <transition-group tag="div" v-bind:id="category.id"> 
                    <div class="item" v-for="task in category.Tasks" :key="task.id" v-bind:id="task.id">
                      <Card :islogin="islogin" :task="task"></Card>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </div>
          </div>
          <div class="category border rounded">
              <div class="board text-dark bg-white  p-2">
                <div class="card-title text-center">
                  <h3>New Category</h3>
                </div>
                <div class="card-body">     
                  <form @submit.prevent="addcategory">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Category" v-model="formcategory">
                        <small class="form-text text-muted">Don't too long...</small>
                      </div>
                      <div class="text-right">
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import instance from '../apis/axios'
import {Swal,Toast} from '../apis/sweetalert'
import Card from "./Card"
export default {
  components: {
    draggable,
    Card
  },
  props:['islogin','modal'],
  data(){
    return {
      categories:[],
      formcategory:''
    }
  },
  mounted(){
    this.load()
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    task(val) {
      this.load()
    }
  },
  methods:{
    showmodal(id){
      this.modal.CategoryId = id
      this.modal.showModal = true
    },
    load(){
      instance
      .get('task',{
        headers: {'token': this.islogin.token}
      })
      .then(response => {
        console.log(response.data)
        this.categories = response.data
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    
    
    drop(evt){
      var taskId = evt.item.id
      var categoryId = evt.to.id
      instance  
        ({
            method:"patch",
            url:`task/${taskId}`,
            data:{
              category : categoryId
            },
            headers: {'token': this.islogin.token}
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    },
    addcategory(){
      instance
      ({
        method:"POST",
        url:"category",
        headers: {'token': this.islogin.token},
        data:{
          categoryname: this.formcategory
        }
      })
      .then(response => {
        Swal.fire(
          'Success Add Category',
          'success'
        )
        this.formcategory = null
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
    deletecategory(id){
      instance
      .delete(`category/${id}`,{
        headers: {'token': this.islogin.token}
      })
      .then(response => {
        console.log(response.data)
        Swal.fire(
          'Success Delete Category',
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
  },
  
}
</script>
<style>

</style>