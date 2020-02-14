<template>

  <div>
      <h3 class="title dd-handle">{{taskcard.title}}</h3>
        <div class="text" contenteditable="true">{{taskcard.description}}</div>
        <div class="actions" style="display: flex; justify-content: space-around">
          <i @click="beforeCategory(taskcard.category); $emit('updatecategory', {taskcard, getCategoryStatus, i})" v-if="taskcard.category !== 'Backlog'"  class="fas fa-chevron-circle-left"></i><i @click="edit" class="fas fa-pen" data-toggle="modal" data-target="#updateTaskForm"></i><i class="fas fa-trash-alt" @click="destroy"></i><i @click="nextCategory(taskcard.category); $emit('updatecategory', {taskcard, getCategoryStatus, i})"  v-if="taskcard.category !== 'Done'" class="fas fa-chevron-circle-right"></i>
        </div>
        
    </div>
</template>

<script>
export default {
  props: ['taskcard', 'i'],
  data: function(){
    return {
      getCategoryStatus : null
    }
  },
  methods: {
    edit: function () { 
      this.$emit('update-data', this.taskcard)
    },
    destroy: function(){
      this.$emit('delete-id', this.taskcard.id)
    },
    nextCategory: function(category){
      if (category == 'Backlog'){
        this.getCategoryStatus = 'Will Do'
      } else if (category == 'Will Do'){
        this.getCategoryStatus = 'On Progress'
      } else if (category == 'On Progress'){
        this.getCategoryStatus = 'Done'
      }
    },
    beforeCategory: function(category){
      if (category == 'Will Do'){
        this.getCategoryStatus = 'Backlog'
      } else if (category == 'On Progress'){
        this.getCategoryStatus = 'Will Do'
      } else if (category == 'Done'){
        this.getCategoryStatus = 'On Progress'
      }
    }
  }
}
</script>