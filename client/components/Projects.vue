<template>
<div>
  <div class="projectPage">
    <div class="cards-list">
      <div  class="card 1" :key="i" v-for="(project, i) in projectsapp">
        <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
        <div class="card_title title-white">
          <p @click="selectedIdProject(`${project.id}`)" style="cursor: pointer;">{{project.title}}</p>
        </div>
        <div class="card_action">
          <i @click="getProjectData(project.id, i)" data-toggle="modal" data-target="#editProject" class="far fa-edit" style="cursor: pointer;"></i> | <i @click="destroyProject(`${project.id}`)" class="fas fa-trash-alt" style="cursor: pointer;"></i>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal -->
  <div class="modal fade" id="editProject" tabindex="-1" role="dialog" aria-labelledby="editProjectTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProjectTitle">Add Project</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <form @submit.prevent="editProject">
        <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Project Title</label>
              <input v-model="titleData" type="text" class="form-control" placeholder="Enter your porject">
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
  name: 'ProjectPage',
  data: function(){
    return {
      projectId: null,
      titleData: null
    }
  },
  props: ['projectsapp'],
  methods: {
    selectedIdProject: function(project_id){
      this.projectId = project_id
      console.log(this.projectId)
      console.log(localStorage.token)
      this.$parent.selectProjectId(this.projectId)
    },
    destroyProject: function(project_id){
      this.$parent.deleteProject(project_id)
    },
    getProjectData: function(project_id, i){
      console.log(i)
      console.log(this.projectsapp[i])
      this.titleData = this.projectsapp[i].title
      this.projectId = this.projectsapp[i].id
      console.log(this.projectId)
    },
    editProject: function(){
      console.log(this.projectId)
      $('#editProject').modal('hide')
      this.$parent.updateProject(this.projectId, this.titleData)
    }
    
  }
}
</script>

<style scoped>

</style>