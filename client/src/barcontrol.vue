<template>

  <div>
      <div class="button-add" >
    <a href="" @click.prevent="showForm"  ><img src="../img/plus.png" ></a>
  </div>
  <div class="box">
    <div class="control">
      <div class="item-1"> 
        <h3>Nama Project</h3>
      </div>
     
      <div class="item">
        <!-- <a   <i "fa fa-chevron-circle-right" style="font-size:48px;color:red"><i><> -->
      </div>
    </div>
  </div>
  <div class="form-container" v-if="show">
  <div class="form-bg">
    <div class="form-box">
      <form @submit.prevent="sendData">
          <a @click.prevent="showForm" style="margin-left:auto"> <i class="fas fa-times fa-lg"></i> </a>
        <label for="task" >Add Task</label>
        <textarea  v-model="form.task" id="" cols="30" rows="20"></textarea>
        <!-- <input v-model="form.task" type="text" id="task" name="task" placeholder="Task"> -->
        
        <div class="button-form">
          <button class="button" type="submit">ADD</button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>

</template>
<script>

  import axios from 'axios'

export default {
  name : "barcontrol",
  
  data(){
    return{
      baseUrl: ``,
      show : false,
      test : true,
      form : {
        task :''
      }

    }
  },
  
  methods :{

    showForm(){
      this.show = !this.show
    
    },

    testTrue(){
      this.test = !this.test
    },

    sendData(){
      let newData = this.form.task
      this.$emit('add-data',newData)
      this.showForm()
      this.form.task = ""
    }
  }
}

</script>
<style scoped>

</style>