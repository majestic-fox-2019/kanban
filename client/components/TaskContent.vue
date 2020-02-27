<template>
  <div>
    <div class="head">
      <div>
        <p class="text-muted">{{ task.title }}</p>
      </div>
      <div>
        <a v-if="task.CategoryId !== 1" @click.prevent="backStatus(task.id)" href="#" class="badge badge-secondary" style="text-decoration:none">Back</a> 
        <a v-if="task.CategoryId !== 4" @click.prevent="updateStatus(task.id)" href="#" class="badge badge-success" style="text-decoration:none">Next</a> 
        <a href="#" @click.prevent="updateForm(task.id)" class="badge badge-warning">Update</a> 
        <a @click.prevent="deleteData(task.id)" class="badge badge-danger">Delete</a>
      </div>
    </div>
    <div class="content">
      <div v-if="update_form === task.id">
      <Description :host="host" :task="task" :keys="i" :show_form="update_form" :task_id="task.id" />
      </div>
      <div v-if="update_form === null">
        <p>{{ task.description }}</p>
      </div>
      <form>
      </form>
    </div>
  </div>
</template>

<script>
import Description from './Description';

export default {
  name: 'TaskContent',
  props: ['host','task','update_form','taskActive', 'i'],
  components:{
    Description
  },
  methods: {
    backStatus(id){
      this.$parent.backStatus(id)
    },
    updateStatus(id){
      this.$parent.updateStatus(id)
    },
    updateForm(id){
      this.$parent.updateForm(id)
    },
    deleteData(id){
      this.$parent.deleteData(id)
    }
  }
}
</script>

