<template>
   <div class="card shadow border rounded-lg" style="width: 25rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <div class="container">
          <input v-model="title" class="form-group form-control" type="text" placeholder="Title">
          <textarea v-model="description" class="mb-2" name="" id="" cols="32" rows="5" placeholder="description"></textarea>
          <input v-model="point" class="form-group form-control" type="number" placeholder="Point">
          <input v-model="assigned_to" class="form-group form-control" type="text" placeholder="Assign To">
          <div class="form-group">
            <label for="">Status</label>
            <select @change="getStatus($event)" v-model="status" class="form-control" name="" id="">
              <option value="backlog">backlog</option>
              <option value="todo">todo</option>
              <option value="doing">doing</option>
              <option value="done">done</option>
            </select>
          </div>
        </div>
        <button @click="sendTask" class="btn btn-dark">Send Data</button>
      </div>
    </div>
</template>

<script>
import db from '../../config/firebase'
export default {
  data(){
    return{
      title : '',
      description : '',
      point : null,
      assigned_to : '',
      status : ''
    }
  },
  methods : {
    getStatus(value){
      console.log(value)
    },
    sendTask(){
      let newTask = {
        title : this.title,
        description : this.description,
        point : this.point,
        assigned_to : this.assigned_to,
        status : this.status
      }
      console.log(newTask)
      db.collection("kanban").add(newTask)
      .then(docRef => {
        console.log("Document written")
        console.log(docRef)
      })
      .catch(err=>{
        console.log("masuk error")
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>