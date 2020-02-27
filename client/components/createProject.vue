<template>
  <div>
    <a class="nav-link pill-text-size text-primary" style="cursor:pointer" id="v-pills-profile-tab" data-toggle="modal" data-target="#createProject"><i class="fa fa-plus" aria-hidden="true"></i> Create Project</a>
        <!-- Modal -->
    <div class="modal fade" id="createProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
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
                <label for="exampleInputEmail1">Project Name</label>
                <input
                  type="text"
                  placeholder="Put your project name"
                  v-model="form.name"
                  class="form-control"
                />
              </div>
              <p v-if="success !== null"  class="text-success">{{ success }}</p>
              <p v-if="error !== null"  class="text-danger">{{ error }}</p>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name : 'CreateProject',
  props : ['host', 'toaster'],
  data () {
    return {
      form : {
        name : ''
      },
      error : null,
      success : null
    }
  },
  methods : {
    createTask(){
      this.success = null
      const value = {
        project_name : this.form.name
      }

      axios({
        headers : {
          token : localStorage.token
        },
        url : `${this.host}/projects`,
        method : 'POST',
        data : value
      })
      .then(response => {
        this.error = null
        this.success = 'Sucessfully add new project!'
        this.form.name = ''
        this.$parent.addProject(response.data)

        setTimeout(() => {
            this.success = null
        }, 2000);
      })
      .catch(err => {
        this.error = err.response.data.project_name
      })
    }
  }
}
</script>

<style>

</style>