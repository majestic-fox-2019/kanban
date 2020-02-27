<template>
    <div>
      <div :key="i" v-for="(task, i) in tasks" class="item">
        <TaskContent :task="task" :i="i" :host="host" :update_form="update_form" taskActive="taskActive" />
      </div>
    </div>  
</template>
<script>
import axios from 'axios';
import TaskContent from './TaskContent';

export default {
  name : 'CardContent',
  props : ['tasks', 'host', 'keys', 'boardList'],
  components : {
    TaskContent
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