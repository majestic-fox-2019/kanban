<template>
<div>
  <div class="navbar-projects">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">KANBAN</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a data-toggle="modal" data-target="#addProject" style="cursor: pointer;" class="nav-link">Add Project</a>
            </li>
          </ul>   
          <form class="form-inline my-2 my-lg-0">
            <button @click="logout" class="btn btn-outline-success my-2 my-sm-0" type="button">Sign Out</button>
          </form>
        </div>
      </nav>
    </div>

    <!-- Modal -->
  <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="addProjectTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProjectTitle">Add Project</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <form @submit.prevent="createProject">
        <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Project Title</label>
              <input v-model="title" type="text" class="form-control" placeholder="Enter your project">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
          </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NavbarProject',
  data: function(){
    return {
      title: null
    }
  },
  methods: {
    createProject: function(data){
      $('#addProject').modal('hide')
      this.$parent.addProject(this.title) 
      this.title = ''
    },
    logout: function(){
      console.log('masuk')
      this.$parent.logout()
    }
  }
}
</script>