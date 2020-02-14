<template>
  <div>
    <form @submit.prevent="updateTask(task_id)">
    <div class="add-task">
      <div class="form-group">
        <input type="text" v-model="form.title" class="form-control" placeholder="Put the title">
      </div>
    </div>
    <div class="add-task">
      <div class="form-group">
        <textarea style="font-size : 14px;" class="form-control" 
        v-model="form.description" 
        placeholder="Put the description"></textarea>
      </div>
    </div>
    <div class="btn-place">
      <button class="btn-sm btn-success btn"> Update Task  </button>&nbsp;
      <button @click.prevent="updateForm(null)" class="btn-sm btn-secondary btn"> Close </button>
    </div>
    </form>
  </div>  
</template>
<script>
import axios from 'axios';
export default {
  name :'Description',
  props : ['task', 'task_id', 'show_form', 'host', 'keys'],
  data(){
    return {
      form : {
        title : '',
        description : ''
      }
    }
  },
  mounted(){
    this.form.description = this.task.description
    this.form.title = this.task.title
  },
  methods : {
    updateForm(params){
      this.$parent.updateForm(params)
    },
    updateTask(id){
      const value = {
        title : this.form.title,
        description : this.form.description
      }
      axios({
        headers : {
          token : localStorage.token
        },
        method: "put",
        url : `${this.host}/tasks/${id}`,
        data : value
      })
      .then(response => {
        this.$parent.updateData(response.data, this.keys)
        this.$parent.updateForm(null)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  .add-task {
    width: 96%;
    margin: 0 auto;
  }
  .btn-place {
    display: flex;
    justify-content: flex-end;
    width: 96%;
    margin: 0 auto;
  }
  .btn-place button {
    position: relative;
    top : -10px;
  }
</style>