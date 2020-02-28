<template>
  <div class="card-board-content" id="card-board-contents">
    <div v-if="data.length < 1" :style="{display: !addtaskactive ? 'block' : 'none'}">
      <p class="text-center mt-3">No Task</p>
    </div>
    <div v-for="(item, i) in data" :key="i" class="content-board" :class="user_email === item.User.email ? 'my-board' : ''">
      <div class="content-task">
        <p :style="{display: editActive && idTask === item.id ? 'none' : 'block'}">{{ item.title }}</p>
        <div :style="{display: editActive && idTask === item.id ? 'block' : 'none'}">
          <textarea 
            v-model="formEdit.task"
            class="list-card-composer-textarea js-card-title form-control" 
            placeholder="Enter title task" 
            style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"
          ></textarea>
          <div class="card-board-add-task mt-2">
            <button class="btn btn-success btn-sm" @click="editTask(item.id)"><i class="fa fa-check"></i>&nbsp;Edit Task</button>
            <button class="btn btn-secondary btn-sm" @click="cancelEditTask()"><i class="fa fa-close"></i>&nbsp;Cancel</button>
          </div>
        </div>
      </div>
      <div class="detail-task">
        <div class="detail-task-left">
          <p>By: {{ item.User.email }}</p>
          <p>{{ item.updatedAt | dateFormat }}</p>
        </div>
        <div class="detail-task-right">
          <span class="icon-act" @click="goEdit(item)"><i class="fa fa-pencil"></i></span>
          <span class="icon-act" @click="goDelete(item)"><i class="fa fa-trash"></i></span>
          <span class="dropdown-toggle icon-act" id="moveCategory" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-arrows"></i></span>
          <div class="dropdown-menu dropdown-menu-right user-div-menu" aria-labelledby="moveCategory">
            <span class="dropdown-item move" @click="goMove(item, 'backlog')" v-if="item.category !== 'backlog'">Move to Backlog</span>
            <span class="dropdown-item move" @click="goMove(item, 'todo')" v-if="item.category !== 'todo'">Move to Todo</span>
            <span class="dropdown-item move" @click="goMove(item, 'done')" v-if="item.category !== 'done'">Move to Done</span>
            <span class="dropdown-item move" @click="goMove(item, 'completed')" v-if="item.category !== 'completed'">Move to Completed</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="addtaskactive">
      <textarea 
        id="card-add" 
        v-model="form.task" 
        class="list-card-composer-textarea js-card-title form-control" 
        placeholder="Enter task" 
        ref="formAddTaskTextarea"
        style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'form', 'addtaskactive', 'user_email'],
  data(){
    return {
      editActive: false,
      idTask: 0,
      formEdit: {
        task: null
      },
    }
  },
  updated() {
    if(this.addtaskactive){
      let container = document.querySelector("#card-board-contents");
      container.scrollTop = container.scrollHeight;  
      setTimeout(() => {
        this.$refs.formAddTaskTextarea.focus()
      })
    }
  },
  methods: {
    goEdit(item){
      if(this.user_email === item.User.email){
        this.editActive = true
        this.idTask = item.id
        this.formEdit.task = item.title
      }else{
        this.notif('error', "Do not access")
      }
    },
    cancelEditTask(){
      this.editActive = false
      this.formEdit.task = null
    },
    editTask(id){
      let dataUpdate = {
        title: this.formEdit.task
      }
      if(this.formEdit.task === ""){
        this.notif('error', 'Task must be filled')
      }else{
        this.$parent.$parent.doUpdateTask(id, dataUpdate)
        this.editActive = false
      }
    },
    goDelete(item){
      if(this.user_email === item.User.email){
        this.$parent.$parent.deleteTask(item.id)
      }else{
        this.notif('error', "Do not access")
      }
    },
    goMove(item, category){
      if(this.user_email === item.User.email){
        this.$parent.$parent.doMoveTask(item, category)
      }else{
        this.notif('error', "Do not access")
      }
    },
    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    }
  },
}
</script>