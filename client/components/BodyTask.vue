<template>
<div>

<div class="dd" style="position:relative;width: 25%;float:left">

    <ol class="kanban To-do" style="position:relative;width: 100%;left:50%;transform:translateX(-50%)">
      <div class="kanban__title">
        <h2><i class="fas fa-code"></i>{{name}}</h2>
        </div>

        <div class="all-data">
          <li :key="categorydata.id" v-for="(categorydata, index) in category" class="dd-item" data-id="2">
            <task :taskcard="categorydata" :i="index" @update-data="update" @delete-id="destroy" @updatecategory="$emit('updatecategory', $event)"></task>
          </li>
        </div>

        <div class="actions">
          <button @click="saveCategory(`${name}`)" class="addbutt" data-toggle="modal" data-target="#addTaskForm"><i class="material-icons">control_point</i> Add new</button>
        </div>
    </ol>

  </div>

  

  <!-- Modal -->
  
  
</div>
</template>
<script>
import Task from './Task';
export default {
  components : {
    'task' : Task
  },
  name: 'BodyTask',
  props: ["name", "category"],
  data: function(){
    return {
      taskId: null,
      title: null,
      form: {
        title: null,
        description:null,
        category: null
      }
    }
  },
  methods: {
    update: function(value){
      console.log(value)
      this.$emit('update-data', value)
    },
    saveCategory: function(cat) {
      this.$emit('categorytitle', cat)
      console.log(cat)
    },
    destroy: function(value){
      console.log(value, '')
      this.$emit('delete-id', value)
    },
    createTask: function(){
      $('#addTaskForm').modal('hide')
      this.$parent.addtask(this.form.title, this.form.description, localStorage.category)
      this.form.title = ''
      this.form.description = ''
    }
  }
}
</script>

<style scoped>

</style>