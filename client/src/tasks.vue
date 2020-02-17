<template>

    <div class="col-1 col back-log">
      <formedit @hide="hide" :selected="selected" :show="form" ></formedit>
      <div class="title">
        <h1>{{cate}}</h1>
      </div>
      <div class="card" >

      <div class="data" v-if="datatasks == null || !datatasks || datatasks.length == 0" >
          <div class="card-data">
            <h1>No task</h1>
          </div>
        </div>
        <div >
        <div v-if="datatasks || datatasks !== null"  >
        <div v-for="task in datatasks" :key="task.id" >
        <div class="data" v-if="datatasks" >
          <div class="card-data" >
            <div>
              <p>{{task.title}}</p>
            </div>
             <div class="icon" v-if="task.category=='backlog'">
              <a @click="move(task,true);" ><i class="fa fa-arrow-circle-right fa-lg"  aria-hidden="true"></i></a>
              <a @click="showedit(task)"> <i class="fa fa-edit fa-lg"></i></a>
              <a @click="destroy(task);"><i class="fa fa-trash" aria-hidden="true"></i></a>
            </div>
            <div class="icon" v-if="task.category=='complete'">
              <a @click="destroy(task);"><i class="fa fa-trash" aria-hidden="true"></i></a>
              <a @click="showedit(task);"> <i class="fa fa-edit fa-lg"></i></a>
              <a @click="move(task,false);" ><i class="fa fa-arrow-circle-left fa-lg"  aria-hidden="true"></i></a>
            </div> 
            <div class="icon" v-if=" task.category!=='backlog'&& task.category!=='complete' ">
                <a @click="move(task,true);" ><i class="fa fa-arrow-circle-right fa-lg"  aria-hidden="true"></i></a>
                <a @click="showedit(task);"> <i class="fa fa-edit fa-lg"></i></a>
                <a @click="destroy(task);"><i class="fa fa-trash" aria-hidden="true"></i></a>
                <a @click="move(task,false);" ><i class="fa fa-arrow-circle-left fa-lg"  aria-hidden="true"></i></a>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
   
</template>
<script>  
  
  import axios from 'axios'
  import formedit from './formedit'

export default {

  components:{
    formedit
  },

  props : ['datatasks','cate'],
  name : 'tasks',
  data(){
    return {
        baseUrl: ``,
        form: false,
        selected: null
        
    }
  },
 
  methods:{
    move(task,cond){
      let data = task
      let category = ['backlog','todo','done','complete']
      let index = category.findIndex(indx => indx == task.category)
      
      // if cond true move right if false move left
      data.category = cond ? category[index + 1] : category[index-1]
      this.$emit('move-data',data)
    },

    hide(){
      this.form =!this.form
    },

    showedit(task){
     this.form = !this.form
     this.selected = task
    // this.$emit('data-edit',task)
    },

    getedit(newData){
     
      this.$parent.getEdited(newData)
    },

    destroy(task){
        this.$emit('destroy-data',task)
    }
  }

}


</script>
<style scoped>

</style>