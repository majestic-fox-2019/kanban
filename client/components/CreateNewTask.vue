<template>
    <div class="modal fade" id="createTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-plus"></i> Create Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createTask">
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  placeholder="Put your task title"
                  v-model="form.title"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea class="form-control" v-model="form.description" placeholder="Put the description"></textarea>
              </div>
              <!-- <p v-if="success !== null"  class="text-success">{{ success }}</p>
              <p v-if="error !== null"  class="text-danger">{{ error }}</p> -->
              <button type="submit" class="btn full-width-btn btn-primary">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  props : ['host', 'boardList'],
  data(){
    return {
      form : {
        title : '',
        description : ''
      },
      projectId : null
    }
  },
  mounted() {
    if(localStorage.ProjectId){
      this.projectId = localStorage.ProjectId
    }else{
      this.projectId = null
    }
  },
  methods : {
    createTask(){
      const value ={
        title: this.form.title,
        description: this.form.description,
        CategoryId: 1,
      }

      axios({
        headers : {
          token : localStorage.token
        },
        url : `${this.host}/tasks/${this.projectId}`,
        method : 'POST',
        data : value  
        })
      .then(response => {
        this.boardList[0].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err)
      })

    }
    
  }
}
</script>
<style>

</style>