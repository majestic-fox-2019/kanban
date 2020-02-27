<template>
  <div class="col-md-10 mx-auto">
    <br>
    <h2 class="pb-4"><i class="fa fa-table" aria-hidden="true"></i> Kanban Project</h2>
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills pill-width" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link active pill-text-size" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa fa-folder-o" aria-hidden="true"></i> Project List</a>
          <CreateProject 
          :host="host"
          :toaster="toaster" />
        </div>
      </div>
      <div class="col-9">
        <p class="tab-title text-muted"><b>List</b></p>
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <ProjectCard 
            :project_list="project_list"
            @deleteproject="deleteProject"
            @boardrender="boardRender"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ProjectCard from './ProjectCard';
import CreateProject from './createProject'

export default {
  name : 'ProjectList',
  components : {
    ProjectCard,
    CreateProject 
  },
  props : ['host', 'toaster', 'project_list'],
  data(){
    return {
    }
  },
  methods : {
    deleteProject(id){
      axios.delete(`${this.host}/projects/${id}`, {
        headers : {
          token : localStorage.token
        }
      })
      .then(response => {
        this.$parent.deleteProject(id)
      })
      .catch(err => {
        console.log(err)
      })
    },
    boardRender(id){
      this.$parent.boardRender(id)
    },
    addProject(data){
      this.project_list.push(data)
    }
  },
}
</script>
<style scoped>
</style>