<template>
  <div class="form-container" v-if="close">
  
      <div class="form-bg">
      <div class="form-box">
        <form @submit.prevent="sendEditData" >
          <a  @click="showhide" style="margin-left:auto"> <i class="fas fa-times fa-lg"></i> </a>
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
  props : ['selected', 'show'],
  data(){
    return{
      inputdata : "",
      close : false
     }
  },
  watch: {

      show : function(){
        this.inputdata = this.selected.title
        this.close = !this.close
      }
  

  },
  methods:{
    
    sendEditData(){
      
      let newData = {
        id : this.selected.id ,
        title: this.inputdata
        }
      this.$parent.getedit(newData)
      this.selectData = ""
      this.close = !this.close
     },

     showhide(){
      this.close = !this.close
     }
    }
  
}
</script>
<style scoped>

</style>