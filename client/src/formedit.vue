<template>
  <div class="form-container" v-if="show">
  
      <div class="form-bg">
      <div class="form-box">
        <form @submit.prevent="sendEditData" >
                   <a  @click="$emit('closeform')" style="margin-left:auto"> <i class="fas fa-times fa-lg"></i> </a>
          <label for="task" >Task</label>
          <textarea v-model="inputdata" name="task" id="" cols="30" rows="20"></textarea>
          
          <div class="button-form">
            <!-- <button class="button delete" type="submit">Delete</button> -->
            <button class="button edit" type="submit">Edit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name : 'formedit',
  props : ['show','selectdata'],
  data(){
    return{
      inputdata : ""

     }
  },
  watch: {
      selectdata : function(){
        this.inputdata = this.selectdata.title
      }
  },
  methods:{
    
    sendEditData(){
      
      let newData = {
        id : this.selectdata.id ,
        title: this.inputdata
        }
      this.$emit('edit-data',newData)
      this.selectData = ""
     }
    }
  
}
</script>
<style scoped>

</style>