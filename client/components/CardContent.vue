<template>
    <div>
      <div :key="i" v-for="(task, i) in tasks" class="item">
        <div class="head">
          <div>
            <p class="text-muted">{{ task.title }}</p>
          </div>
          <div>
            <a v-if="task.CategoryId !== 1" @click.prevent="backStatus(task.id)" href="#" class="badge badge-secondary" style="text-decoration:none">Back</a> 
            <a v-if="task.CategoryId !== 4" @click.prevent="updateStatus(task.id)" href="#" class="badge badge-success" style="text-decoration:none">Next</a> 
            <a href="#" @click.prevent="updateForm(task.id)" class="badge badge-warning">Update</a> 
            <a @click.prevent="deleteData(task.id)" class="badge badge-danger">Delete</a>
          </div>
        </div>
        <div class="content">
          <div v-if="update_form === task.id">
          <Description :host="host" :task="task" :keys="i" :show_form="update_form" :task_id="task.id" />
          </div>
          <div v-if="update_form === null">
            <p>{{ task.description }}</p>
          </div>
          <!-- <form>
            <div class="add-task">
              <p class="text-center">Add Task</p>
              <div class="form-group">
              <input type="text" v-model="form.title" class="form-control" placeholder="Put the title">
              </div>
            </div>
            <div class="add-task">
              <div class="form-group">
                <textarea class="form-control" v-model="form.description" placeholder="Put the description"></textarea>
              </div>
            </div>
          </form> -->
          <form>
          </form>
        </div>
      </div>
    </div>  
</template>
<script>
import axios from 'axios';
import Description from './Description';

export default {
  name : 'CardContent',
  props : ['tasks', 'host', 'keys', 'boardList'],
  components : {
    Description
  },
  data () {
    return {
      taskActice : null,
      update_form : null
    }
  },
  created() {
    this.user_id = localStorage.id
  },
  methods : {
    deleteData(id){
      axios.delete(`${this.host}/tasks/${id}`, {
        headers : {
          token : localStorage.token
        }
      })
      .then(response => {
        // this.tasks = list.filter(task => task.id != id)
        this.removeData(this.keys, id)
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateStatus(id){
      this.removeData(this.keys, id)
        // console.log(this.tasks)
      axios({
        headers : {
          token : localStorage.token
        },
        method : 'patch',
        url : `${this.host}/tasks/${id}`
      })
      .then(response => {
        this.boardList[this.keys + 1].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    backStatus(id){
      this.removeData(this.keys, id)
        // console.log(this.tasks)
      axios({
        headers : {
          token : localStorage.token
        },
        method : 'patch',
        url : `${this.host}/tasks/back/${id}`
      })
      .then(response => {
        this.boardList[this.keys - 1].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    removeData(keys, id){
      this.$parent.$parent.removeElement(keys, id)
    },
    updateForm(id){
      this.update_form = id
    },
    updateData(task, index){
      this.tasks[index] = task
    }
  }
}
</script>

<style>
  a {
    text-decoration : none;
  }
</style>