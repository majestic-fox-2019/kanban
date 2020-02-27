<template>
  <div>
      <div v-if="typeof project_list === 'string'"> 
        <h3 class="text-muted text-center">{{ project_list }}</h3>
      </div>
    <div class="row" v-else>
      <div :key="project.id" v-for="project in project_list" class="col-md-3 m-2 project-card bg-primary" >
        <div class="project-header">
            <a href="#" @click="$emit('boardrender', project.id)" class="text-white"><i class="fa fa-table text-white" aria-hidden="true"></i> Go To Board</a>
            <a href="#" @click.prevent="$emit('deleteproject', project.id)" ><i class="fa fa-trash text-white icon-title" aria-hidden="true"></i></a>
        </div>
        <div class="project-title">
          <h4 class="text-white pt-3">{{ project.project_name }}</h4>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name : 'ProjectCard',
  props : ['project_list'],
}
</script>

<style scoped>
  .pill-width {
    width: 60%;
  }
  .pill-text-size {
    font-size: 14px;
  }
  .project-card {
    cursor: pointer;
    height: 120px;
    border-radius : 5px;
    box-shadow: 1px 1px #0812a093;
    transition: box-shadow 0.5s;
  }
  .project-card:hover {
    box-shadow : 2px 2px #181717a6;
  }
  .project-header{
    display: flex;
    justify-content: space-between;
    height: 20px;
  }
  .project-header a {
    padding-top: 3px;
    font-size: 12px;
    text-decoration: none
  }
  .tab-title {
    position: relative;
    left: -15px;
  }
</style>