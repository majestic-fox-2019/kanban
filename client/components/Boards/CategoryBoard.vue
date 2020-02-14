<template>
  <div class="category">
    <div class="card-board-header">
      <span>{{ name }}</span>
      <a href="#" onclick="return false;"><i class="fa fa-list"></i></a>
    </div>
    <card-board :data="datalist" :form="form_add" :addtaskactive="add_task_active" :user_email="email"></card-board>
    <div class="card-task-footer">
      <div class="card-board-add-task" v-show="!add_task_active">
        <span @click="goAddTask(name)"><i class="fa fa-plus"></i>&nbsp;Add Task</span>
      </div>
      <div class="card-board-add-task" v-show="add_task_active">
        <button class="btn btn-success btn-sm" @click="goDoAddTask(name)"><i class="fa fa-check"></i>&nbsp;Add Task</button>
        <button class="btn btn-secondary btn-sm" @click="goCancelAddTask(name)"><i class="fa fa-close"></i>&nbsp;Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardBoard from './CardBoard'

export default {
  props: ['name', 'datalist', 'add_task_active', 'form_add', 'email'],
  components:{
    'card-board': CardBoard
  },
  data(){
    return {}
  },
  methods: {
    goAddTask(name){
      this.$emit('addTask', name)
    },
    goDoAddTask(name){
      this.$emit('doAddTask', name)
    },
    goCancelAddTask(name){
      this.$emit('cancelAddTask', name)
    }
  },
}
</script>